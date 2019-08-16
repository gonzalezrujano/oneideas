<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\MongoDB\Evento;
use App\Models\MongoDB\Grupo;
use App\Models\MongoDB\Invitado;
use App\Models\MongoDB\EventoInvitado;
use MongoDB\BSON\ObjectID;
use Illuminate\Support\Str;
use Carbon\Carbon;
use DB, DataTables, Image, Storage, File, Auth, Mail, QrCode;

//controlador encargado de los invitados

class InvitadoController extends Controller
{

  public function addInvitado(Request $request){

    $input = $request->all();
    $etapas = [];

    if($input['etapas']){
      //proceso las etapas
      $etapas = $this->processEtapas($input['etapas']);
    }

    $grupoId = "no aplica";

    if($input['grupo-id']){
      $grupoId = new ObjectID($input['grupo-id']);
    }

    $existeInvitado = DB::table('Invitados')->where("Correo",$input['correo'])->get();

    if(count($existeInvitado) == 0){
      $data = [
        'nombre'              => strtoupper($input['nombre']),
        'apellido'            => strtoupper($input['apellido']),
        'correo'              => $input['correo'],
        'telefono'            => strtoupper($input['telefono']),
        'esMenorDeEdad'       => (boolean) false,
        'esInvitadoAdicional'=>(boolean) false,
        'borrado'             => false
      ];
      $invitado = new Invitado;
      $invitado->Nombre              = $data['nombre'];
      $invitado->Apellido            = $data['apellido'];
      $invitado->Correo              = $data['correo'];
      $invitado->Telefono            = $data['telefono'];
      $invitado->EsMenorDeEdad       = $data['esMenorDeEdad'];
      $invitado->esInvitadoAdicional       = $data['esInvitadoAdicional'];
      $invitado->borrado             = $data['borrado'];

      //verifico si fue exitoso el insert en la bd
      if($invitado->save()){
        $idEvento = $input['evento-id'];
        $idInvitado = $invitado->_id;
        $invitadosAdicionalesArreglo = [];
        $invitadosAdicionalesMayores = $input['invitados-adicionales-mayores'];
        $invitadosAdicionalesMenores = $input['invitados-adicionales-menores'];
        $etapas = [];

        if($input['etapas']){
          //proceso las etapas
          $etapas = $this->processEtapas($input['etapas']);
        }

        $dataEnventoInvitado = [
          'Evento_id'=>new ObjectID($idInvitado),
          'Invitado_id'=>new ObjectID($idInvitado),
          'Grupo_id'=>  $grupoId,
          'CantidadInvitadosMayores'=>$invitadosAdicionalesMayores,
          'CantidadInvitadosMenores'=>$invitadosAdicionalesMenores,
          'Etapas'              => $etapas,
          'Confirmado'  => (boolean) false,
          'borrado' => (boolean) false
        ];

        $eventoInvitado = new EventoInvitado;
        $eventoInvitado->Evento_id = $dataEnventoInvitado['Evento_id'];
        $eventoInvitado->Invitado_id = $dataEnventoInvitado['Invitado_id'];
        $eventoInvitado->Grupo_id = $dataEnventoInvitado['Grupo_id'];
        $eventoInvitado->CantidadInvitadosMayores = $dataEnventoInvitado['CantidadInvitadosMayores'];
        $eventoInvitado->CantidadInvitadosMenores = $dataEnventoInvitado['CantidadInvitadosMenores'];
        $eventoInvitado->Etapas = $dataEnventoInvitado['Etapas'];
        $eventoInvitado->Confirmado = $dataEnventoInvitado['Confirmado'];
        $eventoInvitado->LinkDatos  = Str::random(40);
        $eventoInvitado->borrado = $dataEnventoInvitado['borrado'];
        $linkConfirmacion = $eventoInvitado->LinkDatos;
        
        if($eventoInvitado->save()){

          for($i = 0; $i<$invitadosAdicionalesMayores;$i++){
            $dataAdicional = [
              'idInvitadoSolicitante'=> new ObjectID($idInvitado),
              'nombre'              => strtoupper($input['nombre']),
              'apellido'            => strtoupper("INVITADO ADICIONAL MAYOR DE EDAD"),
              'correo'              => strtoupper("vacio"),
              'telefono'            => strtoupper("vacio"),
              'esInvitadoAdicional'     => (boolean) true,
              'esMenorDeEdad'       => (boolean) false,
              'borrado'             => false
            ];
        
            $invitadoAdicional = new Invitado;
            $invitadoAdicional->Nombre              = $dataAdicional['nombre'];
            $invitadoAdicional->Apellido            = $dataAdicional['apellido'];
            $invitadoAdicional->Correo              = $dataAdicional['correo'];
            $invitadoAdicional->Telefono            = $dataAdicional['telefono'];
            $invitadoAdicional->EsInvitadoAdicional = $dataAdicional['esInvitadoAdicional'];
            $invitadoAdicional->EsMenorDeEdad       = $dataAdicional['esMenorDeEdad'];
            $invitadoAdicional->InvitadoSolicitante_id = $dataAdicional['idInvitadoSolicitante'];
            $invitadoAdicional->borrado             = $dataAdicional['borrado'];
    
            if($invitadoAdicional->save()){
              $eventoInvitado = new EventoInvitado;
              $eventoInvitado->Evento_id = $dataEnventoInvitado['Evento_id'];
              $eventoInvitado->Invitado_id = new ObjectID($invitadoAdicional->_id);
              $eventoInvitado->Grupo_id = $dataEnventoInvitado['Grupo_id'];
              $eventoInvitado->CantidadInvitadosMayores = 0;
              $eventoInvitado->CantidadInvitadosMenores = 0;
              $eventoInvitado->Etapas = $dataEnventoInvitado['Etapas'];
              $eventoInvitado->Confirmado = (boolean)false;
              $eventoInvitado->borrado = $dataEnventoInvitado['borrado'];
              $eventoInvitado->save();
              array_push($invitadosAdicionalesArreglo, $invitadoAdicional);
            }

          }
    
          for($i = 0; $i<$invitadosAdicionalesMenores;$i++){

            $dataAdicional = [
              'idInvitadoSolicitante'=> new ObjectID($idInvitado),
              'nombre'              => strtoupper($input['nombre']),
              'apellido'            => strtoupper("INVITADO ADICIONAL MENOR DE EDAD"),
              'correo'              => strtoupper("vacio"),
              'telefono'            => strtoupper("vacio"),
              'esInvitadoAdicional'     => (boolean) true,
              'esMenorDeEdad'       => (boolean) true,
              'borrado'             => false
            ];

            $invitadoAdicional = new Invitado;
            $invitadoAdicional->Nombre              = $dataAdicional['nombre'];
            $invitadoAdicional->Apellido            = $dataAdicional['apellido'];
            $invitadoAdicional->Correo              = $dataAdicional['correo'];
            $invitadoAdicional->Telefono            = $dataAdicional['telefono'];
            $invitadoAdicional->EsInvitadoAdicional = $dataAdicional['esInvitadoAdicional'];
            $invitadoAdicional->EsMenorDeEdad       = $dataAdicional['esMenorDeEdad'];
            $invitadoAdicional->InvitadoSolicitante_id = $dataAdicional['idInvitadoSolicitante'];
            $invitadoAdicional->borrado             = $dataAdicional['borrado'];

            if($invitadoAdicional->save()){
              $eventoInvitado = new EventoInvitado;
              $eventoInvitado->Evento_id = $dataEnventoInvitado['Evento_id'];
              $eventoInvitado->Invitado_id = new ObjectID($invitadoAdicional->_id);
              $eventoInvitado->Grupo_id = $dataEnventoInvitado['Grupo_id'];
              $eventoInvitado->CantidadInvitadosMayores = 0;
              $eventoInvitado->CantidadInvitadosMenores = 0;
              $eventoInvitado->Etapas = $dataEnventoInvitado['Etapas'];
              $eventoInvitado->Confirmado = (boolean)false;
              $eventoInvitado->borrado = $dataEnventoInvitado['borrado'];
              $eventoInvitado->save();
              array_push($invitadosAdicionalesArreglo, $invitadoAdicional);
            }

          }
        }
        return response()->json(['code' => 200,'invitado'=>$invitado,'invitados-adicionales'=>$invitadosAdicionalesArreglo,'link-confirmacion'=>$linkConfirmacion]);
    }
  }else{
    $invitado = $existeInvitado[0];
    $idEvento = $input['evento-id'];
    $idInvitado = $invitado['_id'];
    $invitadosAdicionalesArreglo = [];
    $invitadosAdicionalesMayores = $input['invitados-adicionales-mayores'];
    $invitadosAdicionalesMenores = $input['invitados-adicionales-menores'];
    $etapas = [];
    if($input['etapas']){
      //proceso las etapas
      $etapas = $this->processEtapas($input['etapas']);
    }
    $dataEnventoInvitado = [
      'Evento_id'=>new ObjectID($idInvitado),
      'Invitado_id'=>new ObjectID($idInvitado),
      'Grupo_id'=>  $grupoId,
      'CantidadInvitadosMayores'=>$invitadosAdicionalesMayores,
      'CantidadInvitadosMenores'=>$invitadosAdicionalesMenores,
      'Etapas'              => $etapas,
      'Confirmado'  => (boolean) false,
      'borrado' => (boolean) false
    ];
    $eventoInvitado = new EventoInvitado;
    $eventoInvitado->Evento_id = $dataEnventoInvitado['Evento_id'];
    $eventoInvitado->Invitado_id = $dataEnventoInvitado['Invitado_id'];
    $eventoInvitado->Grupo_id = $dataEnventoInvitado['Grupo_id'];
    $eventoInvitado->CantidadInvitadosMayores = $dataEnventoInvitado['CantidadInvitadosMayores'];
    $eventoInvitado->CantidadInvitadosMenores = $dataEnventoInvitado['CantidadInvitadosMenores'];
    $eventoInvitado->Etapas = $dataEnventoInvitado['Etapas'];
    $eventoInvitado->Confirmado = $dataEnventoInvitado['Confirmado'];
    $eventoInvitado->LinkDatos  = Str::random(40);
    $eventoInvitado->borrado = $dataEnventoInvitado['borrado'];
    $eventoInvitado->save();

    $linkConfirmacion = $eventoInvitado->LinkDatos;

    for($i = 0; $i<$invitadosAdicionalesMayores;$i++){
      $dataAdicional = [
        'idInvitadoSolicitante'=> new ObjectID($idInvitado),
        'nombre'              => strtoupper($input['nombre']),
        'apellido'            => strtoupper("INVITADO ADICIONAL MAYOR DE EDAD"),
        'correo'              => strtoupper("vacio"),
        'telefono'            => strtoupper("vacio"),
        'esInvitadoAdicional'     => (boolean) true,
        'esMenorDeEdad'       => (boolean) false,
        'borrado'             => false
      ];
  
      $invitadoAdicional = new Invitado;
      $invitadoAdicional->Nombre              = $dataAdicional['nombre'];
      $invitadoAdicional->Apellido            = $dataAdicional['apellido'];
      $invitadoAdicional->Correo              = $dataAdicional['correo'];
      $invitadoAdicional->Telefono            = $dataAdicional['telefono'];
      $invitadoAdicional->EsInvitadoAdicional = $dataAdicional['esInvitadoAdicional'];
      $invitadoAdicional->EsMenorDeEdad       = $dataAdicional['esMenorDeEdad'];
      $invitadoAdicional->InvitadoSolicitante_id = $dataAdicional['idInvitadoSolicitante'];
      $invitadoAdicional->borrado             = $dataAdicional['borrado'];

      if($invitadoAdicional->save()){
        $eventoInvitado = new EventoInvitado;
        $eventoInvitado->Evento_id = $dataEnventoInvitado['Evento_id'];
        $eventoInvitado->Invitado_id = new ObjectID($invitadoAdicional->_id);
        $eventoInvitado->Grupo_id = $dataEnventoInvitado['Grupo_id'];
        $eventoInvitado->CantidadInvitadosMayores = 0;
        $eventoInvitado->CantidadInvitadosMenores = 0;
        $eventoInvitado->Etapas = $dataEnventoInvitado['Etapas'];
        $eventoInvitado->Confirmado = (boolean)false;
        $eventoInvitado->borrado = $dataEnventoInvitado['borrado'];
        $eventoInvitado->save();
        array_push($invitadosAdicionalesArreglo, $invitadoAdicional);
      }

    }

    for($i = 0; $i<$invitadosAdicionalesMenores;$i++){

      $dataAdicional = [
        'idInvitadoSolicitante'=> new ObjectID($idInvitado),
        'nombre'              => strtoupper($input['nombre']),
        'apellido'            => strtoupper("INVITADO ADICIONAL MENOR DE EDAD"),
        'correo'              => strtoupper("vacio"),
        'telefono'            => strtoupper("vacio"),
        'esInvitadoAdicional'     => (boolean) true,
        'esMenorDeEdad'       => (boolean) true,
        'borrado'             => false
      ];

      $invitadoAdicional = new Invitado;
      $invitadoAdicional->Nombre              = $dataAdicional['nombre'];
      $invitadoAdicional->Apellido            = $dataAdicional['apellido'];
      $invitadoAdicional->Correo              = $dataAdicional['correo'];
      $invitadoAdicional->Telefono            = $dataAdicional['telefono'];
      $invitadoAdicional->EsInvitadoAdicional = $dataAdicional['esInvitadoAdicional'];
      $invitadoAdicional->EsMenorDeEdad       = $dataAdicional['esMenorDeEdad'];
      $invitadoAdicional->InvitadoSolicitante_id = $dataAdicional['idInvitadoSolicitante'];
      $invitadoAdicional->borrado             = $dataAdicional['borrado'];

      if($invitadoAdicional->save()){
        $eventoInvitado = new EventoInvitado;
        $eventoInvitado->Evento_id = $dataEnventoInvitado['Evento_id'];
        $eventoInvitado->Invitado_id = new ObjectID($invitadoAdicional->_id);
        $eventoInvitado->Grupo_id = $dataEnventoInvitado['Grupo_id'];
        $eventoInvitado->CantidadInvitadosMayores = 0;
        $eventoInvitado->CantidadInvitadosMenores = 0;
        $eventoInvitado->Etapas = $dataEnventoInvitado['Etapas'];
        $eventoInvitado->Confirmado = (boolean)false;
        $eventoInvitado->borrado = $dataEnventoInvitado['borrado'];
        $eventoInvitado->save();
        array_push($invitadosAdicionalesArreglo, $invitadoAdicional);
      }
    }
    return response()->json(['code' => 200,'mensaje'=>"correo ya registrado",'invitado'=>$invitado,'invitados-adicionales'=>$invitadosAdicionalesArreglo,'link-confirmacion'=>$linkConfirmacion]);
  }
}


  public function getInvitado($id){
    $registro = Invitado::find($id);
    //valido que de verdad sea borrado en caso de que no arrojo un error
    if($registro){

        return json_encode(['code' => 200,'invitado'=>$registro]);
    }else{
        return json_encode(['code' => 500]);
    }
  }

  public function getInvitados(){
      $data = DB::table('Invitados')->get();
      if($data){

          return json_encode(['code' => 200,'invitados'=>$data]);
      }else{
          return json_encode(['code' => 500]);
      }
  }

  public function setInvitado(Request $request){
    $input = $request->all();
    $etapas = [];
    $id = $input['id'];
    if($id){
      if($input['etapas']){
        //proceso las etapas
        $etapas = $this->processEtapas($input['etapas']);
      }
      $registro = Invitado::find($id);
      if($registro){
        $grupoId = "no aplica";
        if($input['grupo-id'] != "no aplica"){
          $grupoId = new ObjectID($input['grupo-id']);
        }
          $data = [
            'nombre'              => strtoupper($input['nombre']),
            'apellido'            => strtoupper($input['apellido']),
            'correo'              => strtoupper($input['correo']),
            'telefono'            => strtoupper($input['telefono']),
            'Grupo_id'            => $grupoId,
            'Evento_id'           => new ObjectID($input['evento-id']),
            'Etapas'              => $etapas,
            'esInvitadoAdicional'     => (boolean) false,
            'esMenorDeEdad'       => (boolean) false,
            'confirmacion'       => (boolean) false,
            'borrado'             => false
          ];
          $registro->Nombre              = $data['nombre'];
          $registro->Apellido            = $data['apellido'];
          $registro->Correo              = $data['correo'];
          $registro->Telefono            = $data['telefono'];
          $registro->Grupo_id            = $data['Grupo_id'];
          $registro->Evento_id           = $data['Evento_id'];
          $registro->Etapas              = $data['Etapas'];
          $registro->EsInvitadoAdicional = $data['esInvitadoAdicional'];
          $registro->EsMenorDeEdad       = $data['esMenorDeEdad'];
          $registro->Confirmacion        = $data['confirmacion'];
          $registro->Borrado             = $data['borrado'];

          if($registro->save()){
            return json_encode(['code' => 200,'invitados'=>$registro]);
          }
          return json_encode(['code' => 400]);
      }
      return json_encode(['code' => 500]);
    }
    return json_encode(['code' => 600]);
  }

  public function deleteInvitado(request $request){
  
            $input = $request->all();
            $id = $input['id'];

            //valido que venga el id sino mando un error
            if($id){
                //ubico el id en la bd
                $registro = Invitado::find($id);
                $registro->borrado = true;
                

                //valido que de verdad sea borrado en caso de que no arrojo un error
                if($registro->save()){

                    return json_encode(['code' => 200]);
                }else{
                    return json_encode(['code' => 500]);
                }

            }else{

                return json_encode(['code' => 600]);
            }
  }

  public function eliminarTodos(){
    $data = Invitado::borrado(false)->get();
    if($data){
        for($i=0;$i<count($data);$i++){
          if($data[$i]->Grupo_id != "no aplica"){
            $invitadoId= $data[$i]->_id;
            $invitado = Invitado::find($invitadoId);
            $invitado->Borrado = true;
            $registro->borrado = true;
            if($invitado->save()){
              continue;
            }
          }
        }
        return json_encode(['code' => 200,'data'=>"borrados todos"]);
    }
  }

  
    public function processEtapas($data){

        //separo los id
        $separacion = explode(",", $data);

        $result = [];

        //renombro la llave
        foreach ($separacion as $value ){

            $result[] = new ObjectId($value);
        }

        //devuelvo el resultado en formato json
        return $result;
    }

    public function mailConfirmacion(Request $request){
      $input = $request->all();
      $idConfirmacion = $input['idConfirmacion'];
      if($idConfirmacion){
        $invitado = Invitado::borrado(false)->where('linkConfirmacion', $idConfirmacion)->get();
        return json_encode(['code' => 200,'data'=>$invitado]);
      }
    }

    public function confirmacionDatos(Request $request){
      $input = $request->all();
      $id = $input['id'];
      if($id){
        $registro = Invitado::find($id);
        if($registro){
            $data = [
              'nombre'              => strtoupper($input['nombre']),
              'apellido'            => strtoupper($input['apellido']),
              'correo'              => strtoupper($input['correo']),
              'telefono'            => strtoupper($input['telefono']),
              'confirmacion'       => (boolean) true
            ];

            $registro->Nombre              = $data['nombre'];
            $registro->Apellido            = $data['apellido'];
            $registro->Correo              = $data['correo'];
            $registro->linkConfirmacion    = "usado";
            $registro->Telefono            = $data['telefono'];
            $registro->Confirmacion        = $data['confirmacion'];

            if($registro->save()){
              return json_encode(['code' => 200,'invitado'=>$registro]);
            }
            return json_encode(['code' => 400]);
        }
        return json_encode(['code' => 500]);
      }
      return json_encode(['code' => 600]);
    }

   

}

<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\MongoDB\Evento;
use App\Models\MongoDB\Grupo;
use App\Models\MongoDB\Invitado;
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

    $invitado = new Invitado;
    $invitado->Nombre              = $data['nombre'];
    $invitado->Apellido            = $data['apellido'];
    $invitado->Correo              = $data['correo'];
    $invitado->Telefono            = $data['telefono'];
    $invitado->Grupo_id            = $data['Grupo_id'];
    $invitado->Evento_id           = $data['Evento_id'];
    $invitado->Etapas              = $data['Etapas'];
    $invitado->EsInvitadoAdicional = $data['esInvitadoAdicional'];
    $invitado->EsMenorDeEdad       = $data['esMenorDeEdad'];
    $invitado->Confirmacion        = $data['confirmacion'];
    $invitado->linkConfirmacion    = Str::random(40);
    $invitado->Borrado             = $data['borrado'];

    //verifico si fue exitoso el insert en la bd
    if($invitado->save()){
      $idInvitado = $invitado->_id;
      $invitadosAdicionalesArreglo = [];
      $invitadosAdicionalesMayores = $input['invitados-adicionales-mayores'];
      $invitadosAdicionalesMenores = $input['invitados-adicionales-menores'];
      
      for($i = 0; $i<$invitadosAdicionalesMayores;$i++){
        $dataAdicional = [
          'idInvitadoSolicitante'=> new ObjectID($idInvitado),
          'nombre'              => strtoupper($input['nombre']." ".$input["apellido"]),
          'apellido'            => strtoupper("INVITADO ADICIONAL MAYOR DE EDAD"),
          'correo'              => strtoupper("vacio"),
          'telefono'            => strtoupper("vacio"),
          
          'esInvitadoAdicional'     => (boolean) true,
          'esMenorDeEdad'       => (boolean) false,
          'confirmacion'       => (boolean) false,
          'borrado'             => false
        ];
    
        $invitadoAdicional = new Invitado;
        $invitadoAdicional->Nombre              = $dataAdicional['nombre'];
        $invitadoAdicional->Apellido            = $dataAdicional['apellido'];
        $invitadoAdicional->Correo              = $dataAdicional['correo'];
        $invitadoAdicional->Telefono            = $dataAdicional['telefono'];
        $invitadoAdicional->Grupo_id            = $data['Grupo_id'];
        $invitadoAdicional->Evento_id           = $data['Evento_id'];
        $invitadoAdicional->Etapas              = $data['Etapas'];
        $invitadoAdicional->EsInvitadoAdicional = $dataAdicional['esInvitadoAdicional'];
        $invitadoAdicional->EsMenorDeEdad       = $dataAdicional['esMenorDeEdad'];
        $invitadoAdicional->InvitadoSolicitante_id = $dataAdicional['idInvitadoSolicitante'];
        $invitadoAdicional->Confirmacion        = $data['confirmacion'];
        $invitadoAdicional->Borrado             = $dataAdicional['borrado'];

        if($invitadoAdicional->save()){
          array_push($invitadosAdicionalesArreglo, $invitadoAdicional);
        }
      }

      for($i = 0; $i<$invitadosAdicionalesMenores;$i++){
        $dataAdicional = [
          'idInvitadoSolicitante'=> new ObjectID($idInvitado),
          'nombre'              => strtoupper($input['nombre']." ".$input["apellido"]),
          'apellido'            => strtoupper("INVITADO ADICIONAL MENOR DE EDAD"),
          'correo'              => strtoupper("vacio"),
          'telefono'            => strtoupper("vacio"),
          'esInvitadoAdicional'     => (boolean) true,
          'esMenorDeEdad'       => (boolean) true,
          'confirmacion'       => (boolean) false,
          'borrado'             => false
        ];
    
        $invitadoAdicional = new Invitado;
        $invitadoAdicional->Nombre              = $dataAdicional['nombre'];
        $invitadoAdicional->Apellido            = $dataAdicional['apellido'];
        $invitadoAdicional->Correo              = $dataAdicional['correo'];
        $invitadoAdicional->Telefono            = $dataAdicional['telefono'];
        $invitadoAdicional->Grupo_id            = $data['Grupo_id'];
        $invitadoAdicional->Evento_id           = $data['Evento_id'];
        $invitadoAdicional->Etapas              = $data['Etapas'];
        $invitadoAdicional->EsInvitadoAdicional = $dataAdicional['esInvitadoAdicional'];
        $invitadoAdicional->EsMenorDeEdad       = $dataAdicional['esMenorDeEdad'];
        $invitadoAdicional->InvitadoSolicitante_id = $dataAdicional['idInvitadoSolicitante'];
        $invitadoAdicional->Confirmacion        = $data['confirmacion'];
        $invitadoAdicional->Borrado             = $dataAdicional['borrado'];

        if($invitadoAdicional->save()){
          array_push($invitadosAdicionalesArreglo, $invitadoAdicional);
        }
      }

      return response()->json(['code' => 200,'invitado'=>$invitado,'invitados-adicionales'=>$invitadosAdicionalesArreglo]);
    }else{
        return response()->json(['code' => 500]);
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
      $data = Invitado::borrado(false)->get();
      if($data){
          for($i=0;$i<count($data);$i++){
            if($data[$i]->Grupo_id != "no aplica"){
              $grupoId= $data[$i]->Grupo_id;
              $grupoId = Grupo::find($grupoId);
              if($grupoId){
                $grupo = $grupoId->Nombre;
                $data[$i]->Grupo_id = $grupo;
              }
              
            }
          }
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
                $registro->Borrado = true;

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

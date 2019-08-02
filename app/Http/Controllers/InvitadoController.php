<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\MongoDB\Evento;
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
    //capturo los datos y los acomodo en un arreglo
    $data = [
      'nombre'              => strtoupper($input['nombre']),
      'apellido'            => strtoupper($input['apellido']),
      'correo'              => strtoupper($input['correo']),
      'telefono'            => strtoupper($input['telefono']),
      'Grupo_id'            => new ObjectID($input['grupo-id']),
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
    $invitado->EsInvitadoAdicional = $data['esInvitadoAdicional'];
    $invitado->EsMenorDeEdad       = $data['esMenorDeEdad'];
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
          'apellido'            => strtoupper("INVITADO ADICIONAL"),
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
        $invitadoAdicional->EsInvitadoAdicional = $dataAdicional['esInvitadoAdicional'];
        $invitadoAdicional->EsMenorDeEdad       = $dataAdicional['esMenorDeEdad'];
        $invitadoAdicional->InvitadoSolicitante_id = $dataAdicional['idInvitadoSolicitante'];
        $invitadoAdicional->Borrado             = $dataAdicional['borrado'];

        if($invitadoAdicional->save()){
          array_push($invitadosAdicionalesArreglo, $invitadoAdicional);
        }
      }

      for($i = 0; $i<$invitadosAdicionalesMayores;$i++){
        $dataAdicional = [
          'idInvitadoSolicitante'=> new ObjectID($idInvitado),
          'nombre'              => strtoupper($input['nombre']." ".$input["apellido"]),
          'apellido'            => strtoupper("INVITADO ADICIONAL"),
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
        $invitadoAdicional->EsInvitadoAdicional = $dataAdicional['esInvitadoAdicional'];
        $invitadoAdicional->EsMenorDeEdad       = $dataAdicional['esMenorDeEdad'];
        $invitadoAdicional->InvitadoSolicitante_id = $dataAdicional['idInvitadoSolicitante'];
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

  }

  public function getInvitados(){

  }

  public function setInvitado(Request $request){

  }

  public function deleteInvitado($id){

  }

}

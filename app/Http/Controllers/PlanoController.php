<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\MongoDB\Evento;
use App\Models\MongoDB\Empresa;
use App\Models\MongoDB\EventoSeats;
use App\Models\MongoDB\Invitado;
use App\Models\MongoDB\Plano;
use App\Models\MongoDB\Reserva;
use MongoDB\BSON\ObjectID;
use App\Mail\CorreoDeAsiento;
use Illuminate\Support\Str;
use Carbon\Carbon;
use DB, DataTables, Image, Storage, File,Mail, Auth, QrCode;

//controlador encargado de los invitados

class PlanoController extends Controller
{
  public function addPlano(Request $request){
    $input = $request->all();
    $idEvento = $input['id-evento'];
    //capturo los datos y los acomodo en un arreglo
    $data = [
        'nombre'              => strtoupper($input['nombre-etapa']),
        'borrado'             => false
      ];
  
      $plano = new Plano;
      $plano->Nombre              = $data['nombre'];
      $plano->borrado             = $data['borrado'];
  
      //verifico si fue exitoso el insert en la bd
      if($plano->save()){
        $evento =  Evento::find($idEvento);
        if($evento){
            if($evento->planos){
                $planos = $evento->planos;
                array_push($planos, new ObjectID($plano->_id));
                $evento->planos = $planos; 
            }else{
                $evento->planos = [new ObjectID($plano->_id)];
            }
            if($evento->save()){
                return response()->json(['code' => 200,'plano'=>$plano]);
            }else{
                return response()->json(['code' => 600]);
            }
        }
      }else{
          return response()->json(['code' => 500]);
      }
    
    
  }

  public function getPlanoEvento($id){
    $evento =  Evento::find($id);
    $planos = [];
    if($evento){
        if($evento->planos){
            $arregloPlanos = $evento->etapas;
            for($i = 0; $i < count($arregloPlanos); $i++){
                $plano =  Plano::find($arregloPlanos[$i]);
                array_push($planos,$plano);
            }
        }
        return response()->json(['code' => 200,'planos'=>$planos,'evento'=>$evento]);
    }
    return response()->json(['code' => 500]);
    
  }

  public function getPlano($id){
    $plano =  Plano::find($id);
    if($registro){
        return json_encode(['code' => 200,'plano'=>$plano]);
    }else{
        return response()->json(['code' => 500]);
    }
        
  }



  public function setPlano(Request $request){
    //capturo el valor del id
    $input = $request->all();
    $id = $input['id'];
    $registro =  Plano::find($id);
    if($registro){
        $registro->Nombre = $input['nombre'];
        if($registro->save()){
            return response()->json(['code' => 200,'plano'=>$registro]);
        }else{
            return response()->json(['code' => 500]);
        }
    }else{
        return response()->json(['code' => 600]);
    }
  }

  public function deleteEtapa(Request $request){
      //capturo el valor del id
      $input = $request->all();
      $id = $input['id'];

      //valido que venga el id sino mando un error
      if($id){

          //ubico el id en la bd
          $registro = Plano::find($id);
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

   public function getAllPlanos(){
    $seatsio = new \Seatsio\SeatsioClient("f4b8068e-031f-4035-a6c2-c56eca47ced9");
    
    $data = [];
    $charts = $seatsio->charts->listAll();
    foreach($charts as $chart) {
        array_push($data,$chart);
    }

    return json_encode(['code'=>200,'data'=>$data]);
  }

  public function isEvent($eventos, $key){
      $retorno =false;
      foreach($eventos as $evento){
        if($evento->key == $key){
            $retorno = true;
        }
      }
      return $retorno;
  }

  public function getPlanosEvento(Request $request)
  {
    $input = $request->all();
    $secretKey = $input['secretKey'];
    $seatsio = new \Seatsio\SeatsioClient($secretKey);
    $evento = Evento::where("secretKey",$secretKey)->get();
    $evento = $evento[0];
    $data = [];
    $prueba = [];
    $charts = $seatsio->charts->listAll();
    $count = 0;
    $eventos = $seatsio->events->listAll();
    foreach($charts as $chart) {
        if(!$this->isEvent($eventos , $evento->_id."-".$count) ) {
            $event = $seatsio->events->create($chart->key, $evento->_id."-".$count);
        }
        array_push($data,$chart);
        $count++;
    }

    return json_encode(['code'=>200,'data'=>$data,'info'=>$evento->_id."-0"]);
  }

  public function getPlanosEventoReservas(Request $request)
  {
    $input = $request->all();
    $secretKey = $input['secretKey'];
    $seatsio = new \Seatsio\SeatsioClient($secretKey);
    $evento = Evento::where("secretKey",$secretKey)->get();
    $evento = $evento[0];
    $data = [];
    $prueba = [];
    $charts = $seatsio->charts->listAll();
    $count = 0;
    $eventos = $seatsio->events->listAll();
    foreach($charts as $chart) {
        if(!$this->isEvent($eventos , $evento->_id."-".$count) ) {
            $event = $seatsio->events->create($chart->key, $evento->_id."-".$count);
        }
        array_push($data,$chart);
        $count++;
    }
    $reservas = Reserva::where("borrado",false)->get();
    return json_encode(['code'=>200,'data'=>$data,'reservas'=>$reservas]);
  }

  public function reservar(Request $request){
      $input = $request->all();
      $seat = $input['seat'];
      $secretKey = $input['secretKey'];
      $eventKey = $input['eventKey'];
      $seatsio = new \Seatsio\SeatsioClient($secretKey);
      $respuesta = $seatsio->events->book($eventKey, [$seat]);
      $reserva = new Reserva;
      $reserva->eventKey = $eventKey;
      $reserva->asiento  = $seat;
      $reserva->Invitado_id = $input['idInvitado'];
      $reserva->Evento_id   = $input['idEvento'];
      $reserva->borrado = (boolean) false;
      $invitado = Invitado::find($input['idInvitado']);
      //$link = "http://localhost:8000/event/".$eventKey;
      $link = "https://consola.oneshow.com.ar/event/".$eventKey;
      $data  = [
          "nombre"=>$invitado->Nombre,
          "seat"=>$seat,
          "eventKey"=>$eventKey,
          "id_invitado"=>$input["idInvitado"],
          "link" => $link,
          "nombre_evento"=> Evento::find($input['idEvento'])->Nombre
        ];
      Mail::to($invitado->Correo)->send(new CorreoDeAsiento($data));
      if($reserva->save()){
        return json_encode(['code'=>200,'data'=>$reserva]);
      }
      return json_encode(['code'=>500]);

  }

  public function infoEvento(Request $request){
    $input = $request->all();
    $eventoId = $input['eventoId'];
    $evento = Evento::find($eventoId);
    return json_encode(['code'=>200,'data'=>$evento]);
  }


  public function getPlanosEmpresa(Request $request)
  {
    $input = $request->all();
    $secretKey = $input['secretKey'];
    $seatsio = new \Seatsio\SeatsioClient($secretKey);
    $empresa = Empresa::where("secretKey",$secretKey)->get();
    $empresa = $empresa[0];
    $data = [];
    $prueba = [];
    $charts = $seatsio->charts->listAll();
    $count = 0;
    foreach($charts as $chart) {
        if($chart->status == "NOT_USED") {
            $event = $seatsio->events->create($chart->key, (string) new ObjectId());
            $eventSeats = new EventoSeats;
            $eventSeats->Empresa_id = $empresa->_id;
            $eventSeats->eventKey   = $event->key;
            $eventSeats->chartKey   = $event->chartKey;
            $eventSeats->save();
            array_push($prueba,$event);
        }
        array_push($data,$chart);
        $count++;
    }
    return json_encode(['code'=>200,'data'=>$data,'prueba'=>$prueba]);
  }

}

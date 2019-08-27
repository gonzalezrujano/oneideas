<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\MongoDB\Evento;
use App\Models\MongoDB\Plano;
use MongoDB\BSON\ObjectID;
use Illuminate\Support\Str;
use Carbon\Carbon;
use DB, DataTables, Image, Storage, File, Auth, Mail, QrCode;

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

  public function getplanos(){
    $Planos = Plano::where("borrado",false)->get();
    //devuelvo un json con la data
    return response()->json([
        'code' => 200,
        'planos' => $planos
    ]);
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

}

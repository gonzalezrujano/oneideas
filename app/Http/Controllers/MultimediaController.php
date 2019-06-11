<?php

namespace App\Http\Controllers;

//controlador encargado de la multimedia

use App\Models\MongoDB\Biblioteca;
use App\Models\MongoDB\Evento;
use App\Models\MongoDB\Herramienta;
use App\Models\MongoDB\Sector;
use App\Models\MongoDB\Pais;
use Carbon\Carbon;
use Illuminate\Http\Request;
use MongoDB\BSON\ObjectId;
use Auth;

class MultimediaController extends Controller
{

    //metodo que crea la vista de inicio
    public function index(){

        //guardo el rol del usuario
        $rol = strtoupper(Auth::user()->nameRol());

        //verifico que tipo de datos voy a cargar acorde al rol
        if($rol == 'ADMINISTRADOR'){

            //cargo los eventos
            $data['eventos'] = Evento::borrado(false)->activo(true)->app(true)->orderBy('Nombre', 'ASC')->get();

        }else if($rol == 'EMPRESA'){

            //cargo los eventos
            $data['eventos'] = Evento::borrado(false)->activo(true)->app(true)->where('Empresa_id', new ObjectId((string)Auth::user()->Empresa_id) )->orderBy('Nombre', 'ASC')->get();

        }else if($rol == 'EVENTO'){

            //cargo los eventos
            $data['eventos'] = Evento::borrado(false)->activo(true)->app(true)->where('_id', new ObjectId((string)Auth::user()->Evento_id) )->orderBy('Nombre', 'ASC')->get();

        }
        for ($i=0; $i < count($data['eventos']); $i++) { 
            
          $pais = Pais::find(new ObjectId($data['eventos'][$i]->Pais_id));
          $data['eventos'][$i]->Pais=$pais;
        }
        $data['sectores'] = Sector::borrado(false)->activo(true)->orderBy('Nombre', 'ASC')->get();
        $data['footer']   = config('oneshow.footer');


        //devuelve la vista asociada
        return view('Multimedia.index', $data);
    }


    //metodo para obtener los datos de la biblioteca por el evento
    public function ajaxGetMultimedia(Request $request){

        $input = $request->all();

        $evento = $input['evento'];

        if($evento){

            $bibliotecas = Biblioteca::borrado(false)->activo(true)->where('Evento_id', new ObjectId($evento) )->get();

            if($bibliotecas){

                return response()->json(['code' => 200, 'multimedia' => $bibliotecas]);

            }else{
                return response()->json(['code' => 500, 'msj' => 'No existen archivos multimedia']);
            }

        }else{

            return response()->json(['code' => 500, 'msj' => 'Ocurrio un problema al cargar los archivos multimedia']);
        }

    }

    //metodo para activar la accion de las herramientas
    public function ajaxActionTool(Request $request){

        $input = $request->all();

        $evento = $input['evento'];
        $tool   = trim(ucwords($input['herramienta']));

        $herra = Herramienta::borrado(false)->activo(true)->where('Nombre', $tool)->first();

        if($herra){

            if($tool == 'Video'){

                $biblioteca = Biblioteca::borrado(false)->activo(true)->where('Evento_id', new ObjectId($evento))->whereIn('Extension', ['mp4'])->get();

                return response()->json(['code' => 200, 'tool' => $tool, 'msj' => 'Herramienta Encontrada', 'biblioteca' => $biblioteca]);


            }else if($tool == 'Audio'){

                $biblioteca = Biblioteca::borrado(false)->activo(true)->where('Evento_id', new ObjectId($evento))->whereIn('Extension', ['mp3'])->get();
                return response()->json(['code' => 200, 'tool' => $tool, 'msj' => 'Herramienta Encontrada', 'biblioteca' => $biblioteca]);


            }else if($tool == 'Imagen') {

                $biblioteca = Biblioteca::borrado(false)->activo(true)->where('Evento_id', new ObjectId($evento))->whereIn('Extension', ['jpg', 'png', 'jpeg'])->get();
                return response()->json(['code' => 200, 'tool' => $tool, 'msj' => 'Herramienta Encontrada', 'biblioteca' => $biblioteca]);


            }else{

                return response()->json(['code' => 200, 'tool' => $tool, 'msj' => 'Herramienta Encontrada']);

            }

        }else{
            return response()->json(['code' => 700, 'tool' => $tool, 'msj' => 'Herramienta no habilitada']);

        }

    }


}

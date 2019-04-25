<?php

namespace App\Http\Controllers;

//controlador encargado de la multimedia

use App\Models\MongoDB\Biblioteca;
use App\Models\MongoDB\Evento;
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


}

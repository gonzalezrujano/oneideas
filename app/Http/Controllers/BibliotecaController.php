<?php

namespace App\Http\Controllers;

//controlador encargado de la biblioteca

use App\Models\MongoDB\Biblioteca;
use App\Models\MongoDB\Empresa;
use App\Models\MongoDB\Estado;
use App\Models\MongoDB\Evento;
use App\Models\MongoDB\Sucursal;
use Auth, DataTables;
use Illuminate\Http\Request;
use MongoDB\BSON\ObjectId;

class BibliotecaController extends Controller
{

    //metodo que crea la vista de inicio
    public function index(){

        //guardo el rol del usuario
        $rol = strtoupper(Auth::user()->nameRol());

        //verifico que tipo de datos voy a cargar acorde al rol
        if($rol == 'ADMINISTRADOR'){

            //cargo las empresas
            $select['empresas'] = Empresa::borrado(false)->activo(true)->orderBy('Nombre', 'ASC')->get();

        }else if($rol == 'EMPRESA'){

            //cargo las empresas
            $select['empresas'] = Empresa::borrado(false)->activo(true)->where('_id', Auth::user()->Empresa_id )->orderBy('Nombre', 'ASC')->get();

        }else if($rol == 'EVENTO'){

            //cargo las empresas
            $select['empresas'] = Empresa::borrado(false)->activo(true)->where('_id', Auth::user()->Empresa_id )->orderBy('Nombre', 'ASC')->get();
        }

        //devuelve la vista asociada
        return view('Configuracion.Biblioteca.index', $select);
    }

    //metodo para llamar la vista de agregar
    public function viewAdd($id){

        $data['estados'] = Estado::borrado(false)->get();
        $data['evento'] = $id;

        //devuleve la vista
        return view('Configuracion.Biblioteca.add', $data);
    }

    //metodo para llamar la vista de ver
    public function viewShow($id){

        $data['existe'] = false;

        $registro = Evento::find($id);

        if($registro){

            $data['existe'] = true;
            $data['estados'] = Estado::borrado(false)->get();
            $data['empresa'] = Empresa::find($registro->Empresa_id);
            $data['evento'] = $registro;

        }

        //devuleve la vista
        return view('Configuracion.Biblioteca.show', $data);
    }

    //metodo para mandar la data de los eventos al datatables
    public function ajaxDatatables(Request $request){

        //capturo el id de la empresa para buscar los eventos en base a ella
        $input = $request->all();

        //almaceno los valores enviados por ajax
        $empresa   = $input['empresa'];

        //guardo el rol del usuario
        $rol = strtoupper(Auth::user()->nameRol());


        //acorde al rol muestro los eventos
        if($rol == 'ADMINISTRADOR'){

            $eve = Evento::borrado(false);

            //si contiene la empresa se la agrego al query de busqueda
            if($empresa){

                $eve->where(function ($q) use ($empresa){
                    $q->where('Empresa_id', new ObjectId($empresa) );
                });
            }

        }else if($rol == 'EMPRESA'){

            $eve = Evento::borrado(false)->where('Empresa_id', new ObjectId(Auth::user()->Empresa_id) )->get();

        }else if($rol == 'EVENTO'){

            $eve = Evento::borrado(false)->where('_id', Auth::user()->Evento_id )->get();

        }

        $eventos = [];

        //extraigo el query con o sin los filtros
        $ev = $eve->get();

        //verifico que exista data sino lo devulevo vacio
        if($ev){

            foreach ($ev as $e) {

                //armo la data que se muestra en la tabla de inicio de la pagina de eventos
                $eventos[] = [
                    '_id'       => $e->_id,
                    'Empresa'   => Empresa::find($e->Empresa_id)->Nombre,
                    'Evento'    => strtoupper($e->Nombre),
                    'IDEvento'  => $e->IDEvento,
                    'Fecha'     => $e->Fecha. ' '.$e->Hora,
                    'App'       => $e->App,
                    'Archivos'  => 0
                ];
            }

        }

        return DataTables::collection( $eventos )->make(true);
    }

    //metodo para mandar la data de los archivos del evento
    public function ajaxDatatablesFiles(Request $request){

        //capturo el id de la empresa para buscar los eventos en base a ella
        $input = $request->all();
        $idevento = $input['evento'];

        $files = Biblioteca::borrado(false)->activo(true)->where('Evento_id', new ObjectID($idevento) )->get();

        $archivos = [];

        //verifico que exista data sino lo devulevo vacio
        if($files){

            foreach ($files as $f) {

                //armo la data que se muestra en la tabla
                $archivos[] = [
                    '_id'       => $f->_id,
                    'Nombre'    => $f->Nombre,
                    'Tipo'      => $f->Tipo,
                    'Size'      => $f->Size,
                    'Activo'    => $f->Activo
                ];
            }

        }

        return DataTables::collection( $archivos )->make(true);
    }


}

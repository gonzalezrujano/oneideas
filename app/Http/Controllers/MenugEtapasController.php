<?php

namespace App\Http\Controllers;
use App\Models\MongoDB\MenuGEtapas;
use App\Models\MongoDB\Agenda;
use App\Models\MongoDB\Evento;
use App\Models\MongoDB\Estado;
use App\Models\MongoDB\MenuAppInvitado;
use App\Models\MongoDB\Empresa;

use Illuminate\Http\Request;

use Carbon\Carbon;
use MongoDB\BSON\ObjectID;
use DB, DataTables, Image, Storage, File, Auth, Session;

//controlador encargado de la seccion empresa
class MenugEtapasController extends Controller
{

    //metodo para llamar la vista principal de empresas
    public function index(){

        //devuleve la vista
        $rol = strtoupper(Auth::user()->nameRol());

        //verifico que tipo de datos voy a cargar acorde al rol
        if($rol == 'ADMINISTRADOR'){

            //cargo las empresas
            $select['empresas'] = Empresa::borrado(false)->activo(true)->orderBy('Nombre', 'ASC')->get();
            $select['show_select_evento'] = false;            

        }else if($rol == 'EMPRESA'){

            //cargo las empresas
            $select['empresas'] = Empresa::borrado(false)->activo(true)->where('_id', Auth::user()->Empresa_id )->orderBy('Nombre', 'ASC')->get();
            $select['eventos'] = Evento::where('Empresa_id',Auth::user()->Empresa_id)->get();
            $select['show_select_evento'] = true;

        }else if($rol == 'EVENTO'){

            //cargo las empresas
            $select['empresas'] = Empresa::borrado(false)->activo(true)->where('_id', Auth::user()->Empresa_id )->orderBy('Nombre', 'ASC')->get();
            $select['show_select_evento'] = false;
        }
        return view('Configuracion.Menugetapas.index', $select);
    }

    //metodo para llamar la vista de agregar empresa
    public function viewAdd(){
        $data['estados'] = Estado::borrado(false)->get();
        //return view
        return view('Configuracion.Menugetapas.add', $data);
    }

    //metodo para llamar la vista de ver empresa
    public function viewShow($id){

        $data['existe'] = false;

        $registro = MenuGEtapas::find($id);

        if($registro){
            $data['existe'] = true;
            $data['estados'] = Estado::borrado(false)->get();
            $data['etapa'] = $registro;

        }

        //devuelve la vista
        return view('Configuracion.Menugetapas.show', $data);
    }

    //metodo para llamar la vista de editar empresa
    public function viewEdit($id){

        $data['existe'] = false;

         $registro = MenuGEtapas::find($id);

        if($registro){

            $data['existe'] = true;
            $data['estados'] = Estado::borrado(false)->get();
            $data['etapa'] = $registro;
        }

        //devuleve la vista
        return view('Configuracion.Menugetapas.edit', $data);
    }

    //metodo para mandar la data de las empresas al datatables
    public function ajaxDatatables(){

        //guardo el tipo de rol del usuario
        $rol = strtoupper(Auth::user()->nameRol());

        //acorde al tipo de rol cargo empresas
        if($rol == 'ADMINISTRADOR'){

            $menu_g_etapas = MenuGEtapas::where('Borrado', false)->get();

        }
        $menu_etapas = [];

        //verifico que exista data sino lo devulevo vacio
        if($menu_g_etapas){

            foreach ($menu_g_etapas as $m_etapa) {
                $menu_etapas[] = [
                    '_id'    => $m_etapa->_id,
                    'Titulo' => strtoupper($m_etapa->Titulo),
                    'Descripcion' => $m_etapa->Descripcion,
                    'Numero_etapa' => $m_etapa->Numero_etapa,
                    'Activo'  => $m_etapa->Activo
                ];
            }

        }

        return DataTables::collection( $menu_etapas )->make(true);
    }

    //metodo para agregar las empresas
    public function ajaxAdd(Request $request){

        //verifico que la respuesta venga por ajax
        if($request->ajax()){

            $data = $request->all();
            $registro =  new MenuGEtapas;
            $registro->Numero_etapa = $data['numero_etapa'];
            $registro->Titulo = $data['titulo'];
            $registro->Descripcion = $data['descripcion'];
            $registro->Activo = $data['status'];
            $registro->Borrado = false;
            $saved = $registro->save();
            if ($saved) {
                return response()->json(['code' => 200, 'last_id' => $registro->id]);
            }
            return response()->json(['code' => 500]);
        }

    }

    //metodo para actualizar las empresas
    public function ajaxUpdate(Request $request){

        //verifico que la respuesta venga por ajax
        if($request->ajax()){
            //obtengo todos los datos del formulario
            $data = $request->all();
            $etapa = MenuGEtapas::find($data['etapa_id']);
            $etapa->Titulo = $data['titulo'];
            $etapa->Numero_etapa = $data['numero_etapa'];
            $etapa->Descripcion = $data['descripcion'];
            $etapa->Activo = $data['status'];
            
            if($etapa->save()){
                return response()->json(['code' => 200, 'data' => $data]);
            }
            return response()->json(['code' => 500]);
        }

    }

    //metodo para borrar empresas
    public function ajaxDelete(Request $request){

        //verifico que la respuesta venga por ajax
        if($request->ajax()){

            //capturo el valor del id
            $input = $request->all();
            $id = $input['id'];

            //valido que venga el id sino mando un error
            if($id){

                //ubico el id en la bd
                $registro = MenuGEtapas::find($id);

                //DB::table('Sucursales')->where('Empresa_id', new ObjectId($id))->update(['Borrado' => true]);

                //valido que de verdad sea borrado en caso de que no arrojo un error
                if($registro->delete()){
                    return json_encode(['code' => 200]);
                }
                return json_encode(['code' => 500]);
            }
            return json_encode(['code' => 600]);
        }

    }

    // Custom functions
}

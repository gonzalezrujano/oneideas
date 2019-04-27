<?php

namespace App\Http\Controllers;
use App\Http\Requests\ValidateCliente;
use App\Models\MongoDB\Cliente;
use App\Models\MongoDB\Club;
use App\Models\MongoDB\Color;
use App\Models\MongoDB\Estado;
use App\Models\MongoDB\EstadoCivil;
use App\Models\MongoDB\Log;
use Illuminate\Http\Request;
use App\Models\MongoDB\Pais;
use MongoDB\BSON\ObjectID;
use DB, DataTables, File;

//controlador encargado de la seccion de los clientes
class ClienteController extends Controller
{

    //metodo para llamar la vista principal de clientes
    public function index(){

        //devuleve la vista
        return view('Configuracion.Clientes.index');
    }

    //metodo para llamar la vista de ver
    public function viewShow($id){

        $data['existe'] = false;

        $registro = Cliente::find($id);

        if($registro){

            $data['existe'] = true;
            $data['paises'] = Pais::borrado(false)->get();
            $data['civiles'] = EstadoCivil::borrado(false)->orderBy('Nombre', 'asc')->get();
            $data['cliente'] = $registro;

            if($registro->Pais_id){
                $data['equipos'] = Club::where('Pais', new ObjectID($registro->Pais_id))->orderBy('Nombre', 'asc')->get();
            }else{
                $data['equipos'] = null;
            }

        }

        //devuleve la vista
        return view('Configuracion.Clientes.show', $data);
    }

    //metodo para llamar la vista de editar
    public function viewEdit($id){

        $data['existe'] = false;

        $registro = Cliente::find($id);

        if($registro){

            $data['existe'] = true;
            $data['paises'] = Pais::borrado(false)->get();
            $data['civiles'] = EstadoCivil::borrado(false)->orderBy('Nombre', 'asc')->get();
            $data['cliente'] = $registro;

            if($registro->Pais_id){
                $data['equipos'] = Club::where('Pais', new ObjectID($registro->Pais_id))->orderBy('Nombre', 'asc')->get();
            }else{
                $data['equipos'] = null;

            }
        }

        //devuleve la vista
        return view('Configuracion.Clientes.edit', $data);
    }


    //metodo para mandar la data de los usuarios al datatables
    public function ajaxDatatables(){

        //cargo los usuarios
        $clientes = Cliente::borrado(false)->get();

        $cli = [];

        //verifico que exista data sino lo devulevo vacio
        if($clientes){

            foreach ($clientes as $c) {

                if($c->TipoCuenta != 'Visitante'){

                    $pais = '';

                    if(!empty((string)$c->Pais_id)){
                        $pais = Pais::find((string)$c->Pais_id)->Nombre;
                    }

                    //armo la data que se muestra en la tabla de inicio de la pagina de usuarios
                    $cli[] = [
                        '_id'         => $c->_id,
                        'Nombre'      => $c->Nombre,
                        'Apellido'    => $c->Apellido,
                        'Correo'      => $c->Correo,
                        'Cuenta'      => ucfirst(strtolower($c->TipoCuenta)),
                        'Pais'        => $pais,
                        'Telefono'    => $c->Telefono,
                        'Activo'      => $c->Activo
                    ];

                }
            }

        }

        //le mando la data al datatable
        return DataTables::collection( $cli )->make(true);
    }

    //metodo para actualizar los usuarios
    public function ajaxUpdate(ValidateCliente $request){

        //verifico que la respuesta venga por ajax
        if($request->ajax()){

            //obtengo todos los datos del formulario
            $input = $request->all();

            //capturo los datos y los acomodo en un arreglo
            $data = [
                'id'                  => $input['cliente-id'],
                'nombre'              => ($input['cliente-nombre']),
                'apellido'            => ($input['cliente-apellido']),
                'correo'              => strtolower($input['cliente-correo']),
                'telefono'            => ($input['cliente-telefono']),
                'pais'                => $input['cliente-pais'] == null ? '' : new ObjectID($input['cliente-pais']),
                'civil'               => $input['cliente-civil'] == '' ? '' : new ObjectID($input['cliente-civil']),
                'fn'                  => $input['cliente-fn'],
                'sexo'                => $input['cliente-sexo'],
                'equipo'              => $input['cliente-equipo'],
            ];

            //procedo a guardarlos en la bd
            $registro = Cliente::find($data['id']);
            $registro->Nombre              = $data['nombre'];
            $registro->Apellido            = $data['apellido'];
            $registro->Correo              = $data['correo'];
            $registro->Telefono            = $data['telefono'];
            $registro->Pais_id             = $data['pais'];
            $registro->EstadoCivil_id      = $data['civil'];
            $registro->Sexo                = $data['sexo'];
            $registro->FechaNacimiento     = $data['fn'];
            $registro->Equipo              = $data['equipo'];

            //verifico si fue exitoso el insert en la bd
            if($registro->update()){
                return response()->json(['code' => 200]);
            }else{
                return response()->json(['code' => 500]);
            }
        }

    }

    //metodo para borrar el usuario
    public function ajaxActive(Request $request){

        //verifico que la respuesta venga por ajax
        if($request->ajax()){

            //capturo el valor del id
            $input = $request->all();
            $id = $input['id'];

            //valido que venga el id sino mando un error
            if($id){

                //ubico el id en la bd
                $registro = Cliente::find($id);

                if($registro->Activo == false){
                    $registro->Activo = true;
                }else{
                    $registro->Activo = false;
                }

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


}

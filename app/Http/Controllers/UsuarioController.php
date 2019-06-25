<?php

namespace App\Http\Controllers;
use App\Http\Requests\ValidateUsuario;
use App\Models\MongoDB\Empresa;
use App\Models\MongoDB\Estado;
use App\Models\MongoDB\Evento;
use App\Models\MongoDB\Log;
use App\Models\MongoDB\Provincia;
use App\Models\MongoDB\Departamento;
use App\Models\MongoDB\Localidad;
use App\Models\MongoDB\Rol;
use App\Models\MongoDB\Sucursal;
use App\Models\MongoDB\TipoDocumento;
use App\Models\MongoDB\Usuario;
use Illuminate\Http\Request;
use App\Models\MongoDB\Pais;
use MongoDB\BSON\ObjectID;
use DB, DataTables, Image, Storage, File, Auth;

//controlador encargado de la seccion de los usuarios
class UsuarioController extends Controller
{

    //metodo para llamar la vista principal de usuarios
    public function index(){

        //devuleve la vista
        return view('Configuracion.Usuarios.index');
    }

    //metodo para llamar la vista de agregar
    public function viewAdd(){

        $emp = Empresa::borrado(false)->activo(true)->get();

        $select['paises'] = Pais::borrado(false)->get();
        $select['empresas'] = $emp;
        $select['tipodocumentos'] = TipoDocumento::borrado(false)->activo(true)->orderBy('TipoDocumento', 'ASC')->get();
        $select['roles'] = Rol::borrado(false)->activo(true)->orderBy('Nombre', 'ASC')->get();
        $select['estados'] = Estado::borrado(false)->get();

        //devuleve la vista
        return view('Configuracion.Usuarios.add', $select);
    }

    //metodo para llamar la vista de ver
    public function viewShow($id){

        $data['existe'] = false;

        $registro = Usuario::find($id);

        if($registro){

            $data['existe'] = true;
            $data['paises'] = Pais::borrado(false)->get();
            $data['tipodocumentos'] = TipoDocumento::borrado(false)->activo(true)->orderBy('TipoDocumento', 'ASC')->get();
            $data['roles'] = Rol::borrado(false)->activo(true)->orderBy('Nombre', 'ASC')->get();
            $data['estados'] = Estado::borrado(false)->get();
            $data['empresas'] = Empresa::borrado(false)->activo(true)->get();
            $data['usuario'] = $registro;

        }

        //devuleve la vista
        return view('Configuracion.Usuarios.show', $data);
    }

    //metodo para llamar la vista de editar
    public function viewEdit($id){

        $data['existe'] = false;

        $registro = Usuario::find($id);

        if($registro){

            $data['existe'] = true;
            $data['paises'] = Pais::borrado(false)->get();
            $data['tipodocumentos'] = TipoDocumento::borrado(false)->activo(true)->orderBy('TipoDocumento', 'ASC')->get();
            $data['roles'] = Rol::borrado(false)->activo(true)->orderBy('Nombre', 'ASC')->get();
            $data['estados'] = Estado::borrado(false)->get();
            $data['empresas'] = Empresa::borrado(false)->activo(true)->get();
            $data['usuario'] = $registro;
            $data['eventos'] = Evento::borrado(false)->activo(true)->where('Empresa_id', new ObjectID($registro->Empresa_id))->orderBy('Nombre', 'asc')->get();

        }

        //devuleve la vista
        return view('Configuracion.Usuarios.edit', $data);
    }


    //metodo para mandar la data de los usuarios al datatables
    public function ajaxDatatables(){

        //cargo los usuarios
        $usuarios = Usuario::borrado(false)->get();

        $usu = [];

        //verifico que exista data sino lo devulevo vacio
        if($usuarios){

            foreach ($usuarios as $u) {

                if($u->Evento_id){
                    $evento = Evento::find($u->Evento_id)->Nombre;
                }else{
                    $evento = 'N/A';
                }

                //armo la data que se muestra en la tabla de inicio de la pagina de usuarios
                $usu[] = [
                    '_id'         => $u->_id,
                    'Nombre'      => $u->Nombre,
                    'Apellido'    => $u->Apellido,
                    'Correo'      => $u->Correo,
                    'Empresa'     => Empresa::find($u->Empresa_id)->Nombre,
                    'Evento'      => $evento,
                    'RolID'       => (String)$u->Rol_id,
                    'Rol'         => Rol::find($u->Rol_id)->Nombre,
                    'Activo'      => $u->Activo
                ];
            }

        }

        //le mando la data al datatable
        return DataTables::collection( $usu )->make(true);
    }

    //metodo para agregar los usuarios
    public function ajaxAdd(ValidateUsuario $request){

        //verifico que la respuesta venga por ajax
        if($request->ajax()){

            $input = $request->all();

            //convierto el dni
            $dni = formatDni($input['documento']);

            $event = $input['evento'];

            if($event){
                $e = new ObjectID($event);
            }else{
                $e = null;
            }

            //capturo los datos y los acomodo en un arreglo
            $data = [
                'tipo-documento'      => new ObjectID($input['tipo-documento']),
                'documento'           => $dni,
                'nombre'              => strtoupper($input['nombre']),
                'apellido'            => strtoupper($input['apellido']),
                'correo'              => strtoupper($input['correo']),
                'telefono'            => strtoupper($input['telefono']),
                'pais'                => new ObjectID($input['pais']),
                'rol'                 => new ObjectID($input['rol']),
                'empresa'             => new ObjectID($input['empresa']),
                'evento'              => $e,
                'password'            => bcrypt($dni),
                'estatus'             => (boolean) $input['estatus'],
                'cambio-password'     => (boolean) true,
                'borrado'             => false
            ];

            //procedo a guardarlos en la bd
            $registro = new Usuario;
            $registro->TipoDocumento_id    = $data['tipo-documento'];
            $registro->Documento           = $data['documento'];
            $registro->Nombre              = $data['nombre'];
            $registro->Apellido            = $data['apellido'];
            $registro->Correo              = $data['correo'];
            $registro->Telefono            = $data['telefono'];
            $registro->Pais_id             = $data['pais'];
            $registro->Rol_id              = $data['rol'];
            $registro->Empresa_id          = $data['empresa'];
            $registro->Evento_id           = $data['evento'];
            $registro->Password            = $data['password'];
            $registro->Activo              = $data['estatus'];
            $registro->CambioPassword      = $data['cambio-password'];
            $registro->Borrado             = $data['borrado'];

            //verifico si fue exitoso el insert en la bd
            if($registro->save()){
                return response()->json(['code' => 200]);
            }else{
                return response()->json(['code' => 500]);
            }
        }

    }

    //metodo para actualizar los usuarios
    public function ajaxUpdate(ValidateUsuario $request){

        //verifico que la respuesta venga por ajax
        if($request->ajax()){

            //obtengo todos los datos del formulario
            $input = $request->all();

            //convierto el dni
            $dni = formatDni($input['documento']);

            $event = $input['evento'];

            if($event){
                $e = new ObjectID($event);
            }else{
                $e = null;
            }

            //capturo los datos y los acomodo en un arreglo
            $data = [
                'id'                  => $input['usuario-id'],
                'tipo-documento'      => new ObjectID($input['tipo-documento']),
                'documento'           => $dni,
                'nombre'              => strtoupper($input['nombre']),
                'apellido'            => strtoupper($input['apellido']),
                'correo'              => strtoupper($input['correo']),
                'telefono'            => strtoupper($input['telefono']),
                'pais'                => new ObjectID($input['pais']),
                'rol'                 => new ObjectID($input['rol']),
                'empresa'             => new ObjectID($input['empresa']),
                'evento'              => $e,
                'estatus'             => $input['estatus'] == 0 ? (boolean) false : (boolean) true
            ];

            //procedo a guardarlos en la bd
            $registro = Usuario::find($data['id']);
            $registro->TipoDocumento_id    = $data['tipo-documento'];
            $registro->Documento           = $data['documento'];
            $registro->Nombre              = $data['nombre'];
            $registro->Apellido            = $data['apellido'];
            $registro->Correo              = $data['correo'];
            $registro->Telefono            = $data['telefono'];
            $registro->Pais_id             = $data['pais'];
            $registro->Rol_id              = $data['rol'];
            $registro->Empresa_id          = $data['empresa'];
            $registro->Evento_id           = $data['evento'];
            $registro->Activo              = $data['estatus'];

            //verifico si fue exitoso el insert en la bd
            if($registro->update()){
                return response()->json(['code' => 200]);
            }else{
                return response()->json(['code' => 500]);
            }
        }

    }

    //metodo para borrar el usuario
    public function ajaxDelete(Request $request){

        //verifico que la respuesta venga por ajax
        if($request->ajax()){

            //capturo el valor del id
            $input = $request->all();
            $id = $input['id'];

            //valido que venga el id sino mando un error
            if($id){

                //ubico el id en la bd
                $registro = Usuario::find($id);
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

    }

    public function getUsuario($id){

        $data['existe'] = false;

        $registro = Usuario::find($id);

        if($registro){

            $data['existe'] = true;
            $data['paises'] = Pais::borrado(false)->get();
            $data['tipodocumentos'] = TipoDocumento::borrado(false)->activo(true)->orderBy('TipoDocumento', 'ASC')->get();
            $data['roles'] = Rol::borrado(false)->activo(true)->orderBy('Nombre', 'ASC')->get();
            $data['estados'] = Estado::borrado(false)->get();
            $data['empresas'] = Empresa::borrado(false)->activo(true)->get();
            $data['usuario'] = $registro;

        }


        return json_encode(['code' => 200, 'data' => $data]);
    }

    public function getPermisosUsuario($id){
        $rol = Rol::find($id);
        if($rol){
            return json_encode(['code' => 200, 'data' => $rol]);

        }
        return json_encode(['code' => 300, 'data' => ""]);
    }

}

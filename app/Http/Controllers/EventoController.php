<?php

namespace App\Http\Controllers;

use App\Http\Requests\ValidateEvento;
use App\Mail\MailNotificacionAprobacion;
use App\Models\MongoDB\Categoria;
use App\Models\MongoDB\Empresa;
use App\Models\MongoDB\Evento;
use App\Models\MongoDB\MenuAppInvitado;
use App\Models\MongoDB\Pais;
use App\Models\MongoDB\Estado;
use App\Models\MongoDB\Envio;
use Carbon\Carbon;
use Illuminate\Http\Request;
use DB, DataTables, Image, Storage, File, Auth, Mail, QrCode;
use MongoDB\BSON\ObjectID;
use Illuminate\Support\Str;


//controlador encargado de la seccion de eventos
class EventoController extends Controller
{


    //metodo para llamar la vista principal de eventos
    public function index($id){

        //cargo los datos de la empresa
        $empresa = Empresa::find($id);

        //cargo la empresa
        $data['empresa'] = $empresa;
        //cargo lista de estados
        $data['estados'] = Estado::where('Borrado', false)->get();
        //cargo el pais
        $select['paises'] = Pais::borrado(false)->get();

        //devuleve la vista
        return view('Configuracion.Eventos.index', $data);
    }

    //metodo para llamar la vista de agregar
    public function viewAdd($id){

        $data['paises'] = Pais::borrado(false)->get();
        $data['menusapp'] = MenuAppInvitado::borrado(false)->activo(true)->orderBy('Nombre', 'asc')->get();
        $data['estados'] = Estado::borrado(false)->get();
        $data['empresa'] = Empresa::find($id);

        //devuleve la vista
        return view('Configuracion.Eventos.add', $data);
    }

    //metodo para llamar la vista de ver
    public function viewShow($id){

        $data['existe'] = false;

        $registro = Evento::find($id);

        if($registro){

            $data['existe'] = true;
            $data['paises'] = Pais::borrado(false)->get();
            $data['estados'] = Estado::borrado(false)->get();
            $data['empresa'] = Empresa::find($registro->Empresa_id);
            $data['evento'] = $registro;
            $data['menusapp'] = MenuAppInvitado::borrado(false)->activo(true)->orderBy('Nombre', 'asc')->get();
            $data['menuapp'] = $this->processGetMenuApp($registro->MenuApp);

        }

        //devuleve la vista
        return view('Configuracion.Eventos.show', $data);
    }

    //metodo para llamar la vista de editar
    public function viewEdit($id){

        $data['existe'] = false;

        $registro = Evento::find($id);

        if($registro){

            $data['existe'] = true;
            $data['paises'] = Pais::borrado(false)->get();
            $data['estados'] = Estado::borrado(false)->get();
            $data['empresa'] = Empresa::find($registro->Empresa_id);
            $data['evento'] = $registro;
            $data['menusapp'] = MenuAppInvitado::borrado(false)->activo(true)->orderBy('Nombre', 'asc')->get();
            $data['menuapp'] = $this->processGetMenuApp($registro->MenuApp);

        }

        //devuleve la vista
        return view('Configuracion.Eventos.edit', $data);
    }

    //metodo para mandar la data de los eventos al datatables
    public function ajaxDatatables(Request $request){

        //capturo el id de la empresa para buscar los eventos en base a ella
        $input = $request->all();
        $id_emp = $input['id_emp'];

        //guardo el rol del usuario
        $rol = strtoupper(Auth::user()->nameRol());

        //acorde al rol muestro los eventos
        if($rol == 'ADMINISTRADOR'){

            $eve = Evento::borrado(false)->where('Empresa_id', new ObjectID($id_emp) )->get();

        }else if($rol == 'EMPRESA'){

            $eve = Evento::borrado(false)->where('Empresa_id', new ObjectID($id_emp) )->get();

        }else if($rol == 'EVENTO'){

            $eve = Evento::borrado(false)->where('_id', Auth::user()->Evento_id )->get();

        }

        $eventos = [];

        //verifico que exista data sino lo devulevo vacio
        if($eve){

            foreach ($eve as $e) {

                //armo la data que se muestra en la tabla de inicio de la pagina de eventos
                $eventos[] = [
                    '_id'       => $e->_id,
                    'Nombre'    => $e->Nombre,
                    'IDEvento'  => $e->IDEvento,
                    'Fecha'     => $e->Fecha. ' '.$e->Hora,
                    'Pais'      => Pais::find($e->Pais_id)->Nombre,
                    'App'       => $e->App,
                    'Activo'    => $e->Activo
                ];
            }

        }

        return DataTables::collection( $eventos )->make(true);
    }

    //metodo para agregar evento
    public function ajaxAdd(ValidateEvento $request){

        //verifico que la respuesta venga por ajax
        if($request->ajax()){

            $input = $request->all();

            //guardo la imagen en una variable
            $image = $input['logo'];
            //ubico la ruta de la imagen
            $path = $image->getRealPath();
            //obtengo la extension
            $type = $image->getClientOriginalExtension();
            //creo un nombre temporal
            $name = time().'.'.$type;
            //ruta imagen temporal
            $pathImgTemporal = public_path('images/'.$name);
            //proceso la imagen a 200x200
            $img = Image::make($path)->crop( (int)round($input['w']),  (int)round($input['h']),  (int)round($input['x']),  (int)round($input['y']) )->fit(200,200)->save($pathImgTemporal);
            //obtengo la data de la imagen
            $data = file_get_contents($pathImgTemporal);
            //convierto a base64
            $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
            //elimino imagen temporal
            File::delete($pathImgTemporal);

            $ubi = $input['ubicacion'];
            $ubicacion = 'MANUAL';

            if($ubi == 'g'){
                $ubicacion = 'GPS';
            }

            $menusapp = [];

            if($input['menuapp']){

                //proceso los menus
                $menusapp = $this->processMenuApp($input['menuapp']);
            }


            //capturo los datos y los acomodo en un arreglo
            $data = [
                'id-emp'           => new ObjectID($input['id-emp']),
                'nombre'           => $input['nombre'],
                'fecha'            => $input['fecha'],
                'hora'             => $input['hora'],
                'estatus'          => $input['estatus'],
                'app'              => $input['app'],
                'licencias'        => $input['licencias'],
                'pais'             => new ObjectID($input['pais']),
                'latitud'          => $input['latitud'],
                'longitud'         => $input['longitud'],
                'ubicacion'        => $ubicacion,
                'logo'             => $base64,
                'idevento'         => $this->generateRandomIDEvento(),
                'borrado'          => false
            ];


            //procedo a guardarlos en la bd
            $registro = new Evento;
            $registro->Empresa_id                = $data['id-emp'];
            $registro->Nombre                    = $data['nombre'];
            $registro->Fecha                     = $data['fecha'];
            $registro->Hora                      = $data['hora'];
            $registro->Activo                    = (boolean) $data['estatus'];
            $registro->App                       = (boolean) $data['app'];
            $registro->Licencias                 = $data['licencias'];
            $registro->Pais_id                   = $data['pais'];
            $registro->Latitud                   = $data['latitud'];
            $registro->Longitud                  = $data['longitud'];
            $registro->Ubicacion                 = $data['ubicacion'];
            $registro->Logo                      = $data['logo'];
            $registro->IDEvento                  = $data['idevento'];
            $registro->MenuApp                   = $menusapp;
            $registro->Borrado                   = $data['borrado'];


            //verifico si fue exitoso el insert en la bd
            if($registro->save()){

                return response()->json(['code' => 200]);

            }else{
                return response()->json(['code' => 500]);
            }
        }

    }

    //metodo para actualizar
    public function ajaxUpdate(ValidateEvento $request){

        //verifico que la respuesta venga por ajax
        if($request->ajax()){

            //obtengo todos los datos del formulario
            $input = $request->all();

            //instancio los datos a editar
            $registro = Evento::find($input['id-evento']);

            //guardo la imagen en una variable
            $image = $input['logo'];

            //valido que la imagen este o no vacio, si esta vacia vuelvo a guardar la imagen actual sino la actualizo
            if($image == 'undefined'){
                $base64 = $registro->Logo;
            }else{

                //ubico la ruta de la imagen
                $path = $image->getRealPath();
                //obtengo la extension
                $type = $image->getClientOriginalExtension();
                //creo un nombre temporal
                $name = time().'.'.$type;
                //ruta imagen temporal
                $pathImgTemporal = public_path('images/'.$name);
                //proceso la imagen a 200x200
                $img = Image::make($path)->crop( (int)round($input['w']),  (int)round($input['h']),  (int)round($input['x']),  (int)round($input['y']) )->fit(200,200)->save($pathImgTemporal);
                //obtengo la data de la imagen
                $data = file_get_contents($pathImgTemporal);
                //convierto a base64
                $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
                //elimino imagen temporal
                File::delete($pathImgTemporal);

            }

            $ubi = $input['ubicacion'];
            $ubicacion = 'MANUAL';

            if($ubi == 'g'){
                $ubicacion = 'GPS';
            }

            $menusapp = [];

            if($input['menuapp']){

                //proceso los menus
                $menusapp = $this->processMenuApp($input['menuapp']);
            }

            $data = [
                'id'               => $input['id-evento'],
                'nombre'           => $input['nombre'],
                'fecha'            => $input['fecha'],
                'hora'             => $input['hora'],
                'estatus'          => $input['estatus'],
                'licencias'        => $input['licencias'],
                'pais'             => new ObjectID($input['pais']),
                'latitud'          => $input['latitud'],
                'longitud'         => $input['longitud'],
                'ubicacion'        => $ubicacion,
                'logo'             => $base64
            ];

            //procedo a guardarlos en la bd
            $registro = Evento::find($data['id']);
            $registro->Nombre                    = $data['nombre'];
            $registro->Fecha                     = $data['fecha'];
            $registro->Hora                      = $data['hora'];
            $registro->Activo                    = (boolean) $data['estatus'];
            $registro->Licencias                 = $data['licencias'];
            $registro->Pais_id                   = $data['pais'];
            $registro->Latitud                   = $data['latitud'];
            $registro->Longitud                  = $data['longitud'];
            $registro->Ubicacion                 = $data['ubicacion'];
            $registro->MenuApp                   = $menusapp;
            $registro->Logo                      = $data['logo'];

            //verifico si fue exitoso el insert en la bd
            if($registro->update()){

                return response()->json(['code' => 200]);

            }else{
                return response()->json(['code' => 500]);
            }
        }

    }

    //metodo para borrar
    public function ajaxDelete(Request $request){

        //verifico que la respuesta venga por ajax
        if($request->ajax()){

            //capturo el valor del id
            $input = $request->all();
            $id = $input['id'];

            //valido que venga el id sino mando un error
            if($id){

                //ubico el id en la bd
                $registro = Evento::find($id);
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

    //metodo para cambiar la visualizacion o estado
    public function ajaxEnvios(Request $request){

        //verifico que la respuesta venga por ajax
        if($request->ajax()){

            //capturo el valor del id
            $input = $request->all();
            $id = $input['evento'];

            //valido que venga el id sino mando un error
            if($id){

                //ubico el id en la bd
                $registro = Evento::find($id);
                $envios = Envio::get();

                if($registro){
                    return json_encode(['code' => 200,'envios'=>$envios]);
                }else{
                    return json_encode(['code' => 500]);
                }

            }else{

                return json_encode(['code' => 600]);
            }
        }

    }

    //metodo para cambiar la visualizacion o estado
    public function ajaxEnviosCola(Request $request){

        //verifico que la respuesta venga por ajax
        if($request->ajax()){

            //capturo el valor del id
            $input = $request->all();
            $evento = $input['evento'];
            $title = $input['title'];
            $estado = $input['estado'];
            $inicio = $input['inicio'];
            $fin = $input['fin'];
            $parametro = $input['parametro'];

            //valido que venga el id sino mando un error
            if($evento){

                //ubico el id en la bd
                $evento = Evento::find($evento);

                $envio = new Envio;
                $envio->Evento = $input['evento'];
                $envio->Tipo = $title;
                $envio->Estado = $estado;
                $envio->Inicio = $inicio;
                $envio->Fin = $fin;
                $envio->Parametro = $parametro;

                $envios = Envio::get();

                if($envio->save()){
                    return json_encode(['code' => 200,'envios'=>$envios]);
                }else{
                    return json_encode(['code' => 500]);
                }

            }else{

                return json_encode(['code' => 600]);
            }
        }

    }

    //metodo para cambiar la visualizacion o estado
    public function ajaxChangeActive(Request $request){

        //verifico que la respuesta venga por ajax
        if($request->ajax()){

            //capturo el valor del id
            $input = $request->all();
            $id = $input['id'];

            //valido que venga el id sino mando un error
            if($id){

                //ubico el id en la bd
                $registro = Evento::find($id);

                if($registro->App == false){
                    $registro->App = true;
                }else{
                    $registro->App = false;
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


    public function generateRandomIDEvento(){

        $id = Str::random(6);

        $validator = \Validator::make(['id'=>$id],['id'=>'unique:Eventos,IDEvento']);

        if($validator->fails()){
            return $this->generateRandomIDEvento();
        }

        return strtoupper($id);
    }

    //metodo que procesa los menus app
    public function processMenuApp($data){

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

    //metodo que arma los menus app
    public function processGetMenuApp($data){

        $result = [];

        //renombro la llave
        foreach ($data as $value ){

            $result[] = (string)$value;
        }

        //devuelvo el resultado en formato json
        return $result;
    }

}

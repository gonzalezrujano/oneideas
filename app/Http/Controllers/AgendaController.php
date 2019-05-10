<?php

namespace App\Http\Controllers;
use App\Models\MongoDB\Agenda;
use App\Models\MongoDB\Evento;
use App\Models\MongoDB\MenuAppInvitado;
use App\Http\Requests\ValidateEmpresa;
use App\Models\MongoDB\Departamento;
use App\Models\MongoDB\Localidad;
use App\Models\MongoDB\MedioPago;
use App\Models\MongoDB\Pais;
use App\Models\MongoDB\Empresa;
use App\Models\MongoDB\Provincia;
use App\Models\MongoDB\Estado;
use App\Models\MongoDB\Cobranza;
use App\Models\MongoDB\Sucursal;
use App\Models\MongoDB\TipoDocumento;
use App\Models\MongoDB\TipoRubro;
use Illuminate\Http\Request;
use App\Pdf\Empresa\QRPDF;
use Carbon\Carbon;
use MongoDB\BSON\ObjectID;
use DB, DataTables, Image, Storage, File, Auth;

//controlador encargado de la seccion empresa
class AgendaController extends Controller
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
        return view('Configuracion.Agendas.index', $select);
    }

    //metodo para llamar la vista de agregar empresa
    public function viewAdd(){

        $select['paises'] = Pais::borrado(false)->get();
        $select['estados'] = Estado::borrado(false)->get();

        //devuleve la vista
        return view('Configuracion.Empresas.add', $select);
    }

    //metodo para llamar la vista de ver empresa
    public function viewShow($id){

        $data['existe'] = false;

        $registro = Agenda::find($id);

        if($registro){

            $data['existe'] = true;
            $data['paises'] = Pais::borrado(false)->get();
            $data['estados'] = Estado::borrado(false)->get();
            $data['agenda'] = $registro;

        }

        //devuelve la vista
        return view('Configuracion.Agendas.show', $data);
    }

    //metodo para llamar la vista de editar empresa
    public function viewEdit($id){

        $data['existe'] = false;

        $registro = Agenda::find($id);

        if($registro){

            $data['existe'] = true;
            $data['paises'] = Pais::borrado(false)->get();
            $data['estados'] = Estado::borrado(false)->get();
            $data['agenda'] = $registro;

        }

        //devuleve la vista
        return view('Configuracion.Agendas.edit', $data);
    }

    //metodo para mandar la data de las empresas al datatables
    public function ajaxDatatables(){

        //guardo el tipo de rol del usuario
        $rol = strtoupper(Auth::user()->nameRol());

        //acorde al tipo de rol cargo empresas
        if($rol == 'ADMINISTRADOR'){

            $agenda = Agenda::all();

        }else if($rol == 'EMPRESA'){

            $agenda = Agenda::all();//$emp = Agenda::borrado(false)->where('_id',  Auth::user()->Empresa_id  )->get();

        }else if($rol == 'EVENTO'){

            $agenda = Agenda::all();//$emp = Agenda::borrado(false)->where('_id', Auth::user()->Empresa_id  )->get();

        }

        $agendas = [];

        //verifico que exista data sino lo devulevo vacio
        if($agenda){

            foreach ($agenda as $ag) {

                //armo la data que se muestra en la tabla de inicio de la pagina de agendas
                $agendas[] = [
                    '_id'    => $ag->_id,
                    'Titulo' => strtoupper($ag->Titulo),
                    'Descripcion' => $ag->Descripcion,
                    'Evento' => Evento::where('_id',$ag->Evento_id)->get()[0]->Nombre,
                    'Hora'  => $ag->Hora
                ];
            }

        }

        return DataTables::collection( $agendas )->make(true);
    }

    //metodo para agregar las empresas
    public function ajaxAdd(ValidateEmpresa $request){

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


            //capturo los datos y los acomodo en un arreglo
            $data = [
                'identificacion'   => strtoupper($input['identificacion']),
                'nombre'           => $input['nombre'],
                'correo'           => $input['correo'],
                'telefono'         => $input['telefono'],
                'pais'             => new ObjectID($input['pais']),
                'estatus'          => (boolean) $input['estatus'],
                'logo'             => $base64,
                'borrado'          => false
            ];

            //procedo a guardarlos en la bd
            $registro                            = new Empresa;
            $registro->Cuit_rut                  = $data['identificacion'];
            $registro->Nombre                    = $data['nombre'];
            $registro->Correo                    = $data['correo'];
            $registro->Telefono                  = $data['telefono'];
            $registro->Pais_id                   = $data['pais'];
            $registro->Activo                    = $data['estatus'];
            $registro->Logo                      = $data['logo'];
            $registro->Borrado                   = $data['borrado'];

            //verifico si fue exitoso el insert en la bd
            if($registro->save()){
                return response()->json(['code' => 200]);
            }else{
                return response()->json(['code' => 500]);
            }
        }

    }

    //metodo para actualizar las empresas
    public function ajaxUpdate(ValidateEmpresa $request){

        //verifico que la respuesta venga por ajax
        if($request->ajax()){

            //obtengo todos los datos del formulario
            $input = $request->all();

            //instancio los datos de la empresa a editar
            $registro = Empresa::find($input['emp-id']);

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

            //capturo los datos y los acomodo en un arreglo
            $data = [
                'identificacion'   => strtoupper($input['identificacion']),
                'nombre'           => $input['nombre'],
                'correo'           => $input['correo'],
                'telefono'         => $input['telefono'],
                'pais'             => new ObjectID($input['pais']),
                'estatus'          => $input['estatus'] == 0 ? false : true,
                'logo'             => $base64
            ];

            //procedo a guardarlos en la bd
            $registro->Cuit_rut                  = $data['identificacion'];
            $registro->Nombre                    = $data['nombre'];
            $registro->Correo                    = $data['correo'];
            $registro->Telefono                  = $data['telefono'];
            $registro->Pais_id                   = $data['pais'];
            $registro->Activo                    = (boolean) $data['estatus'];
            $registro->Logo                      = $data['logo'];

            //verifico si fue exitoso el insert en la bd
            if($registro->save()){
                return response()->json(['code' => 200]);
            }else{
                return response()->json(['code' => 500]);
            }
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
                $registro = Empresa::find($id);
                $registro->Borrado = true;

                //DB::table('Sucursales')->where('Empresa_id', new ObjectId($id))->update(['Borrado' => true]);

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

    //metodo para obtener la data de la empresa
    public function ajaxGet(Request $request){

        //verifico que la respuesta venga por ajax
        if($request->ajax()){

            //capturo el id de la empresa
            $input = $request->all();
            $id = $input['id'];

            //verifico que el id no venga vacio, si es asi mando un error
            if($id){

                //busco la empresa en la bd con el id correspondiente
                $empresa = Empresa::find($id);
                $pais = Pais::borrado(false)->get();
                $estatus = Estado::borrado(false)->get();

                //devuelvo un json con la data
                return response()->json([
                    'code' => 200,
                    'empresa' => $empresa,
                    'estatus' => $estatus,
                    'pais'    => $pais
                ]);

            }else{
                //devuelvo un json en caso de que no exista el id de la empresa venga vacio
                return response()->json(['code' => 500]);
            }
        }

    }

    // Custom functions 
    public function get_events ( $id_empresa ) {
        $events = Evento::where('Empresa_id', new ObjectID($id_empresa))->get();
        if ($events) {
            // We get Id of agenda App
            $agenda =  MenuAppInvitado::where('Nombre', 'Agenda')->get();
            $agenda_id = $agenda ? $agenda[0]->_id : null;
            $data_events = [];
            foreach ($events as $event) {
                if (count($event['MenuApp'])) {      
                    if (in_array($agenda_id, $event['MenuApp'])) {
                        $data_events[] = $event;
                    }                    
                }
            }
            if ($data_events) {
                return response()->json(['code' => 200, 'data' => $data_events]);
            } else {
                return response()->json(['code' => 404, 'message' => 'Empresa no posee eventos con Agenda']);
            }       
            
        } else {
             return response()->json(['code' => 404, 'message' => 'Empresa no posee eventos']);
        }
    }

    public function datatable_get_agendas( $id_evento ) {

        if ($id_evento == 0) {
            return DataTables::collection( [] )->make(true);
        } else {
            $agendas = Agenda::where('Evento_id', new ObjectID($id_evento))->get();
            $data_agendas = [];

            //verifico que exista data sino lo devulevo vacio
            if($agendas){

                foreach ($agendas as $agenda) {

                    //armo la data que se muestra en la tabla de inicio de la pagina de agendas
                    $evento = Evento::where('_id',$agenda->Evento_id)->get()[0];
                    $data_agendas[] = [
                        '_id'    => $agenda->_id,
                        'Titulo' => strtoupper($agenda->Titulo),
                        'Descripcion' => $agenda->Descripcion,
                        'Evento' => $evento->Nombre,
                        'Hora'  => $agenda->Hora,
                        'Fecha' => $evento->Fecha
                    ];
                }

            }

            return DataTables::collection( $data_agendas )->make(true);
        }       

    }

}

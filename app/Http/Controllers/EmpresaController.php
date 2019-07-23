<?php

namespace App\Http\Controllers;
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
class EmpresaController extends Controller
{
    //metodo para llamar la vista principal de empresas
    public function index(){
        //devuleve la vista
        return view('Configuracion.Empresas.index');
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
        $registro = Empresa::find($id);
        if($registro){
            $data['existe'] = true;
            $data['paises'] = Pais::borrado(false)->get();
            $data['estados'] = Estado::borrado(false)->get();
            $data['empresa'] = $registro;
        }
        //devuleve la vista
        return view('Configuracion.Empresas.show', $data);
    }

    //metodo para llamar la vista de editar empresa
    public function viewEdit($id){
        $data['existe'] = false;
        $registro = Empresa::find($id);
        if($registro){
            $data['existe'] = true;
            $data['paises'] = Pais::borrado(false)->get();
            $data['estados'] = Estado::borrado(false)->get();
            $data['empresa'] = $registro;
        }
        //devuleve la vista
        return view('Configuracion.Empresas.edit', $data);
    }

    //metodo para mandar la data de las empresas al datatables
    public function ajaxDatatables(){
        //guardo el tipo de rol del usuario
        $rol = strtoupper(Auth::user()->nameRol());
        //acorde al tipo de rol cargo empresas
        if($rol == 'ADMINISTRADOR'){
            $emp = Empresa::borrado(false)->get();
        }else if($rol == 'EMPRESA'){
            $emp = Empresa::borrado(false)->where('_id',  Auth::user()->Empresa_id  )->get();
        }else if($rol == 'EVENTO'){
            $emp = Empresa::borrado(false)->where('_id', Auth::user()->Empresa_id  )->get();
        }
        $empresas = [];
        //verifico que exista data sino lo devulevo vacio
        if($emp){
            foreach ($emp as $e) {
                //armo la data que se muestra en la tabla de inicio de la pagina de empresas
                $empresas[] = [
                    '_id'    => $e->_id,
                    'Cuit_rut' => strtoupper($e->Cuit_rut),
                    'Nombre' => $e->Nombre,
                    'Correo' => $e->Correo,
                    'Telefono'  => $e->Telefono,
                    'Pais' => Pais::find($e->Pais_id)->Nombre,
                    'Activo' => $e->Activo
                ];
            }
        }
        return DataTables::collection( $empresas )->make(true);
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
            }
            return response()->json(['code' => 500]);
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
                $registro = Empresa::find($id);
                $registro->Borrado = true;
                //DB::table('Sucursales')->where('Empresa_id', new ObjectId($id))->update(['Borrado' => true]);
                //valido que de verdad sea borrado en caso de que no arrojo un error
                if($registro->save()){
                    return json_encode(['code' => 200]);
                }
                return json_encode(['code' => 500]);
            }
            return json_encode(['code' => 600]);
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
            }
            //devuelvo un json en caso de que no exista el id de la empresa venga vacio
            return response()->json(['code' => 500]);
        }
    }

    /**
     * metodo para retornar todas las empresas
     */
    public function getEmpresas(){
        $empresas = Empresa::borrado(false)->get();
        //devuelvo un json con la data
        return response()->json([
            'code' => 200,
            'empresas' => $empresas
        ]);
    }

    /**
     * Metodo que retorna las empresas con la informacion necesaria para llenar las tablas de la vista de 
     * configuracion empresas
     */
    public function getEmpresasTabla(Request $request){
        //acorde al tipo de rol cargo empresas
        $input = $request->all();
            //Guardo el rol del usuario logeado
        $rol = $input['rol'];
            //guardo su id independiente de su rol
        $id = $input['id'];

        if($rol == 'ADMINISTRADOR'){

            $emp = Empresa::borrado(false)->get();

        }else if($rol == 'EMPRESA'){

            $emp = Empresa::borrado(false)->where('_id',  $id  )->get();

        }else if($rol == 'EVENTO'){

            $emp = Empresa::borrado(false)->where('_id', $id  )->get();

        }

        $empresas = [];

        //verifico que exista data sino lo devulevo vacio
        if($emp){

            foreach ($emp as $e) {

                //armo la data que se muestra en la tabla de inicio de la pagina de empresas
                $empresas[] = [
                    '_id'    => $e->_id,
                    'Cuit_rut' => strtoupper($e->Cuit_rut),
                    'Nombre' => $e->Nombre,
                    'Correo' => $e->Correo,
                    'Telefono'  => $e->Telefono,
                    'Pais' => Pais::find($e->Pais_id)->Nombre,
                    'Activo' => $e->Activo
                ];
            }

        }

        return $empresas;
    }
    
    /**
     * Metodo para eliminar una empresa
     * $request recibe el id de la empresa a eliminar
     */
    public function deleteEmpresa(Request $request){
        //capturo el valor del id
        $input = $request->all();
        $id = $input['id'];

        //valido que venga el id sino mando un error
        if($id){
            //ubico el id en la bd
            $registro = Empresa::find($id);
            $registro->Borrado = true;

            if($registro->save()){
                return json_encode(['code' => 200]);
            }else{
                return json_encode(['code' => 500]);
            }
        }
    }

    /**
     * metodo para agregar empresa
     * ValidateEmpresa es un request que valida que la informacion enviada coincida con todos los parametros
     * que debe tener una empresa
     */
    public function addEmpresa(ValidateEmpresa $request){
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

    /**
     * metodo que retorna toda la informacion de una empresa por id
     */
    public function getEmpresa($id){
        $data['existe'] = false;
        $registro = Empresa::find($id);
        if($registro){
            $data['existe'] = true;
            $data['paises'] = Pais::borrado(false)->get();
            $data['estados'] = Estado::borrado(false)->get();
            $data['empresa'] = $registro;

            return response()->json(['code' => 200,'data'=>$data]);
        }else{
            return response()->json(['code' => 500]);
        }

        
    }

        /**
         * Metodo para actuali ar empresa
         * el request recibe toda la informacion necesaria para modificar la empresa ya 
         * creada
         */
        public function updateEmpresa(ValidateEmpresa $request){
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

        /**
         * metodo obtener todos los eventos por el id de la emrpesa
         */
        public function getEventosPorEmpresa($empresa){
            //cargo los eventos
            $resultado = \App\Models\MongoDB\Evento::borrado(false)->activo(true)->where('Empresa_id', new ObjectID($empresa) )->orderBy('Nombre', 'asc')->get();
            //devulevo un json con la data
            return json_encode($resultado);
        }

        /**
         * Metodo para retornar todos los paises para el formulario de add empresa
         */
        public function getPaises(){
            $pais = Pais::borrado(false)->get();
            $estatus = Estado::borrado(false)->get();
            //devuelvo un json con la data
            return response()->json([
                'code' => 200,
                'paises' => $pais,
                'estados' => $estatus
            ]);
        }
    
}

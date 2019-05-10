<?php

namespace App\Http\Controllers;
use App\Http\Requests\ValidateArchivoInvitacion;
use App\Models\MongoDB\Empresa;
use App\Models\MongoDB\Estado;
use App\Models\MongoDB\Evento;
use App\Models\MongoDB\Invitacion;
use Carbon\Carbon;
use Illuminate\Http\Request;
use MongoDB\BSON\ObjectId;
use Auth, DataTables, File, Storage;

//controlador encargado de la invitacion

class InvitacionController extends Controller
{

    //metodo que crea la vista principal
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
        return view('Invitados.Invitacion.index', $select);
    }

    //metodo para llamar la vista de agregar
    public function viewAdd($id){

        $data['estados'] = Estado::borrado(false)->get();
        $data['evento'] = $id;

        //devuleve la vista
        return view('Invitados.Invitacion.add', $data);
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
        return view('Invitados.Invitacion.show', $data);
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

            $eve = Evento::borrado(false)->where('Empresa_id', new ObjectId(Auth::user()->Empresa_id) );

        }else if($rol == 'EVENTO'){

            $eve = Evento::borrado(false)->where('_id', Auth::user()->Evento_id );

        }

        $eventos = [];

        //extraigo el query con o sin los filtros
        $ev = $eve->get();

        //verifico que exista data sino lo devulevo vacio
        if($ev){

            foreach ($ev as $e) {

                if(in_array(new ObjectId('5cc47b4af39c6a0a4f6a4de4'), $e->MenuApp)){

                    $invitaciones = Invitacion::borrado(false)->activo(true)->where('Evento_id', new ObjectId($e->_id))->get();

                    //armo la data que se muestra en la tabla de inicio de la pagina de eventos
                    $eventos[] = [
                        '_id'       => $e->_id,
                        'Empresa'   => Empresa::find($e->Empresa_id)->Nombre,
                        'Evento'    => strtoupper($e->Nombre),
                        'IDEvento'  => $e->IDEvento,
                        'Fecha'     => $e->Fecha. ' '.$e->Hora,
                        'App'       => $e->App,
                        'Archivos'  => count($invitaciones)
                    ];

                }

            }

        }

        return DataTables::collection( $eventos )->make(true);
    }

    //metodo para mandar la data de los archivos del evento
    public function ajaxDatatablesFiles(Request $request){

        //capturo el id de la empresa para buscar los eventos en base a ella
        $input = $request->all();
        $idevento = $input['evento'];

        $invitaciones = Invitacion::borrado(false)->activo(true)->where('Evento_id', new ObjectID($idevento) )->get();

        $archivos = [];

        //verifico que exista data sino lo devulevo vacio
        if($invitaciones){

            foreach ($invitaciones as $f) {

                //armo la data que se muestra en la tabla
                $archivos[] = [
                    '_id'         => $f->_id,
                    'Tipo'        => $f->Modo,
                    'SizeImagen'  => $f->SizeImg,
                    'SizePdf'     => $f->SizePdf == '' ? '-' : $f->SizePdf,
                    'Activo'      => $f->Activo
                ];
            }

        }

        return DataTables::collection( $archivos )->make(true);
    }


    //metodo para agregar archivo
    public function ajaxAdd(ValidateArchivoInvitacion $request){

        //verifico que la respuesta venga por ajax
        if($request->ajax()){

            $input = $request->all();

            $evento  = (string)$input['id-evento'];
            $empresa = (string)Evento::find($evento)->Empresa_id;
            $pathSave = 'Invitacion/'.$empresa.'/'.$evento.'/';

            $archivoimg = $input['archivoimg'];

            $fileDataImg = [
                'extension' => $archivoimg->getClientOriginalExtension(),
                'size'      => humanFileSize($archivoimg->getSize()),
                'mime'      => $archivoimg->getMimeType()
            ];

            $nameImg = 'invitacion-img.'.$fileDataImg['extension'];

            $archivopdf = $input['archivopdf'];

            if($archivopdf){

                $fileDataPdf = [
                    'extension' => $archivopdf->getClientOriginalExtension(),
                    'size'      => humanFileSize($archivopdf->getSize()),
                    'mime'      => $archivopdf->getMimeType()
                ];

                $namePdf = 'invitacion-pdf.'.$fileDataPdf['extension'];

                Storage::disk('public_oneshow')->put($pathSave.$namePdf, File::get($archivopdf));

            }else{

                $fileDataPdf = [
                    'extension' => '',
                    'size'      => '',
                    'mime'      => ''
                ];

                $namePdf = '';
            }

            Storage::disk('public_oneshow')->put($pathSave.$nameImg, File::get($archivoimg));

            //capturo los datos y los acomodo en un arreglo
            $data = [
                'id-evento'             => new ObjectID($input['id-evento']),
                'modo'                  => $input['tipo'] == 'v' ? 'VERTICAL' : 'HORIZONTAL',
                'pathimg'               => $pathSave.$nameImg,
                'sizeimg'               => $fileDataImg['size'],
                'pathpdf'               => $archivopdf  ? $pathSave.$namePdf : '',
                'sizepdf'               => $fileDataPdf['size'],
                'activo'           => true,
                'borrado'          => false
            ];


            //procedo a guardarlos en la bd
            $registro = new Invitacion();
            $registro->Evento_id                 = $data['id-evento'];
            $registro->Modo                      = $data['modo'];
            $registro->PathImg                   = $data['pathimg'];
            $registro->SizeImg                   = $data['sizeimg'];
            $registro->PathPdf                   = $data['pathpdf'];
            $registro->SizePdf                   = $data['sizepdf'];
            $registro->Fecha                     = Carbon::now();
            $registro->Activo                    = $data['activo'];
            $registro->Borrado                   = $data['borrado'];


            //verifico si fue exitoso el insert en la bd
            if($registro->save()){

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
                $registro = Invitacion::find($id);

                //valido que de verdad sea borrado en caso de que no arrojo un error
                if($registro->delete()){

                    Storage::disk('public_oneshow')->delete($registro->PathImg);
                    Storage::disk('public_oneshow')->delete($registro->PathPdf);

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

<?php

namespace App\Http\Controllers;
use App\Models\MongoDB\Galeria;
use App\Models\MongoDB\Sucursal;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use MongoDB\BSON\ObjectId;
use Auth;

//controlador encargado de los procesos estandar o comun para todo

class MasterController extends Controller
{

    //metodo para mostrar los equipos de futbol por su pais
    public function ajaxEquiposByPais($pais){
        //cargo los equipos
        $resultado = \App\Models\MongoDB\Club::where('Pais', new ObjectID($pais) )->orderBy('Nombre', 'asc')->get();

        //devulevo un json con la data
        return json_encode($resultado);
    }

    //metodo para mostrar los eventos por empresa
    public function ajaxEventosByEmpresa($empresa){
        //cargo los eventos
        $resultado = \App\Models\MongoDB\Evento::borrado(false)->activo(true)->where('Empresa_id', new ObjectID($empresa) )->orderBy('Nombre', 'asc')->get();

        //devulevo un json con la data
        return json_encode($resultado);
    }

    //metodo para mostrar los departamentos por una provincia determinada
    public function ajaxDepartamentos($provincia){
        //cargo los departamentos en base a la provincia
        $resultado = \App\Models\MongoDB\Departamento::where('Borrado', false)->where('Provincia', new ObjectID($provincia) )->orderBy('Departamento', 'asc')->get();
        //devulevo un json con la data
        return json_encode($resultado);
    }

    //metodo para mostrar las localidades por un departamento determinado
    public function ajaxLocalidades($departamento){
        //cargo las localidades en base al departamento
        $resultado = \App\Models\MongoDB\Localidad::where('Borrado', false)->where('Departamento', new ObjectID($departamento) )->orderBy('Localidad', 'asc')->get();
        //devulevo un json con la data
        return json_encode($resultado);
    }

    //metodo para mostrar las sucursales por una empresa determinado
    public function ajaxSucursales($empresa){

        $rol = strtoupper(Auth::user()->nameRol());

        if($rol == 'ADMINISTRADOR' OR $rol == 'SUPERVISOR'){

            //cargo las sucursales en base a la empresa
            $resultado = \App\Models\MongoDB\Sucursal::where('Borrado', false)->where('Empresa_id', new ObjectID($empresa) )->where('Activo', true)->orderBy('Nombre', 'asc')->get();

        }else if($rol == 'APODERADO'){

            //cargo las sucursales en base a la empresa
            $resultado = \App\Models\MongoDB\Sucursal::where('Borrado', false)->where('Empresa_id', new ObjectID($empresa) )->where('Activo', true)->orderBy('Nombre', 'asc')->get();


        }else if($rol == 'EMPRESA'){

            //cargo las sucursales en base a la empresa
            $resultado = \App\Models\MongoDB\Sucursal::where('Borrado', false)->where('Empresa_id', new ObjectID($empresa) )->where('Activo', true)->orderBy('Nombre', 'asc')->get();

        }else if($rol == 'SUCURSAL'){

            //cargo las sucursales en base a la empresa
            $resultado = \App\Models\MongoDB\Sucursal::where('Borrado', false)->where('_id', Auth::user()->Sucursal_id )->where('Activo', true)->orderBy('Nombre', 'asc')->get();

        }

        //devulevo un json con la data
        return json_encode($resultado);
    }

    //metodo para mostrar los productos en los extras basado en la sucursal seleccionada
    public function ajaxProductosExtras($sucursal){

        $cat = [
            new ObjectId('5bf59c644de5fa7ba75a983a') //menus
        ];

        //cargo los productos
        $resultado = \App\Models\MongoDB\Producto::borrado(false)->activo(true)->where('Items', 'exists', false)->whereNotIn('Categoria_id', $cat )->where('Sucursal_id', new ObjectId($sucursal))->orderBy('Nombre', 'asc')->get(['_id', 'Nombre']);
        //devulevo un json con la data
        return json_encode($resultado);
    }

    //metodo para obtener el precio del producto en los extras
    public function ajaxProductosExtrasPrecio($producto){

        //cargo el producto
        $resultado = \App\Models\MongoDB\Producto::find($producto);
        //devulevo un json con la data
        return json_encode($resultado->Precio);
    }

    //metodo para obtener las categorias de la sucursal
    public function ajaxCategoriasSucursal($sucursal){

        $result = [];

        $suc = \App\Models\MongoDB\Sucursal::find($sucursal);

        if($suc->Categorias){

            foreach ($suc->Categorias as $c){

                $cat = \App\Models\MongoDB\Categoria::find($c['categoria']);

                $result[] = [
                    'id' => $cat->_id,
                    'Nombre' => $cat->Nombre
                ];
            }

            $catExtra = \App\Models\MongoDB\Categoria::find('5bf59cbf4de5fa7ba75a983b');

            $extra = [
                'id' => $catExtra->_id,
                'Nombre' => $catExtra->Nombre
            ];

            array_push($result, $extra);

            usort($result, 'compareByNombre');

        }

        //devulevo un json con el resultado
        return json_encode($result);
    }

    //metodo para obtener las fotos de la galeria
    public function ajaxGaleria(Request $request, $tipo){

        $search = $request->get('search');

        if($search){
            $data = Galeria::where('Tipo', $tipo)->where('Nombre', 'like', '%' . $search . '%')->orderBy('Nombre')->paginate(5);
        }else{
            $data = Galeria::where('Tipo', $tipo)->orderBy('Nombre')->paginate(5);
        }

        return response()->json(['items' => $data->toArray()['data'], 'pagination' => $data->nextPageUrl() ? true : false]);

    }

    //metodo para obtener el pais en base a la sucursal
    public function ajaxGetPaisBySucursal(Request $request){

        $pais = '';

        $sucursal = $request->get('sucursal');

        if($sucursal){
            $pais = (string)Sucursal::find($sucursal)->Pais_id;
        }

        return response()->json(['pais' => $pais]);

    }

}

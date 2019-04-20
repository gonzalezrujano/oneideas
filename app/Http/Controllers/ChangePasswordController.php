<?php

namespace App\Http\Controllers;
use App\Models\MongoDB\Usuario;
use App\Http\Requests\ValidateChangePassword;
use Hash, Auth;


//controlador encargado del cambio de clave del usuario interno
class ChangePasswordController extends Controller
{

    //metodo para llamar la vista de cambio de clave
    public function index(){

        $changePassword = Auth::user()->isChangePassword();

        //devuleve la vista
        return view('change-password', ['changepassword' => $changePassword]);
    }

    //metodo para procesar el cambio de contraseña
    public function ajaxChangePassword(ValidateChangePassword $request){

        //capturo los datos
        $input = $request->all();

        //guardo el password viejo y el nuevo en variables diferentes
        $oldPassword = $input['passwordold'];
        $newPassword = $input['passwordnew'];

        //ubico el password actual del usuario
        $user = Usuario::find(Auth::user()->_id);

        //verifico que conicida con el ingresado, sino mando un error
        if(Hash::check($oldPassword, $user->Password)){

            $firstChangePass = $user->CambioPassword;

            //guardo el nuevo password en la bd
            $user->Password = Hash::make($newPassword);
            //cambio la bandera de cambio de contraseña a false
            $user->CambioPassword = (boolean) false;

            //verifico que fue guardado
            if($user->save()){

                if($firstChangePass){
                    return response()->json(['code' => 300, 'msj' => 'Contraseña cambiada exitosamente']);
                }else{
                    return response()->json(['code' => 200, 'msj' => 'Contraseña cambiada exitosamente']);
                }

            }else{

                return response()->json(['code' => 600, 'msj' => 'Ocurrio un problema al cambiar la contraseña. Consulte al administrador' ]);

            }

        }else{

            return response()->json(['code' => 600, 'msj' => 'Contraseña actual incorrecta' ]);

        }

    }

}

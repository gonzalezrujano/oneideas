<?php

namespace App\Http\Controllers;

use App\Models\MongoDB\Usuario;
use Illuminate\Http\Request;
use App\Http\Requests\ValidateLogin;
use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\Auth\Guard;
use Hash;
use MongoDB\BSON\ObjectId;

//controlador encargado del login

class LoginController extends Controller
{

    public function __construct(Guard $auth)
    {
        $this->auth = $auth;
    }

    //metodo que crea la vista
    public function index(){
        //devuelve la vista asociada
        return view('login');
    }

    //metodo para procesar el login por ajax
    public function login(ValidateLogin $request)
    {
        $input = $request->all();

        $credenciales = [
            'correo'   => strtoupper($input['correo']),
            'password' => $input['password']
        ];

        $user = Usuario::where('Correo', $credenciales['correo'])->first();

        if($user){

            if($user->Activo == true){

                if(Hash::check($credenciales['password'], $user->Password)){

                    $exito = Auth::guard('web')->login($user);

                    return response()->json(['code' => 200, 'msj' => 'exito' ]);

                }else{

                    return response()->json(['code' => 600, 'msj' => 'Correo y/o Contraseña incorrectos' ]);

                }

           }else{
                return response()->json(['code' => 600, 'msj' => 'Usuario inactivo' ]);
           }

        }else{

            return response()->json(['code' => 600, 'msj' => 'Usuario no registrado' ]);
        }

    }


    //metodo para cerrar la session
    public function logout(Request $request){

        //invoca al metodo de cierre de session
        $this->auth->logout();

        //redirecciono de nuevo al login
        return redirect()->route('login');
    }

}

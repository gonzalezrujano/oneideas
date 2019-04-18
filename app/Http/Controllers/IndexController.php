<?php

namespace App\Http\Controllers;

//controlador encargado del index

class IndexController extends Controller
{

    //metodo que crea la vista login
    public function login(){
        //devuelve la vista asociada
        return view('login');
    }

    //metodo que crea la vista welcome
    public function welcome(){
        //devuelve la vista asociada
        return view('welcome');
    }

}

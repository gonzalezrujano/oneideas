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

    //metodo que crea la vista dashboard
    public function dashboard(){
        //devuelve la vista asociada
        return view('dashboard');
    }

}

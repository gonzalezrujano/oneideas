<?php

namespace App\Http\Controllers;

//controlador encargado de la multimedia

class MultimediaController extends Controller
{

    //metodo que crea la vista de inicio
    public function index(){
        //devuelve la vista asociada
        return view('Multimedia.index');
    }


}

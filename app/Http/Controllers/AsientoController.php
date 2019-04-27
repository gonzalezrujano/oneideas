<?php

namespace App\Http\Controllers;

//controlador encargado de los asientos

class AsientoController extends Controller
{

    //metodo que crea la vista principal
    public function index(){
        //devuelve la vista asociada
        return view('Invitados.Asientos.index');
    }

}

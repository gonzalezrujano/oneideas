<?php

namespace App\Http\Controllers;

//controlador encargado de la invitacion

class InvitacionController extends Controller
{

    //metodo que crea la vista principal
    public function index(){
        //devuelve la vista asociada
        return view('Invitados.Invitacion.index');
    }

}

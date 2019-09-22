<?php

namespace App\Http\Controllers;

//controlador encargado de los regalos

class RegaloController extends Controller
{
  //metodo que crea la vista principal
  public function index(){
    //devuelve la vista asociada 
    return view('Invitados.Regalos.index');
  }
}

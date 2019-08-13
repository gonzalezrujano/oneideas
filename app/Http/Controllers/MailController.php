<?php

namespace App\Http\Controllers;

use App\Mail\CorreoDeInvitacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function sendMailInvitados(Request $request){
        $input = $request->all();
        Mail::to($input->correo)->send(new CorreoDeInvitacion);
        return "Mensaje Enviado";
    }
}

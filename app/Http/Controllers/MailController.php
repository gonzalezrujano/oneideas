<?php

namespace App\Http\Controllers;

use App\Mail\CorreoDeInvitacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Models\MongoDB\Evento;

class MailController extends Controller
{
    public function sendMailInvitados(Request $request){
        $input = $request->all();
        $input['link'] = "localhost:8000/mail/".$input['link'];
        $input['nombre_evento'] = Evento::find($input['nombre_evento'])->Nombre;
        Mail::to($input['correo'])->send(new CorreoDeInvitacion($input));
        return json_encode(['code' => 200,'mensaje'=>"Invitacion enviada"]);
    }
}

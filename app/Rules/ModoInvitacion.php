<?php

namespace App\Rules;

use App\Models\MongoDB\Evento;
use App\Models\MongoDB\Invitacion;
use Illuminate\Contracts\Validation\Rule;
use MongoDB\BSON\ObjectId;

class ModoInvitacion implements Rule
{
    protected $evento;
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($evento)
    {
        $this->evento = $evento;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $modo = '';

        $invitaciones = Invitacion::borrado(false)->activo(true)->where('Evento_id', new ObjectId($this->evento))->get();

        if($invitaciones){

            if($value == 'v'){
                $modo = 'VERTICAL';
            }else if($value == 'h'){
                $modo = 'HORIZONTAL';
            }

            foreach ($invitaciones as $i){

                if($modo == $i->Modo){
                    return false;
                }else{
                    return true;
                }
            }

        }else{
            return true;
        }

        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'La posición de la invitación que desea guardar ya existe';
    }
}

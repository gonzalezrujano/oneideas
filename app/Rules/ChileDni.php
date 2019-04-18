<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class ChileDni implements Rule
{

    protected $campo;
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($campo)
    {
        $this->campo = $campo;
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
        return preg_match('/^([0-9]){8}([0-9A-Z]){1}$/', $value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'El '.$this->campo.' debe ser un numero Rut valido. No debe contener guiones ni puntos';
    }
}

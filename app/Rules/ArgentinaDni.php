<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class ArgentinaDni implements Rule
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
        return preg_match('/^([0-9]){7,8}$/', $value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'El '.$this->campo.' debe ser un DNI argentino valido, este debe contener solo numeros y debe tener un minimo de 7 digitos y un maximo de 8 digitos. Ejemplo: 12345678';
    }
}

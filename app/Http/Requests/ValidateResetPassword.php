<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ValidateResetPassword extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'correo'               => 'required|email',
            'password'             => 'required|min:4',
            'passwordConfirmacion' => 'required|same:password',
        ];
    }

    public function messages()
    {
        return [
            'correo.required' => 'El correo es requerido',
            'correo.email' => 'Ingrese un formato de correo valido',
            'password.required'         => 'La nueva contraseña es requerida',
            'password.min'              => 'La contraseña debe tener 4 caracteres mínimo',
            'passwordConfirmacion.required'  => 'La confirmación de la contraseña es requerida',
            'passwordConfirmacion.same'      => 'Las contraseñas no coinciden',
        ];
    }

    public function failedValidation(Validator $validator) {

        throw new HttpResponseException(response()->json($validator->errors()->first(), 422));
    }
}

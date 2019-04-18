<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ValidateLogin extends FormRequest
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
            'correo'      => 'required',
            'password'    => 'required',
        ];
    }

    public function messages()
    {
        return [
            'correo.required'    => 'El correo es requerido',
            'correo.email'       => 'Ingrese un formato de correo valido',
            'password.required'  => 'La contraseña es requerida',
        ];
    }

    public function failedValidation(Validator $validator) {

        throw new HttpResponseException(response()->json($validator->errors()->first(), 422));
    }
}

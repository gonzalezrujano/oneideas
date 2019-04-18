<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ValidateChangePassword extends FormRequest
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
            'passwordold'      => 'required',
            'passwordnew'      => 'required|min:4',
            'passwordrepeat'   => 'required|same:passwordnew',
        ];
    }

    public function messages()
    {
        return [
            'passwordold.required'      => 'La contraseña actual es requerida',
            'passwordnew.required'      => 'La contraseña nueva es requerida',
            'passwordnew.min'           => 'La contraseña debe tener 4 caracteres como mínimo',
            'passwordrepeat.required'   => 'La confirmación de la contraseña es requerida',
            'passwordrepeat.same'       => 'Las contraseña no coinciden',
        ];
    }

    public function failedValidation(Validator $validator) {

        throw new HttpResponseException(response()->json($validator->errors()->first(), 422));
    }

}

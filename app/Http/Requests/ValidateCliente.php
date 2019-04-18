<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;

class ValidateCliente extends FormRequest
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
    public function rules(Request $request)
    {

        //cambiamos las reglas de validacion cuando sea editar, si tiene id es editar y sino es agregar
        if ( $this->input('cliente-id') )  {

            $correo = 'required|email|unique:Clientes,Correo,'. $this->input('cliente-id') . ',_id';

        }else{

            $correo = 'required|email|unique:Clientes,Correo';
        }

        if( $this->input('cliente-cuenta') == 'ONE' ){
            $apellido = 'required';
        }else{
            $apellido = 'nullable';
        }

        $rules = [
            'cliente-nombre'               => ['required'],
            'cliente-apellido'             =>  $apellido,
            'cliente-correo'               =>  $correo
        ];

        return $rules;
    }

    public function messages()
    {
        return [
            'cliente-nombre.required' => 'El nombre es requerido',
            'cliente-apellido.required' => 'El apellido es requerido',
            'cliente-correo.required' => 'El correo es requerido',
            'cliente-correo.email' => 'El formato del correo es invalido',
            'cliente-correo.unique' => 'El correo ya esta registrado, intente otro',
            'cliente-telefono.required' => 'El teléfono es requerido',
            'cliente-pais.required' => 'El país es requerido',
            'cliente-estatus.required' => 'El estado es requerido',
        ];
    }

    public function failedValidation(Validator $validator) {

        throw new HttpResponseException(response()->json($validator->errors()->first(), 422));
    }
}

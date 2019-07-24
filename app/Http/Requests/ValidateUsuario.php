<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use App\Rules\AlphaSpaces;
use App\Rules\ArgentinaDni;
use App\Rules\ChileDni;

class ValidateUsuario extends FormRequest
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
        if ( $this->input('usuario-id') )  {

            $correo = 'required|email|unique:Usuarios,Correo,'. $this->input('usuario-id') . ',_id';

        }else{

            $correo = 'required|email|unique:Usuarios,Correo';
        }

        if($this->input('tipo-documento') == '5773c9791f4d8527a4922661'){

            $documento = ['required', new ArgentinaDni('documento') ];

        }else if($this->input('tipo-documento') == '5773cde71f4d8527a4922662'){

            $documento = ['required', new ChileDni('documento') ];

        }else{
            $documento = ['required'];
        }

        $evento = 'nullable';

        if($this->input('rol') == '5cb6a35b5602db4c9374c68b'){
            $evento = 'required';
        }else{
            $evento = 'nullable';
        }

        $rules = [
            'tipo-documento'       => 'required',
            'documento'            => $documento,
            'nombre'               => ['required', new AlphaSpaces('nombre') ],
            'apellido'             => ['required', new AlphaSpaces('apellido') ],
            'correo'               =>  $correo,
            'telefono'             => 'required',
            'pais'                 => 'required',
            'rol'                  => 'required',
            'empresa'              => 'required',
            'evento'               => $evento,
            'estatus'              => 'required'
        ];

        return $rules;
    }

    public function messages()
    {
        return [
            'tipo-documento.required' => 'El tipo de documento es requerido',
            'documento.required' => 'El numero de documento es requerido',
            'nombre.required' => 'El nombre es requerido',
            'apellido.required' => 'El apellido es requerido',
            'correo.required' => 'El correo es requerido',
            'correo.email' => 'El formato del correo es invalido',
            'correo.unique' => 'El correo ya esta registrado, intente otro',
            'telefono.required' => 'El teléfono es requerido',
            'pais.required' => 'El país es requerido',
            'rol.required' => 'El rol es requerido',
            'empresa.required' => 'La empresa es requerida',
            'evento.required' => 'El evento es requerido',
            'estatus.required' => 'El estado es requerido',
        ];
    }

    public function failedValidation(Validator $validator) {
        throw new HttpResponseException(response()->json($validator->errors()->first(), 422));
    }
}

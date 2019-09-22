<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;

class ValidateEmpresa extends FormRequest
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
        if ( $this->input('emp-id') )  {
            //verificamos que el campo foto tenga dato sino el usuario no ha modificado nada
            if($request->all()['logo'] == 'undefined'){
                $foto = '';
            }else{
                $foto = 'required|image|mimes:png,jpg,jpeg|max:5120|min:10';
            }

        }else{
            $foto = 'required|image|mimes:png,jpg,jpeg|max:5120|min:10';
        }

        $rules = [
            'identificacion'       => 'required',
            'nombre'               => 'required',
            'correo'               => 'required|email',
            'telefono'             => 'required',
            'pais'                 => 'required',
            'estatus'              => 'required',
            'logo'                 => $foto
        ];

        return $rules;
    }

    public function messages()
    {
        return [
            'identificacion.required' => 'El numero de identificacion de la empresa es requerido',
            'nombre.required' => 'El nombre de la empresa es requerido',
            'correo.required' => 'El correo de la empresa es requerido',
            'correo.email' => 'El correo debe tener un formato valido',
            'telefono.required' => 'El teléfono es requerido',
            'pais.required' => 'El país de la empresa es requerido',
            'estatus.required' => 'El estado de la empresa es requerido',
            'logo.required' => 'El logo de la empresa es requerido',
            'logo.image' => 'El logo debe ser una imagen',
            'logo.mimes' => 'El logo debe ser en formato .jpg o .png',
            'logo.max' => 'La foto debe tener un tamaño menor a 5MB',
            'logo.min' => 'La foto debe tener un tamaño minimo de 10KB',

        ];
    }

    public function failedValidation(Validator $validator) {

        throw new HttpResponseException(response()->json($validator->errors()->first(), 422));
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use App\Rules\Latitude;
use App\Rules\Longitude;

class ValidateEvento extends FormRequest
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
        if ( $this->input('id-evento') )  {
            //verificamos que el campo logo tenga dato sino el usuario no ha modificado nada
            if($request->all()['logo'] == 'undefined'){
                $foto = '';
            }else{
                $foto = 'required|image|mimes:png,jpg,jpeg|max:5120|min:10';
            }

            $app = '';

        }else{
            $foto = 'required|image|mimes:png,jpg,jpeg|max:5120|min:10';
            $app = 'required';

        }

        $rules = [
            'id-emp'               => 'required',
            'nombre'               => 'required',
            'fecha'                => 'required',
            'hora'                 => 'required',
            'licencias'            => 'required',
            'latitud'              => ['required', new Latitude ],
            'longitud'             => ['required', new Longitude ],
            'ubicacion'            => 'required',
            'app'                  => $app,
            'estatus'              => 'required',
            'logo'                 => $foto,
        ];

        return $rules;
    }

    public function messages()
    {
        return [
            'id-emp.required' => 'El id de la empresa es requerido. Consulte al administrador',
            'nombre.required' => 'El nombre del evento es requerido',
            'fecha.required' => 'La fecha del evento es requerido',
            'hora.required' => 'La hora del evento es requerido',
            'estatus.required' => 'El estado del evento es requerido',
            'app.required' => 'La visibilidad del evento en la App es requerido',
            'licencias.required' => 'La licencia es requerida',
            'latitud.required' => 'La latitud es requerida',
            'longitud.required' => 'La longitud es requerida',
            'ubicacion.required' => 'La ubicación es requerida',
            'logo.required' => 'La logo del evento es requerido',
            'logo.image' => 'La logo debe ser una imagen',
            'logo.mimes' => 'La logo debe ser en formato .jpg o .png',
            'logo.max' => 'La logo debe tener un tamaño menor a 5MB',
            'logo.min' => 'La logo debe tener un tamaño minimo de 10KB'
        ];
    }

    public function failedValidation(Validator $validator) {

        throw new HttpResponseException(response()->json($validator->errors()->first(), 422));
    }
}

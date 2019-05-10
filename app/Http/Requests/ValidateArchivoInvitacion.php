<?php

namespace App\Http\Requests;

use App\Rules\ModoInvitacion;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;

class ValidateArchivoInvitacion extends FormRequest
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

        $archivoimg = 'required|mimes:png,jpg,jpeg|max:10240';
        $archivopdf = 'nullable|mimes:pdf|max:10240';

        //$archivo = 'required';

        $rules = [
            'id-evento'            => 'required',
            'tipo'                 => ['required', new ModoInvitacion($this->input('id-evento')) ],
            'archivoimg'           => $archivoimg,
            'archivopdf'           => $archivopdf
        ];

        return $rules;
    }

    public function messages()
    {
        return [
            'id-evento.required' => 'El id del evento es requerido. Consulte al administrador',
            'tipo.required' => 'La posición de la invitación es requerida',
            'archivoimg.required' => 'La invitación en imagen es requerida',
            'archivoimg.mimes' => 'La invitación en imagen debe tener uno de los siguientes formato: jpg, jpeg, png',
            'archivoimg.max' => 'La invitación en imagen debe tener un tamaño no mayor a 10MB',
            //'archivopdf.required' => 'La invitación en pdf es requerida',
            'archivopdf.mimes' => 'La invitación en pdf debe tener el formato .pdf',
            'archivopdf.max' => 'La invitación en pdf debe tener un tamaño no mayor a 10MB',
        ];
    }

    public function failedValidation(Validator $validator) {

        throw new HttpResponseException(response()->json($validator->errors()->first(), 422));
    }
}

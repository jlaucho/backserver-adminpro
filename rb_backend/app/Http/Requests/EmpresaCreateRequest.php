<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmpresaCreateRequest extends FormRequest
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
            'name'=>'required|max:200|unique:empresas',
            'RIF' =>'required|max:14|unique:empresas',
            'direccion' =>'required|max:249',
            'telefono'=>'required|max:15'
        ];
    }
    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
      return [
        'name.required' =>'El nombre de la empresa es obligatorio',
        'name.unique'   =>'El nombre de la empresa ya se encuentra registrado',
        'name.max'      =>'El nombre de la empresa no puede exceder los :max caracteres',
        'RIF.required'  =>'El RIF de la empresa es obligatorio',
        'RIF.unique'    =>'El RIF de la empresa ya se encuentra registrado',
        'RIF.max'       =>'Problemas con la longitud de caracteres del RIF',
        'direccion.required'  =>'La direccion de la empresa es obligatoria',
        'direccion.max'       =>'La direccion no puede exceder los :max caracteres',
        'telefono.required' =>'El telefono de la empresa es obligatorio',
        'telefono.max'      =>'El telefono no puede exceder los :max caracteres'
      ];
    }
}

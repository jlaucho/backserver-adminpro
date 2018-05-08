<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserCreateRequest extends FormRequest
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
        'email' =>'required|unique:users|email',
        'name'=>'required|max:25',
        'apellido'=>'required|max:25',
        'cedula'=>'required|unique:users',
        'direccion'=>'required|max:200',
        'type'=>'required',
        'password'=>'required|confirmed'


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
          'email.unique'  => 'El correo debe ser unico',
          'email.required'=> 'El correo es obligatorio',
          'email.email'   => 'El formato del correo es incorecto',
          'name.required' => 'El nombre es obligatorio',
          'name.max'      => 'El nombre no puede exceder los :max caracteres',
          'apellido.required' => 'El apellido es obligatorio',
          'apellido.max'      => 'El apellido no puede exceder los :max caracteres',
          'cedula.required'   => 'La cedula es obligatiria',
          'direccion.required'=> 'La direccion es obligatoria',
          'direccion.max'     => 'La direccion no puede exceder mas de :max caracteres',
          'type.required'     => 'El tipo de usuario es obligatorio',
          'password'          => 'La clave es obligatoria',
          'password.confirmed'=> 'Las claves introducdas no son iguales'
        ];
    }
}

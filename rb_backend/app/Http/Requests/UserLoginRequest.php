<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserLoginRequest extends FormRequest
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
            'email' => 'required|email',
            'password'=>'required|min:6'
        ];
    }
    /**
     * Set the messages rules to return.
     *
     * @return array
     */
    public function messages()
    {
        return [
          'email.required'  =>'El correo es requerido',
          'email.email'     =>'Tiene que ser un corrreo',
          'password.required'=>'La clave es requerida',
          'password.min'    =>'La clave debe contener mas de :min caracteres'
        ];
    }
}

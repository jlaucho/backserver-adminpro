<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FacturaCreateRequest extends FormRequest
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
            'numFactura'  =>'required|unique:facturas',
            'fechaFactura'=>'required',
            'descripcion' =>'max:250',
            'baseImponible'=>'required|numeric',
            'IVA_por'     =>'required|numeric',
            'IVA_monto'   =>'required|numeric',
            'totalFact'   =>'required|numeric',
            'pagada'      =>'max:2',
            'empresas_id' =>'required|numeric'
        ];
    }
}

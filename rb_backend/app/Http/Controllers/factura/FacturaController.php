<?php

namespace App\Http\Controllers\factura;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class FacturaController extends Controller
{

	/**
  *
  * Store the Factura
  * @return json Object
  * @param request empresa data
  * @method POST
  *
  */
  public function store(EmpresaCreateRequest $request)
  {
  		$empresa = new Empresas();
  		$empresa->fill( $request->all() );

  		$empresa->save();

  		return response()->json([
  			'ok'=> true,
  			'empresa'=>$empresa,
  			'mensaje'=>'Empresa creada correctamente'
  		], 201);
  }
  /*---------------------------------------------------------------------------------------*/
}

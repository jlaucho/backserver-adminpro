<?php

namespace App\Http\Controllers\factura;

// use Illuminate\Http\Request;
use App\Http\Requests\FacturaCreateRequest;
use App\Http\Controllers\Controller;
use App\Models\Facturas;

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
  public function store(FacturaCreateRequest $request)
  {
  		$factura = new Facturas();
  		$factura->fill( $request->all() );

  		$factura->save();

      

  		return response()->json([
  			'ok'=> true,
  			'factura'=>$factura,
  			'mensaje'=>'Factura creada correctamente'
  		], 201);
  }
  /*---------------------------------------------------------------------------------------*/
}

<?php

namespace App\Http\Controllers\servicios;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\CorreosEnviados;
use App\Models\Recorridos;

class ServiciosController extends Controller
{
  /**
  *
  * Store the CorreosEnviados
  * @return json Object
  * @param request correoObject data
  * @method POST
  *
  */
  public function store( Request $request)
  {

  	// return $request->all();
		$correo = new CorreosEnviados();
		$correo->fill( $request->all() );
		$correo->registrado_por = auth()->user()->id;
		$correo->save();

		if ( $correo ){
			$montoTotalRecorridos = 0;
			foreach ($request->origen as $key => $origen) {
				
				$recorrido = new Recorridos();
				$recorrido->origen = $request->origen[$key];
				$recorrido->destino = $request->destino[$key];
				$recorrido->cantidad = $request->cantidad[$key];
				$recorrido->concepto = $request->concepto[$key];
				$recorrido->encomienda = $request->encomienda[$key];
				$recorrido->nocturno = $request->nocturno[$key];
				$recorrido->recorrido = $request->recorrido[$key];
				$recorrido->totalRecorrido = $recorrido->cantidad * $recorrido->recorrido;
				$recorrido->correo_id = $correo->idCorreos;

				$montoTotalRecorridos += $recorrido->totalRecorrido;

				$recorrido->save();
			}

			$correo->totalMonto = $montoTotalRecorridos;

			$correo->save();
		}

		return response()->json([
			'ok'=> true,
			'mensaje'=>'El registro se creo correctamente por un monto de '. $correo->totalMonto
		], 201);
  }
  /*---------------------------------------------------------------------------------------*/
  /**
  *
  * List the Correos
  * @return list
  * @param null
  * @method GET
  *
  */
  public function correoList()
  {

    try {
      
      $correos = CorreosEnviados::select('idCorreos')
      	->orderBy('created_at', 'DESC')
      	->get();

      $total = $correos->count();

      foreach ($correos as $key => $correo) {
      	// $correo->r_realizado;
      	// $correo->r_registrado;
      	// $correo->r_recorridos;
      	// unset( $correos[$key] );
      	$correo = CorreosEnviados::datosCorreo($correo->idCorreos);
      	$corr[] = $correo;

      	// return $correos;
      }

      return response()->json([
        'ok' => true,
        'total'=>$total,
        'correos' => $corr
      ], 200);

    } catch (\Exception $e) {
      return response()->json([
        'ok' => false,
        'correo' => null,
        'error' => ['busqueda' => 'Error al buscar el servicio en el sistema']
      ], 500);
    }
  }
  /*---------------------------------------------------------------------------------------*/
}

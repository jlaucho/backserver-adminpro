<?php

namespace App\Http\Controllers\busqueda;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Empresas;
use App\Models\CorreosEnviados;
use App\Models\Facturas;

class BusquedaController extends Controller
{
    public function por_coleccion( $collection, $id )
    {
    	switch ($collection) {
    		case 'usuario':
    			$busqueda = User::find( $id );
    			break;

        case 'correo':
          $busqueda = CorreosEnviados::datosCorreo( $id );
          break;

        case 'factura':

          $busqueda = Facturas::busquedaFactura( $id );
          break;

    		case 'empresa':
          $busqueda = Empresas::find( $id );
    			break;
    		
    		default:
    			return response()->json([
    				'ok'=>false,
    				'error'=>['coleccion'=>'Coleccion no permitida, solo se admite "usuario", "empresa", "correo" y factura']
    			], 400);
    			break;
    	}

    	if ( !$busqueda ){
    		return response()->json([
    				'ok'=>false,
    				'error'=>[$collection =>'No existen datos para el ID: '. $id]
    			], 202);
    	}


    	return response()->json([
				'ok'=>true,
        'busqueda'=>$busqueda
			], 200);
    }
}

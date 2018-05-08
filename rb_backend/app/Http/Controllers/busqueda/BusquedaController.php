<?php

namespace App\Http\Controllers\busqueda;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;

class BusquedaController extends Controller
{
    public function por_coleccion( $collection, $id )
    {
    	switch ($collection) {
    		case 'usuario':
    			$busqueda = User::find( $id );
    			break;

    		case 'cliente':
    			# code...
    			break;
    		
    		default:
    			return response()->json([
    				'ok'=>false,
    				'error'=>['coleccion'=>'Coleccion no permitida, solo se admite "usuario" y "cliente"']
    			], 400);
    			break;
    	}

    	if ( !$busqueda ){
    		return response()->json([
    				'ok'=>false,
    				'error'=>['coleccion'=>'No existen datos para esta busqueda']
    			], 202);
    	}

    	return response()->json([
				'ok'=>true,
				'busqueda'=>$busqueda
			], 200);
    }
}

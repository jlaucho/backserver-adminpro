<?php

namespace App\Http\Controllers\user;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\UserCreateRequest;


class UserController extends Controller
{
    public function store( UserCreateRequest $request )
    {
    	try {
    		
	      $user = new User();
	      $user->fill($request->all());
	      $user->password = bcrypt( $request->password );
	      // $user->algodon = 'lalala';

	      // return $user;

	      $user->save();
    	} catch (\Exception $e) {
 					return response()->json([
 						'error'		=> $e->getMessage(),
 						'ok' 			=>false,
 						'mensaje'	=>'Error al intentar guardar el nuevo usuario',

 					], 500);   		
    	}

      return response()->json([
      	'ok'	=>true,
      	'mensaje'=> 'Usuario Creado correctamente',
      	'user'=> $user
      ], 203 );
    }
}

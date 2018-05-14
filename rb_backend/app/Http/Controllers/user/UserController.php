<?php

namespace App\Http\Controllers\user;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\UserCreateRequest;


class UserController extends Controller
{
  /**
  *
  * Store the User
  * @return json Object
  * @param request user data
  * @method POST
  *
  */
  public function store( UserCreateRequest $request )
  {
  	try {
  		
      $user = new User();
      $user->fill($request->all());
      $user->password = bcrypt( $request->password );
      $user->save();
    } catch (\Exception $e) {
      return response()->json([
        'error'   => $e->getMessage(),
        'ok'      =>false,
        'mensaje' =>'Error al intentar guardar el nuevo usuario',
      ], 500);      
    }
    // Autenticacion automatica despues del registro
    $credentials = request(['email', 'password']);
    if( $token = auth()->attempt($credentials)){
      return response()->json([
        'ok'  =>true,
        'mensaje'=> 'Usuario Creado correctamente',
        'user'=> $user,
        'token'=> $token
      ], 201 );
    }
    return response()->json([
        'ok'  =>true,
        'mensaje'=> 'Usuario Creado correctamente',
        'user'=> $user
      ], 201 );
  }
  /*---------------------------------------------------------------------------------------*/
  /**
  *
  * List the Users
  * @return list
  * @param null
  * @method GET
  *
  */
  public function userList( Request $request )
  {

    try {
      
      $users = User::all();
      $total = $users->count();

      return response()->json([
        'ok' => true,
        'total'=>$total,
        'users' => $users
      ], 200);

    } catch (\Exception $e) {
      return response()->json([
        'ok' => false,
        'users' => null,
        'error' => ['busqueda' => 'Error al buscar usuarios en el sistema']
      ], 500);
    }
  }
  /*---------------------------------------------------------------------------------------*/
  /**
   *
   * PUT method, update User for id
   * @param $request
   * @param $idUser
   * @return Collection with user
   *
   */
  public function update( Request $request, $idUser )
  {
    $user = User::find( $idUser );
    

    if( !$user ){
      return response()->json([
        'ok'=>false,
        'user'=>NULL,
        'error'=> ['usuario'=>'No existe usuario con ese ID']
      ], 204);
    }

    $user->fill( $request->all() );

    $user->save();

    return response()->json([
      'ok'=>true,
      'user'=>$user,
      'mensaje'=>'El usuario se actualizo corectamente'
    ], 202);
  }
  /*---------------------------------------------------------------------------------------*/
  /**
   *
   * DELETE method, delete user from database
   * @param $idUser
   * @return Collection the deleted user
   *
   */
  public function delete( $idUser )
  {
    $user = User::find( $idUser );
    if( !$user ){
      return response()->json([
        'ok'=>false,
        'error'=>['mensaje'=>'No existen usuarios registrados con el id '. $idUser],
        'user'=>NULL
      ], 400);
    }

    $user->delete();
      return response()->json([
        'ok'=>true,
        'user'=>$user
      ], 202);

  }
  /*---------------------------------------------------------------------------------------*/

}

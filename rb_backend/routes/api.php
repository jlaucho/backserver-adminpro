<?php

// use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/**
 *
 * Rutas de le Auth del sistema
 *
 */

Route::group([

    // 'middleware' => 'api',
    'prefix' => 'auth',
    'namespace'=> 'Api\\'

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

});
/**
 *
 * Rutas de Usuarios del sistema
 *
 */

Route::group(['prefix'=>'user', 'namespace'=>'user\\'], function()
{
	// Ruta libre para registro de usuarios
  Route::post('store', 'UserController@store')->name('user.store');
  // rutas con proteccion de token
  Route::group(['middleware' => 'auth:api'], function( $router ) {
  		Route::get('', 'UserController@userList')->name('user.list');
  		Route::put('/{id}', 'UserController@update')->name('user.update');
  		Route::delete('/{id}', 'UserController@delete')->name('user.delete');
  });
});
/**
 *
 * Rutas de las busquedas del sistema
 *
 */
Route::group(['prefix' => 'buscar', 'namespace'=>'busqueda\\', 'middleware'=>'auth:api'], function() {
  Route::get('{collection}/{id}', 'BusquedaController@por_coleccion')->name('busqueda.por_colleccion');
});




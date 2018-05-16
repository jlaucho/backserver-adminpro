<?php

namespace App\Http\Controllers\empresa;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\EmpresaCreateRequest;
use App\Models\Empresas;

class EmpresaController extends Controller
{
	/**
  *
  * Store the Empresa
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
  /**
  *
  * List the Empresas
  * @return list
  * @param null
  * @method GET
  *
  */
  public function empresasList()
  {

    try {
      
      $empresas = Empresas::all();
      $total = $empresas->count();

      return response()->json([
        'ok' => true,
        'total'=>$total,
        'empresas' => $empresas
      ], 200);

    } catch (\Exception $e) {
      return response()->json([
        'ok' => false,
        'empresas' => null,
        'error' => ['busqueda' => 'Error al buscar empresas en el sistema']
      ], 500);
    }
  }
  /*---------------------------------------------------------------------------------------*/
  /**
   *
   * PUT method, update Empresa for id
   * @param $request
   * @param $idEmpresa
   * @return Collection with user
   *
   */
  public function update( Request $request, $idEmpresa )
  {
    $empresa = Empresas::find( $idEmpresa );

    
    if( !$empresa ){
      return response()->json([
        'ok'=>false,
        'empresa'=>NULL,
        'error'=> ['empresa'=>'No existe empresa con el ID '. $idEmpresa]
      ], 400);
    }
    // return response()->json(['estamo'=> $empresa ], 200);

    $empresa->fill( $request->all() );

    $empresa->save();

    return response()->json([
      'ok'=>true,
      'empresa'=>$empresa,
      'mensaje'=>'La empresa se actualizo corectamente'
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
  public function delete( $idEmpresa )
  {
    $empresa = Empresas::find( $idEmpresa );
    if( !$empresa ){
      return response()->json([
        'ok'=>false,
        'error'=>['mensaje'=>'No existe ninguna empresa con el id '. $idEmpresa],
        'empresa'=>NULL
      ], 400);
    }

    $empresa->delete();
      return response()->json([
        'ok'=>true,
        'empresa'=>$empresa,
        'mensaje'=> 'La empresa '. $empresa->name .' se ha borrado correctamente'
      ], 202);

  }
  /*---------------------------------------------------------------------------------------*/
}

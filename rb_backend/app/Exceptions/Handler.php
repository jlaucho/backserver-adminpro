<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Validation\ValidationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        // if ($exception instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
        //   return response()->json(['error' => 'token_expirado'], $exception->statusCode());
        // } else if ($exception instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
        //   return response()->json(['error' => 'token_invalido'], $exception->statusCode());
        // } else if ($exception instanceof \Tymon\JWTAuth\Exceptions\TokenBlacklistException) {
        //   return response()->json(['error' => 'token_en_lista_negra'], $exception->statusCode());
        // } else

        // Excepciones de Base de datos
        if ($exception instanceof \Illuminate\Database\QueryException) {
            if( $exception->errorInfo[1] == 1062 ){
                return response()->json(['ok'=>false,'error' => ['database'=> 'El correo debe ser unico']], 400);
            }
            if( $exception->errorInfo[1] == 1452 ){
                return response()->json(['ok'=>false,'error' => ['database'=> 'Error con la llave foranea']], 400);
            }
            if( $exception->errorInfo[1] == 1364 ){
                return response()->json(['ok'=>false,'error' => ['database'=> 'Revise los datos, hay campos que no tienen valores por defecto']], 400);
            }
            if( $exception->errorInfo[1] == 1146 ){
                return response()->json(['ok'=>false,'error' => ['database'=> 'La tabla no existe']], 400);
            }
            if( $exception->errorInfo[1] == 1292 ){
                return response()->json(['ok'=>false,'error' => ['database'=> 'El formato de fecha es incorrecto']], 400);
            }
        } else

        // Excepciones de Autenticacion disparada por el token
        if ($exception instanceof \Illuminate\Auth\AuthenticationException) {
          return response()->json(['ok'=>false,'error' => ['token'=>'Problemas de autenticacion']], 401);
        } else
        // Excepciones de pagina not found
        if ($exception instanceof \Symfony\Component\HttpKernel\Exception\HttpException) {
          return response()->json(['ok'=>false,'error' => ['page'=>'Pagina no encontrada']], 404);
        } else
        // Excepciones de Validacion disparadas por los request
        if ($exception instanceof ValidationException) {
          return response()->json(['ok'=>false, 'error' => $exception->errors()], 422);
        }
        // return $exception;
        return response()->json(['ok'=>false, 'error' => ['error' => $exception->getMessage()]], 500);
        
        // return parent::render($request, $exception);
    }
}

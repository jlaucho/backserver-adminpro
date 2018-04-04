// Requeridos
// var express = require('express');
// var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;
/**
 * VERIFICAR TOKEN  
 */

 exports.verificaToken = function( request, response, next ){

     
         var token = request.query.token;
         jwt.verify( token, SEED, (error, decode) =>{
             if(error){
                 return response.status( 401 ).json({
                     'ok': false,
                     'mensaje': 'Error al validate el token',
                     'errors': error
                    });
                }
            
            request.usuario = decode.usuario;
                
            next();
            // return response.status( 200 ).json({
            //     'ok': true,
            //     'mensaje': 'token Valido',
            //     decode: decode
            //    });
        });
            
}
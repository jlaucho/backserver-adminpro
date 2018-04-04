// Requeridos
var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

// Inicializar variables
var app = express();
var Usuario = require('./../models/usuario');

app.post( '/', ( request, response, next ) =>{
    body = request.body;

    Usuario.findOne( { email: body.email}, ( error, usuarioEncontrado ) =>{

        if( error){
            return response.status( 500 ).json({
                'ok': false,
                'mensaje': 'Error al buscar el usuario',
                'errors': error
            });
        }
        
        if( !usuarioEncontrado){
            return response.status( 400 ).json({
                'ok': false,
                'mensaje': 'Verifique la clave y el usuario - email',
                'errors': ""
            });
        }

        if( !bcrypt.compareSync( body.password, usuarioEncontrado.password )){
            return response.status( 400 ).json({
                'ok': false,
                'mensaje': 'Verifique la clave y el usuario - password',
                'errors': ""
            });
        }

        usuarioEncontrado.password = ':)';

        var token = jwt.sign({ usuario: usuarioEncontrado}, SEED, { expiresIn: 14400 });
        
        return response.status( 200 ).json({
            'ok': true,
            'token': token,
            'id': usuarioEncontrado._id,
            'usuario': usuarioEncontrado
        });
    });

});

module.exports = app;
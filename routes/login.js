// Requeridos
var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;
const {OAuth2Client} = require('google-auth-library');

// Inicializar variables
var app = express();
var Usuario = require('./../models/usuario');

const client_id = require('./../config/config').client_id;
const secret_id = require('./../config/config').secret_id;


/**
 * AUTENTICACION POR GOOGLE
 */


app.post('/google', (request, response, next)=>{
    
    token = request.body.token || 'as';
    
    const client = new OAuth2Client(client_id);

    async function verify() {
        const googleUser = await client.verifyIdToken({
            idToken: token,
            audience: client_id,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload  = googleUser.getPayload();
        const userid = payload['sub'];
        // If request specified a G Suite domain:
        //const domain = payload['hd'];
        // return response.status( 400 ).json({
        //     'ok': false,
        //     'mensaje': 'Debe de usar su autenticacion normal',
        //     'errors': {},
        // });

        Usuario.findOne({ 'email': payload.email }, ( error, usuarioDB )=>{
            if( error ){
                return response.status( 500 ).json({
                    'ok': false,
                    'mensaje': 'Error al buscar usuario',
                    'errors': error
                });
            }
            if( usuarioDB ){
                if(usuarioDB.google === false){
                    return response.status( 400 ).json({
                        'ok': false,
                        'mensaje': 'Debe de usar su autenticacion normal',
                        'errors': error,
                        
                    });
                } else {
                var token = jwt.sign({ usuario: usuarioDB}, SEED, { expiresIn: 14400 });
        
                return response.status( 200 ).json({
                    'ok': true,
                    'token': token,
                    'id': usuarioDB._id,
                    'usuario': usuarioDB
                    });
                }
            } else {
                // El Usuario no existe
                var usuario = new Usuario();
                usuario.nombre = payload.name;
                usuario.email = payload.email;
                usuario.img = payload.picture;
                usuario.google = true;
                usuario.password = ':)';

                usuario.save( (error, usuarioGuardado)=>{
                    if( error ){
                        return response.status( 500 ).json({
                            'ok':false,
                            'mensaje': 'Error al tratar de guardar usuario',
                            'errors': error
                        });
                    }
                    var token = jwt.sign({ usuario: usuarioGuardado}, SEED, { expiresIn: 14400 });
        
                    return response.status( 200 ).json({
                        'ok': true,
                        'token': token,
                        'id': usuarioGuardado._id,
                        'usuario': usuarioGuardado
                    });
                })
            }
        });
    /**=================================================
     * 
     * =================================================
     */
    }

    verify().catch((e)=>{
        return response.status( 400 ).json({
            'ok':false,
            'mensaje': 'Error al validat el token',
            'errors': e
        });
    });
    
    
});

/**
 * ATENTICACION CON EMAIL Y PASSWORD
 */
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
// Requeridos
var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
// var SEED = require('../config/config').SEED;
var mdAutenticacion = require('./../middleares/autentication');

// Inicializar variables
var app = express();

// Rutas

/**
 * OBTENER TODOS LOS USUARIOS
 */
app.get('/', (request, response, next)=>{

    var desde = request.query.desde || 0;
    desde = Number(desde);
    
    Usuario.find({},'nombre email rol img google')
    .skip(desde)
    .limit(5)
    .exec( 
        ( error, usuarios ) =>{

        if( error ){
            return response.status( 500 ).json({
                'ok': true,
                'mensaje': 'Error cargando usuarios',
                'errors': { error } 
            });    
        }

        Usuario.count( ( error, totalUser )=>{

            if( error ){
                return response.status( 500 ).json({
                    'ok': false,
                    'mensaje': 'Error realizando la cuenta de usuarios',
                    'errors': { error } 
                });    
            }
            
            return response.status( 200 ).json({
                'ok': true,
                'total': totalUser,
                'usuarios': usuarios
            });
        });
    });
});

/**
 * ACTUALIZAR USUARIO
 */

 app.put('/:id', mdAutenticacion.verificaToken, ( request, response, next )=>{
    var id = request.params.id;
    var body = request.body;

    Usuario.findById( id, ( error, usuarioEncontrado ) =>{
        
        if( error ){
            return response.status( 500 ).json({
                'ok': true,
                'mensaje': 'Error al buscar usuario',
                'errors': { error } 
            });    
        }

        if( !usuarioEncontrado ){
            return response.status( 400 ).json({
                'ok': true,
                'mensaje': 'No hay usuarios con ese id',
                'errors': { errors: 'No existen usuario con ese ID' }
            });    
        }
        
        usuarioEncontrado.nombre = body.nombre;
        usuarioEncontrado.email = body.email;
        usuarioEncontrado.rol = body.rol;
        
        // return usuarioEncontrado;
        
        usuarioEncontrado.save( (error, usuarioGuardado) =>{
            if( error ){
                return response.status( 400 ).json({
                    'ok': false,
                    'menssage': 'Error al intentar actualizar usuario',
                    'errors': error 
                });        
            }
            
            usuarioGuardado.password = ':)';
            return response.status( 200 ).json({
                'ok': true,
                'usuario': usuarioGuardado,

            });
        });
    });
 });

/**
 * CREAR USUARIO
 */

app.post('/',  mdAutenticacion.verificaToken, (request, response, next) =>{

    var body = request.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        rol: body.rol
    });

    usuario.save( (error, usuarioGuardado) =>{


        if( error ){
            return response.status( 400 ).json({
                'ok': true,
                'mensaje': 'Error al crear usuario',
                'errors': { error } 
            });    
        }
        
        usuarioGuardado.password = ':)';
        
        return response.status( 201 ).json({
            'ok': true,
            'usuario': usuarioGuardado,
            'currentUser': request.usuario
        });
    });
});

/**
 * BORRAR USUARIO
 */

app.delete('/:id', mdAutenticacion.verificaToken,( request, response, next )=>{
    var id = request.params.id;

    Usuario.findByIdAndRemove( id, ( error, usuarioBorrado ) =>{
        if( error ){
            return response.status(500).json({
                'ok': false,
                'message': 'Error al tratar de eliminar usuario',
                'errors': error
            });
        }

        if( !usuarioBorrado ){
            return response.status(400).json({
                'ok': false,
                'message': 'Error al tratar de eliminar usuario',
                'errors': {message: 'No existe ese usuario'}
            });
        }

        return response.status( 200 ).json({
            'ok': true,
            'usuario': usuarioBorrado 
        });
    });
});

module.exports = app;
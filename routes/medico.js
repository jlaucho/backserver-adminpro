// Requeridos
var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
// var SEED = require('../config/config').SEED;
var mdAutenticacion = require('./../middleares/autentication');

// Inicializar variables
var app = express();
var Medico = require('./../models/medico');

// Rutas

/**
 * OBTENER TODOS LOS MEDICOS
 */
app.get('/', (request, response, next)=>{

    Medico.find({})
    .populate('usuario', 'email nombre')
    .populate('hospital', 'nombre')
    .exec(
        ( error, medicos ) =>{

        if( error ){
            return response.status( 500 ).json({
                'ok': false,
                'mensaje': 'Error cargando medicos',
                'errors': { error } 
            });    
        }

        if( medicos.length == 0 ){
            return response.status( 500 ).json({
                'ok': true,
                'mensaje': 'No hay medicos registrados en el sistema',
                'errors': { error } 
            });    
        }
        
        return response.status( 200 ).json({
            'ok': true,
            'medicos': medicos 
        });
    });
});

/**
 * ACTUALIZAR MEDICO
 */

 app.put('/:id', mdAutenticacion.verificaToken, ( request, response, next )=>{
    var id = request.params.id;
    var body = request.body;

    Medico.findById( id, ( error, medicoEncontrado ) =>{
        
        if( error ){
            return response.status( 500 ).json({
                'ok': true,
                'mensaje': 'Error al buscar medico',
                'errors': { error } 
            });    
        }

        if( !medicoEncontrado ){
            return response.status( 400 ).json({
                'ok': true,
                'mensaje': 'No hay medico con el id: '+id,
                'errors': { errors: 'No existe Medico con ese ID' }
            });    
        }
        
        medicoEncontrado.nombre = body.nombre;
        medicoEncontrado.hospital = body.idHospital;
        
        medicoEncontrado.save( (error, medicoGuardado) =>{
            if( error ){
                return response.status( 400 ).json({
                    'ok': false,
                    'menssage': 'Error al intentar actualizar medico',
                    'errors': error 
                });        
            }
            
            medicoGuardado.password = ':)';
            return response.status( 200 ).json({
                'ok': true,
                'medico': medicoGuardado,

            });
        });
    });
 });

/**
 * CREAR USUARIO
 */

app.post('/',  mdAutenticacion.verificaToken, (request, response, next) =>{

    // var idHospital = request.params.idHospital;
    var body = request.body;

    var medico = new Medico({
        nombre: body.nombre,
        img: body.img,
        usuario: request.usuario._id,
        hospital: body.idHospital
    });

    medico.save( (error, medicoGuardado) =>{


        if( error ){
            return response.status( 400 ).json({
                'ok': true,
                'mensaje': 'Error al crear medico',
                'errors': { error } 
            });    
        }
        
        medicoGuardado.password = ':)';
        
        return response.status( 201 ).json({
            'ok': true,
            'usuario': medicoGuardado
        });
    });
});

/**
 * BORRAR USUARIO
 */

app.delete('/:id', mdAutenticacion.verificaToken,( request, response, next )=>{
    var id = request.params.id;

    Medico.findByIdAndRemove( id, ( error, medicoBorrado ) =>{
        if( error ){
            return response.status(500).json({
                'ok': false,
                'message': 'Error al tratar de eliminar el medico',
                'errors': error
            });
        }

        if( !medicoBorrado ){
            return response.status(400).json({
                'ok': false,
                'message': 'Error al tratar de eliminar medico',
                'errors': {message: 'No existe ese medico con ese ID: '+id}
            });
        }

        return response.status( 200 ).json({
            'ok': true,
            'medico': medicoBorrado 
        });
    });
});

module.exports = app;
// Requeridos
var express = require('express');
var mongoose = require('mongoose');
var mdAutenticacion = require('./../middleares/autentication');

// Iniciacion de variables
var app = express();

// Importaciones de modelos
Hospital = require('./../models/holspital');

// RUTAS
/**
 * OBTENER TODOS LOS HOSPITALES
 */
app.get('/', ( request, response, next )=>{

    var desde = request.query.desde || 0;
    desde = Number(desde);

    Hospital.find({})
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .exec(
         ( error, hospitales )=>{

        if( error ){
            return response.status( 500 ).json({
                'ok': false,
                'mensaje': 'Error al tratar de recuperar la lsta de hospitales',
                'errors': error
            });
        }

        if( hospitales.length == 0 ){
            return response.status( 200 ).json({
                'ok': true,
                'mensaje': 'No se encuentran hospitales en el sistema',
                'errors' : ""
            });
        }
        
        Hospital.count(( error, totalHospitales )=>{
            if( error ){
                return response.status( 500 ).json({
                    'ok': false,
                    'mensaje': 'error al realizar el conteo de hospitales',
                    'errors': error
                });
            }
            return response.status( 200 ).json({
                'ok': true,
                'total': totalHospitales,
                'hospitales': hospitales
            });
        });
    });
    
    
});

/**
 * ACTUALIZAR HOSPITAL
 */

app.put('/:id', mdAutenticacion.verificaToken, ( request, response,  next )=>{
    var id = request.params.id;
    var body = request.body; 

    Hospital.findById( id, ( error, hospital )=>{
        if( error ){
            return response.status( 500 ).json({
                'ok': false,
                'mensaje': 'Error al tratar de recuperar la lsta de hospitales',
                'errors': error
            });
        }

        if( !hospital ){
            return response.status( 400 ).json({
                'ok': false,
                'mensaje': 'El Hospital no existe por ese ID',
                'errors': ''
            });
        }
    
        hospital.nombre = body.nombre;

        hospital.save( ( error, hospitalActualizado )=>{
            if( error ){
                return response.status( 500 ).json({
                    'ok': false,
                    'mensaje': 'Error al tratar de actualizar el hospital '+ hospital.nombre,
                    'errors': error
                });
            }

            return response.status( 200 ).json({
                'ok': true,
                'hospital': hospitalActualizado
            });
        });
        
    });

});

/**
 * REGISTRAR HOSPITAL
 */

 app.post('/', mdAutenticacion.verificaToken ,( request, response, next )=>{
     var body = request.body;

     var hospital = new Hospital({
         nombre: body.nombre,
         img: body.img,
         usuario: request.usuario._id
     });

     hospital.save(( error, hospitalGuardado )=>{
        if( error ){
            return response.status( 500 ).json({
                'ok': false,
                'mensaje': 'Error al tratar de guardar el hospital: '+ body.nombre,
                'errors': error
            });
        }

        return response.status( 200 ).json({
            'ok': true,
            'hospital': hospitalGuardado
        });
     });


 });

 /**
  * BORRAR HOSPITAL
  */
 app.delete('/:id', mdAutenticacion.verificaToken, ( request, response, next )=>{
    var id = request.params.id;

    Hospital.findByIdAndRemove( id, ( error, hosptalEliminado )=>{
        if( error ){
            return response.status( 500 ).json({
                'ok': false,
                'mensaje': 'Error al tratar de eliminar el hospital',
                'errors': error
            });
        }

        if( !hosptalEliminado ){
            return response.status( 400 ).json({
                'ok': false,
                'mensaje': 'El ID del hospital no se encuentra registrado',
                'errors': ""
            });
        }

        return response.status( 200 ).json({
            'ok': true,
            'hospital': hosptalEliminado
        });
    });
 });

module.exports = app;

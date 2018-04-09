// Requeridos
var express = require('express');

// Inicializar variables
var app = express();

// Importacion de modelos
Usuario = require('./../models/usuario');
Medico = require('./../models/medico');
Hospital = require('./../models/holspital');

// Rutas

/**
 * BUSCAR EN TODAS LAS COLECCIONES
 */
app.get('/todo/:busqueda', (request, response, next) => {

    let busqueda = request.params.busqueda;
    let regEx = new RegExp(busqueda, 'i');

    Promise.all([
        buscarHospitales(busqueda, regEx),
        buscarMedicos(busqueda, regEx),
        buscarUsuarios(busqueda, regEx)
    ]).then(respuestas => {
        return response.status(200).json({
            'ok': true,
            'mensaje': 'Peticion realizada correctamente',
            'hospitales': respuestas[0],
            'medicos': respuestas[1],
            'usuarios': respuestas[2]
        });
    });
})

/**
 * BUSCAR EN LA COLECCION SEGUN LA COLECCION DE BUSQUEDA
 */
app.get('/coleccion/:coleccion/:busqueda', (request, response, next) => {

    let busqueda = request.params.busqueda;
    let coleccion = request.params.coleccion;

    let regEx = new RegExp(busqueda, 'i');

    let promise;

    switch (coleccion) {
        case 'medico':
            promise = buscarMedicos(busqueda, regEx);
            break;
        case 'usuario':
            promise = buscarUsuarios(busqueda, regEx);
            break;
        case 'hospital':
            promise = buscarHospitales(busqueda, regEx);
            break;

        default:
            return response.status(400).json({
                'ok': false,
                'mensaje': 'La coleccion solicitada no se encuentra registrada en nuestro sistema, favor verifique y vuelva a intentar '
            });
            break;
    }

    promise.then(respuesta => {
        return response.status(200).json({
            'ok': true,
            'mensaje': 'Peticion realizada correctamente',
            [coleccion]: respuesta
        });
    });
})

/**
 * FUNCION DE BUSQUEDA DE HOSPITALES
 */

function buscarHospitales(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Hospital.find({ 'nombre': regex })
            .populate('usuario', 'nombre email')
            .exec(
                (error, hospitales) => {
                    if (error) {
                        reject('Error al buscar los hospitales' + error);
                    } else {
                        resolve(hospitales);
                    }
                });
    });
}
/**
 * FUNCION DE BUSQUEDA DE MEDICOS
 * @param {*} busqueda 
 * @param {*} regex 
 */
function buscarMedicos(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Medico.find({ 'nombre': regex })
            .populate('usuario', 'nombre email')
            .populate('hospital')
            .exec(
                (error, medicos) => {
                    if (error) {
                        reject('Error al buscar los medicos' + error);
                    } else {
                        resolve(medicos);
                    }
                });
    });
}
/**
 * FUNCION DE BUSQUEDA DE USUARIOS
 * @param { coleccion } busqueda 
 * @param { el temino de busqueda en expresion regular } regex 
 */
function buscarUsuarios(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Usuario.find({}, 'nombre email rol')
            .or([{ 'nombre': regex }, { 'email': regex }])
            .exec(
                (error, usuarios) => {
                    if (error) {
                        reject('Error al buscar los usuarios' + error);
                    } else {
                        resolve(usuarios);
                    }
                });
    });
}

module.exports = app;
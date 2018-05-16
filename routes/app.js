// Requeridos
var express = require('express');

// Inicializar variables
var app = express();

// Importacion de modelos
Usuario = require('./../models/usuario');
// Hospital = require('./../models/holspital');

// Rutas

app.get('/', (request, response, next)=>{

        return response.status( 200 ).json({
            'ok': true,
            'mensaje': 'Peticion realizada correctamente' 
        });
});

module.exports = app;
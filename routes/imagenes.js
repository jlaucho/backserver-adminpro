// Requeridos
var express = require('express');
var fs = require('fs');
var path = require('path');

// Inicializar variables
var app = express();

// Importacion de modelos
// Usuario = require('./../models/usuario');
// Hospital = require('./../models/holspital');

// Rutas

app.get('/:tipo/:img', (request, response, next) => {

    var tipo = request.params.tipo;
    var img = request.params.img;

    var tiposPermitidos = ['usuarios', 'medicos', 'hospitales'];

    if (tiposPermitidos.indexOf(tipo) < 0) {
        return response.status(400).json({
            'ok': false,
            'mensaje': 'El tipo de coleccion no es permitido',
            'errors': { menssage: 'Los tipos permitidos son: ' + tiposPermitidos.join(", ") }
        });
    }

    var pathFile = `./uploads/${ tipo }/${ img }`;

    // Se comprueba que contenga imagen
    if (!fs.existsSync(pathFile)) {
        pathFile = `./uploads/${ tipo }/default.jpg`;
    }

    response.sendFile(path.resolve(pathFile));

});

module.exports = app;
// Requeridos
var express = require('express');
var fileUpload = require('express-fileupload');
var fs = require('fs');

// Inicializar variables
var app = express();

// default options
app.use(fileUpload());

// Importacion de modelos
Usuario = require('./../models/usuario');
Medico = require('./../models/medico');
Hospital = require('./../models/holspital');
// Hospital = require('./../models/holspital');

// Rutas

app.put('/:tipo/:id', (request, response, next) => {

    var tipo = request.params.tipo;
    var id = request.params.id;

    // Tipos de colecciones permitidas
    var tiposValidos = ['usuarios', 'medicos', 'hospitales'];

    if (tiposValidos.indexOf(tipo) < 0) {
        return response.status(400).json({
            'ok': false,
            'mensaje': 'Error de direccion',
            'errors': { menssage: 'Las colecciones validas son ' + tiposValidos.join(", ") }
        });
    }

    if (!request.files) {

        return response.status(400).json({
            'ok': false,
            'mensaje': 'No contiene ningun archivo de imagen adjunto',
            'errors': { menssage: 'Debe seleccionar una imagen' }
        });
    }

    // Obtener nombre del archivo
    var archivo = request.files.img;
    var nombreCortado = archivo.name.split('.');
    var ext = nombreCortado[(nombreCortado.length - 1)];

    // permitir extensiones
    var permitidas = ['jpg', 'png', 'gif', 'jpeg'];

    if (permitidas.indexOf(ext) < 0) {
        return response.status(400).json({
            'ok': false,
            'mensaje': 'Extension no valida',
            'errors': { menssage: 'Las extensiones validas son ' + permitidas.join(", ") }
        });
    }
    // nombre de archivo personalizado
    var nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${ ext }`;

    // mover el archivo del temporal a una direccion en particular
    var path = `uploads/${ tipo }/${ nombreArchivo }`;
    archivo.mv(path, (error) => {
        if (error) {
            return response.status(500).json({
                'ok': false,
                'mensaje': 'error l mover el archivo',
                'errors': error
            });
        }
    });

    subirPorTipo(tipo, id, nombreArchivo, response);
});

/**
 * 
 * @param {coleccion} tipo String
 * @param {id_usuario} id string
 * @param {nombre} nombreArchivo string
 * @param {respuesta_servidor} response json
 */
function subirPorTipo(tipo, id, nombreArchivo, response) {
    if (tipo === 'usuarios') {
        // Se busca el usuario por el ID
        Usuario.findById(id, (error, usuarioEncontrado) => {
            if (error) {
                return response.status(500).json({
                    'ok': false,
                    'mensaje': 'Error al buscar el usuario',
                    'errors': error
                });
            }

            if (!usuarioEncontrado) {
                return response.status(400).json({
                    'ok': true,
                    'mensaje': 'No hay usuarios con ese id',
                    'errors': { errors: 'No existen usuario con ese ID' }
                });
            }
            // Si existe elimina la imagen anterior del usuario
            var pathViejo = `uploads/usuarios/${ usuarioEncontrado.img }`;
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }

            usuarioEncontrado.img = nombreArchivo;

            usuarioEncontrado.save((error, usuarioActualizado) => {

                if (error) {
                    return response.status(500).json({
                        'ok': false,
                        'mensaje': 'Error al actualizar el usuario',
                        'errors': error
                    });
                }

                return response.status(200).json({
                    'ok': true,
                    'mensaje': 'Usuario Actualizado',
                    'usuario': usuarioActualizado
                });
            });

        });
    }
    /**
     * COLECCION DE MEDICOS
     */
    if (tipo === 'medicos') {
        // Se busca el usuario por el ID
        Medico.findById(id, (error, medicoEncontrado) => {
            if (error) {
                return response.status(500).json({
                    'ok': false,
                    'mensaje': 'Error al buscar el medico',
                    'errors': error
                });
            }

            if (!medicoEncontrado) {
                return response.status(400).json({
                    'ok': true,
                    'mensaje': 'No hay medicos con ese id',
                    'errors': { errors: 'No existen medico con ese ID' }
                });
            }
            // Si existe elimina la imagen anterior del medico
            var pathViejo = `uploads/medicos/${ medicoEncontrado.img }`;
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }

            medicoEncontrado.img = nombreArchivo;

            medicoEncontrado.save((error, medicoActualizado) => {

                if (error) {
                    return response.status(500).json({
                        'ok': false,
                        'mensaje': 'Error al actualizar el medico',
                        'errors': error
                    });
                }

                return response.status(200).json({
                    'ok': true,
                    'mensaje': 'Medico Actualizado',
                    'medico': medicoActualizado
                });
            });

        });
    }

    /**
     * COLECCION DE HOSPITALES
     */
    if (tipo === 'hospitales') {
        // Se busca el usuario por el ID
        Hospital.findById(id, (error, hospitalEncontrado) => {
            if (error) {
                return response.status(500).json({
                    'ok': false,
                    'mensaje': 'Error al buscar el hospital',
                    'errors': error
                });
            }

            if (!hospitalEncontrado) {
                return response.status(400).json({
                    'ok': true,
                    'mensaje': 'No hay hospitales con ese id',
                    'errors': { errors: 'No existen hospital con ese ID' }
                });
            }
            // Si existe elimina la imagen anterior del hospital
            var pathViejo = `uploads/hospitales/${ hospitalEncontrado.img }`;
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }

            hospitalEncontrado.img = nombreArchivo;

            hospitalEncontrado.save((error, hospitalActualizado) => {

                if (error) {
                    return response.status(500).json({
                        'ok': false,
                        'mensaje': 'Error al actualizar el hospital',
                        'errors': error
                    });
                }

                return response.status(200).json({
                    'ok': true,
                    'mensaje': 'Hospital Actualizado',
                    'hospital': hospitalActualizado
                });
            });

        });
    }
}

module.exports = app;
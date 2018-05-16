var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var rolValidos = {
    values: ['superAdmin', 'usuario'],
    message: '{PATH} No es un rol permitido' 
}

var usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    email: { type: String, unique: true, required: [true, 'El email es necesario'] },
    password: { type: String, required: [true, 'El password es necesario'] },
    img: { type: String, required: false },
    rol: { type:String, required: true, default: 'usuario', enum: rolValidos },
    google: { type: Boolean, default: false }
});

usuarioSchema.plugin( uniqueValidator, { message: 'El {PATH} debe ser unico' } );

module.exports = mongoose.model( "Usuario", usuarioSchema );
// Requires

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

// Conexion a la base de datos

mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (error, response) => {
    if (error) throw error;

    console.log('Base de datos en el puerto 27017: \x1b[32m%s\x1b[0m', 'online');
});
// Inicializar variables
var app = express();

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

// Body parse
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importacion de rutas
var busquedaRouters = require('./routes/busqueda');
var hospitalRoutes = require('./routes/hospital');
var imgenesRoutes = require('./routes/imagenes');
var usuarioRoutes = require('./routes/usuario');
var medicoRouters = require('./routes/medico');
var uploadRoutes = require('./routes/upload')
var loginRoutes = require('./routes/login');
var appRoutes = require('./routes/app');

// Definicion de rutas
app.use('/busqueda', busquedaRouters);
app.use('/hospital', hospitalRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/medico', medicoRouters);
app.use('/upload', uploadRoutes);
app.use('/img', imgenesRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);

// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server corriendo en el puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});
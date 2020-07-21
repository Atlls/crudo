/** Archivos de ejecucion del servidor **/

/* Principal */
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

/* Importando rutas */
const crudoRouters = require('./routers/crudo');

/* Configuraciones de express */

// Establecer puerto
app.set('port', process.env.PORT || 3000);

// Establecer Motor de plantillas
app.set('view engine', 'ejs');

// Establecer ruta de las vistas (views)
app.set('views', path.join(__dirname, 'views'));

/* middlewares */
// Mensaje en consola del GET
app.use(morgan('dev'));
app.use(myConnection(mysql, {
	host: 'localhost',
	user: 'root',
	password: '1234',
	port: 3306,
	database: 'crudo'
}, 'single'));
app.use(express.urlencoded({extended: false}));

/* rutas */
app.use('/', crudoRouters);

/* Archivos estaticos */
app.use(express.static(path.join(__dirname, 'public')));

/* Ejecutando el servidor! */
app.listen(app.get('port'), () => {
	console.log('Servidor corriendo en puerto 3000!');
});

/** Anotaciones **/
/*

- app.set('port', process.env.PORT || 3000) -> (Busca un puerto disponible O usa el 3000)
- app.get('port') es como que obtiene el 'port', o sea 'port' es una variable que alamacena el puerto.

- configuracion de nodemon: en packege.json, en script se coloca "dev": "nodemon src/app.js". Y en la consola para ejecutar nodemon se coloca: "npm run dev"

- app.set('view', path.join(__dirname, 'views')); -> Como éste archivo (app.js) esta dentro de una carpeta src, se usa el modulo path para decirle al app la ruta donde se encuentra la carpeta 'views'

- Los middlewares: Son funciones que se ejecutan antes de las peticiones de los ususarios, las peticiones se conocen como rutas, como los /'s.

- app.use(morgan('dev')); -> Ejecuta un log en consola que dice las consultas GET

- En rutas van todas las url que los ususarios piden en el servidor

- Los archivos estaticos: Son comprementos de la pagina web: img, codigo fuente, .js del frontend. Esas cosas se colocan en una carpeta llamada public

- app.use(express.urlencoded({extended: false})); -> Desde el modulo de expres, estamos requiereiendo un metodo que nos va a permitir poder entender todos los datos que vengan del formulario
- Lo de arribita: Cuando se resiva un dato, se resive por una propiedad del objeto req llamada body (req.body), este req es del controller
*/
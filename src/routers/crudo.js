const express = require('express');
const router = express.Router();

// Impotar metodos
const crudoController = require('../controllers/curdoController');

router.get('/', crudoController.list);
router.post('/add', crudoController.guardar);
router.get('/delete/:id', crudoController.eliminar);

router.get('/update/:id', crudoController.editar);
router.post('/update/:id', crudoController.modificar);
router.get('/clear', crudoController.limpiar);


module.exports = router;


/*** Anotaciones ***/
/*
- routers tiene en metodo de express que permite agregar rutas

- Acá van todas las rutas del servidor

- Acá se escriben todas las url que la aplicacion del servidor va a poder manejar

router.get('/', (req, res) => {
	res.send('Habla menoool!');
});

Lo de arribita: cuando pida la url '/' (La pagina inicial pues), en respuesta (res) va a enviar (.send) un mensaje...
Sin embargo, la accion de enviar datos a la pagina, es el controlador, por eso esta el controller.js, que tiene todos los metodos que se van a usar para salida y entrada de datos.

- Importar métodos del controlador: esos métodos del controlador, se tiene que impotar desde el archivo donde estan definidos hasta esta archivo para usarlo

- '/delete:id' --> Se conoce como parametro de la ruta: El ':id' es para decirle que va a recivir una variable del .ejs

- Tiene que ser .get() la accion de eliminar.

*/
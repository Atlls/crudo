const controller = {};

controller.list = (req, res) => {
	req.getConnection((err, conn) => {
		conn.query('SELECT * FROM menu', (err, menus) => {
			if(err){
				res.json(err);
			}
			console.log('Menus es ->',menus[0]);
			res.render('menus', {
				data: menus
			});
		});
	});
};

controller.guardar = (req, res) => {

	// Almacena los datos llegados del formulario.
	const data = req.body;

	req.getConnection((err, conn) => {
		conn.query('INSERT INTO menu set ?', [data], (err, menus) => {
			res.redirect('/');
		});
	});
};

controller.eliminar = (req, res) => {

	// Almacena la id del dato que queremos eliminar. Se puede escribir así -> const { id } = req.params;
	const id = req.params.id;

	req.getConnection((err, conn) => {
		conn.query('DELETE FROM menu WHERE id = ?', [id], (err, menus) => {
			res.redirect('/');
		});
	});
};

controller.editar = (req, res) => {

	const id = req.params.id;

	req.getConnection((err, conn) => {
		conn.query('SELECT * FROM menu WHERE id = ?', [id], (err, menus) => {
			res.render('menus_edit', {
				data: menus[0]
			});
		});
	});
};

controller.modificar = (req, res) => {
	// id a modificar
	const id = req.params.id;
	// Nuevos datos del plato a modificar
	const newMenu = req.body;

	req.getConnection((err, conn) => {
		conn.query('UPDATE menu set ? WHERE id = ?', [newMenu, id], (err, menu) => {
			res.redirect('/');
		});
	});

};

controller.limpiar = (req, res) => {
	req.getConnection((err, conn) => {
		conn.query('TRUNCATE menu', (err, menus) => {
			res.redirect('/');
		});
	});
};

module.exports = controller;

/** Anotaciones **/
/*

- Acá se definen todos los métodos de entrada y salida de datos!

- controller.*nombre del metodo* = (req, res) => {*Accion*}

-- Conectando con MySQL: En app.js, en el middlewares se definio la connection a MySQL, por lo tanto ahora req, tiene nuevos metodos.
- .getConnection() -> Pide una coneccion a MySQL
- err y conn: Cuando se conecte puede pasar dos cosas: un error y una connecion, por eso las dos variables.
- .query() -> Permite realizar una consulta con sintaxis MySQL! Pasa lo mismo con err y conn, pero con va a tener los elementos de la tabla
- res.json(err) -> Es para andar el error a la pagina en caso de que haya. Se puede sustituir por next(err), y lo manda como un middleware, es mas profecional.
- res.render() -> envía al navegador una vista, en otras palabras la salida en sí, que es todo el codigo html pero en forma de .ejs que es el motor de plantillas; el segundo parametro es lo que se le pasa a la vista, es decir en este caso al archivo .ejs; Dicho parámetro es un objeto que en este caso solo tiene "datos" como atrubuto, dicho atributo contiene los datos de la consulta MySQL.

- .guardar: es una funcion que se encarga de guardar los datos enviados desde la pagina hacia el servidor MySql. Estos datos llegan como un objeto (El servidor procea los datos del <form>),

- El signo de ? en la consulta del .guardar: hace referencia al seguente parametro de la funcion que se encierra en corchetes, dicho parametro (en este caso "dato"), tiene los datos a registrar.

- req.params -> Es una variable especial que tiene un parametro de ruta (router), que en este caso es el ':id' que esta en el archivo de crudo.js.

.modificar: Lo que hace es que primero obtiene la id a modificar y luego los datos del nuevo plato enviados previamente mediante un <form>.

Doble parametros en conn.query: como tiene dos ?, se deben pasar dos datos en el segundo parametro, dentro de los corchetes [*primero*,*segundo*, ... , *n-ésimo*]. De tal forma que se peude pasar todos los parametros que se requieran.

*/
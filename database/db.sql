-- Creando la base de datos
CREATE DATABASE crudo;

-- Utilizando la base de datos
use crudo;

-- Creando la unica tabla
CREATE TABLE menu (
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	plato VARCHAR(50) NOT NULL,
	precio VARCHAR(6) NOT NULL
);

-- Mostrar todas las tablas
SHOW TABLES;

-- Para describir la tabla en la consola
describe menu;

-- Notas:
-- Todo esto se copia y se pega en la consola de mysql
-- y así se crea una base de datos. Si hay alun error, entonces usa DROP *nombre de la base de datos*, para eliminarla y volverla a crear.

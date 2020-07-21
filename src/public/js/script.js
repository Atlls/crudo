// Variables
const ePlato = document.getElementById('plato');
const ePrecio = document.getElementById('precio');
const btnAgregar = document.getElementById('enviar');
const btnMostrarMenu = document.getElementById('mostrarMenuBtn');
const btnReestablecer = document.getElementById('resetBtn');
const tablaMenu = document.getElementById('tabla');
const form = document.querySelector('form');

// Objetos

class Interfaz {

	validarEntradaMenu(){
		//console.log(btnAgregar);
		let aux

		if (ePlato.value != '' && ePrecio.value != ''){
			aux = false;
		} else {
			aux = true;
		}

		return aux;
	}
}

/* Events Listeners */

// Al inicar la la pagina
document.addEventListener('DOMContentLoaded', function(){
	// Desabilitar boton de envio.
	const interfaz = new Interfaz();

	validarEntrada();
});

ePlato.addEventListener('blur', validarEntrada);
ePrecio.addEventListener('blur', validarEntrada);

if (btnMostrarMenu != null) {

		btnMostrarMenu.addEventListener('click', function(event){
		event.preventDefault();

		if(tablaMenu.style.display === 'none' || tablaMenu.style.display === '') {
			tablaMenu.style.display = 'block';
			event.target.innerText = 'Ocultar menú';
		} else {
			tablaMenu.style.display = 'none';
			event.target.innerText = 'Mostrar menú';
		}

	});
}

btnReestablecer.addEventListener('click', function(event) {
	event.preventDefault();

	form.reset();

	ePlato.value = null;
	ePrecio.value = null;

	validarEntrada();

});

function validarEntrada(){
	const interfaz = new Interfaz();

	btnAgregar.disabled = interfaz.validarEntradaMenu();

}
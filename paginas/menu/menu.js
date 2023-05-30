// Variables globales
var platosAgregados = [];

var nuevoPlatoForm = document.getElementById('nuevo-plato-form');
nuevoPlatoForm.addEventListener('submit', function(e) {
  e.preventDefault();

  var nombreInput = document.getElementById('nombre-plato-input');
  var precioInput = document.getElementById('precio-plato-input');

  var nombre = nombreInput.value;
  var precio = parseFloat(precioInput.value);

  // Crea un objeto plato con el nombre y precio
  var plato = {
    nombre: nombre,
    precio: precio
  };

  // Agrega el plato a la lista
  platosAgregados.push(plato);

  // Guarda la lista de platos en localStorage
  guardarPlatosEnLocalStorage();

  // Actualiza la lista de platos agregados en el HTML
  actualizarPlatosAgregados();

  // Limpia los campos del formulario
  nombreInput.value = '';
  precioInput.value = '';
});

function actualizarPlatosAgregados() {
  var platosAgregadosList = document.getElementById('platos-agregados-list');
  var platoMesaSelects = document.querySelectorAll('[id^="plato-mesa"]');

  platosAgregadosList.innerHTML = '';

  // Recorre la lista de platos agregados y crea un elemento <tr> para cada plato
  for (var i = 0; i < platosAgregados.length; i++) {
    var plato = platosAgregados[i];

    // Crea el elemento <tr> con las columnas correspondientes
    var tr = document.createElement('tr');

    var nombreTd = document.createElement('td');
    nombreTd.textContent = plato.nombre;

    var precioTd = document.createElement('td');
    precioTd.textContent = plato.precio.toFixed(2) + ' $';

    var eliminarTd = document.createElement('td');
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', crearEliminarPlatoHandler(i));
    eliminarTd.appendChild(deleteButton);

    // Agrega las columnas al elemento <tr>
    tr.appendChild(nombreTd);
    tr.appendChild(precioTd);
    tr.appendChild(eliminarTd);

    // Agrega el elemento <tr> a la lista de platos agregados
    platosAgregadosList.appendChild(tr);

    // Actualiza las opciones de platos para cada mesa
    for (var j = 0; j < platoMesaSelects.length; j++) {
      var platoMesaSelect = platoMesaSelects[j];
      if (platoMesaSelect.tagName === 'SELECT') {
        var option = document.createElement('option');
        option.value = plato.precio;
        option.textContent = plato.nombre + ' ($' + plato.precio.toFixed(2) + ')';
        platoMesaSelect.appendChild(option);
      }
    }
  }
}


// Función auxiliar para crear el manejador de eventos para eliminar un plato específico
function crearEliminarPlatoHandler(index) {
  return function() {
    // Elimina el plato de la lista de platos agregados
    platosAgregados.splice(index, 1);

    // Guarda la lista de platos actualizada en localStorage
    guardarPlatosEnLocalStorage();

    // Actualiza la lista de platos agregados en el HTML
    actualizarPlatosAgregados();
  };
}

// Función para guardar la lista de platos en localStorage
function guardarPlatosEnLocalStorage() {
  localStorage.setItem('platosAgregados', JSON.stringify(platosAgregados));
}

// Función para cargar la lista de platos desde localStorage
function cargarPlatosDesdeLocalStorage() {
  var platosGuardados = localStorage.getItem('platosAgregados');

  if (platosGuardados) {
    platosAgregados = JSON.parse(platosGuardados);
    actualizarPlatosAgregados();
  }
}

// Llama a la función para cargar los platos desde localStorage al cargar la página
cargarPlatosDesdeLocalStorage();

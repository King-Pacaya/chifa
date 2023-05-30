    function openModal(mesaId) {
      var modal = document.getElementById('modal-' + mesaId);
      modal.style.display = 'block';
    }

    function closeModal(mesaId) {
      var modal = document.getElementById('modal-' + mesaId);
      modal.style.display = 'none';
    }

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


function agregarPedido(mesaId) {
  var cantidadInput = document.getElementById('cantidad-' + mesaId);
  var platoInput = document.getElementById('plato-' + mesaId);
  var camareroInput = document.getElementById('camarero-' + mesaId);

  var cantidad = parseFloat(cantidadInput.value);
  var plato = platoInput.options[platoInput.selectedIndex].text;
  var precio = parseFloat(platoInput.options[platoInput.selectedIndex].value);
  var camarero = camareroInput.value;

  var pedidosTableBody = document.getElementById(mesaId + '-pedidos-body');
  var totalElement = document.getElementById(mesaId + '-total');

  var row = pedidosTableBody.insertRow();
  var cantidadCell = row.insertCell();
  var descripcionCell = row.insertCell();
  var precioCell = row.insertCell();
  var totalCell = row.insertCell();

  cantidadCell.textContent = cantidad;
  descripcionCell.textContent = plato;
  precioCell.textContent = '$' + (cantidad * precio);
  totalCell.textContent = '$' + (cantidad * precio).toFixed(2);

  cantidadInput.value = '';
  platoInput.value = '';

  // Recalcular el precio total sumando los precios de todos los pedidos
  var total = calcularTotal(mesaId);

  totalElement.textContent = 'Total: $' + total.toFixed(2);

  var mesaTitle = document.getElementById(mesaId);

  if (pedidosTableBody.rows.length === 0) {
    mesaTitle.classList.add('no-pedido');
    mesaTitle.classList.remove('has-pedido');
  } else {
    mesaTitle.classList.add('has-pedido');
    mesaTitle.classList.remove('no-pedido');
  }

  cantidadInput.focus();
}


function limpiarPedidos(mesaId) {
  var pedidosTableBody = document.getElementById(mesaId + '-pedidos-body');
  var totalElement = document.getElementById(mesaId + '-total');

  // Borra todas las filas de la tabla de pedidos
  while (pedidosTableBody.firstChild) {
    pedidosTableBody.removeChild(pedidosTableBody.firstChild);
  }

  // Actualiza el precio total a 0
  totalElement.innerHTML = 'Total: $0.00';

  // Verificar si hay pedidos en la mesa y actualizar el estado correspondiente
  var mesaTitle = document.getElementById(mesaId);

  if (pedidosTableBody.rows.length === 0) {
    mesaTitle.classList.add('no-pedido');
    mesaTitle.classList.remove('has-pedido');
  } else {
    mesaTitle.classList.add('has-pedido');
    mesaTitle.classList.remove('no-pedido');
  }
}

function mostrarRUC(tipoDocumento, mesaId) {
  var rucContainer = document.getElementById('ruc-container-' + mesaId);
  var rucInput = document.getElementById('ruc-' + mesaId);

  if (tipoDocumento === 'factura') {
    rucContainer.style.display = 'block';
  } else {
    rucContainer.style.display = 'none';
    rucInput.value = '';
  }
}

function imprimirPedido(mesaId) {
  var pedidosTableBody = document.getElementById(mesaId + '-pedidos-body');
  var total = 0;
  var pedidosTable = document.getElementById(mesaId + '-pedidos');
  var camareroInput = document.getElementById('camarero-' + mesaId);
  var camarero = camareroInput.value;
  var metodoPagoSelect = document.getElementById('metodo-pago-' + mesaId);
  var metodoPago = metodoPagoSelect.value;
  var tipoDocumentoSelect = document.getElementById('tipo-documento-' + mesaId);
  var tipoDocumento = tipoDocumentoSelect.value;
  var rucInput = document.getElementById('ruc-' + mesaId);
  var ruc = rucInput.value;
  var restauranteNombre = "Chifa Restaurant WUANG CHOY";
  var restauranteRUC = "10701389277";
  var telefono = "976 737 830";
  var direccion = "Jr.Virgen del Pilar Mz.G Lt 16 - Alamedas ";

  var fecha = new Date().toLocaleDateString();
  var hora = new Date().toLocaleTimeString();
  var ventanaImpresion = window.open('', '_blank');

  for (var i = 0; i < pedidosTableBody.rows.length; i++) {
    var row = pedidosTableBody.rows[i];
    var precio = parseFloat(row.cells[2].innerHTML);
    var cantidad = parseFloat(row.cells[0].innerHTML);
    total += precio * cantidad;
  }

  var totalElement = document.getElementById(mesaId + '-total');
  var total = parseFloat(totalElement.innerHTML.replace(/[^0-9.-]+/g, ''));

  ventanaImpresion.document.write('<html><head><title>Pedido - Mesa ' + mesaId + '</title>');
  ventanaImpresion.document.write('<style>');
  ventanaImpresion.document.write('body { font-family: Arial, sans-serif; padding: 2vh 2vw;}');
  ventanaImpresion.document.write('.head {width: 100%; height:auto; text-align:center;}');
  ventanaImpresion.document.write('.head h1 {text-transform:uppercase; margin: 0;}');
  ventanaImpresion.document.write('.head p {margin-top: 5px; margin-bottom: 5px;}');
  ventanaImpresion.document.write('table {width: 100%; height: auto;}');
  ventanaImpresion.document.write('thead {width: 100%; height: auto;}');
  ventanaImpresion.document.write('tr {width: calc(100%/3); height: auto; text-align: center;}');
  ventanaImpresion.document.write('th {font-size: xx-large;}');
  ventanaImpresion.document.write('td {font-size: xx-large;}');
  ventanaImpresion.document.write('.pedido-table td:nth-child(4) {display: none;}');
  ventanaImpresion.document.write('.total {width:100%; text-align: center; font-weight: bold; margin: 5vh 0;}');
  ventanaImpresion.document.write('.title {width:100%; text-align: center; font-weight: bold; text-transform: uppercase; margin: 5vh 0}');
  ventanaImpresion.document.write('.info {margin: 5vh 0;}');
  ventanaImpresion.document.write('{}');
  ventanaImpresion.document.write('</style>');
  ventanaImpresion.document.write('</head><body>');

  ventanaImpresion.document.write('<div class="head">');
  ventanaImpresion.document.write('<h1>' + restauranteNombre + '</h1>');
  ventanaImpresion.document.write('<p>Dirección: ' + direccion + '</p>');
  ventanaImpresion.document.write('<p>Teléfono: ' + telefono + '</p>');
  ventanaImpresion.document.write('<p>RUC: ' + restauranteRUC + '</p>');
  ventanaImpresion.document.write('</div>');

  if (tipoDocumento === 'boleta') {
    ventanaImpresion.document.write('<p class="title">Boleta de Venta Electrónica</p>');
    ventanaImpresion.document.write('<div class="info">');
  } else if (tipoDocumento === 'factura') {
    ventanaImpresion.document.write('<p class="title">Factura Electrónica</p>');
    ventanaImpresion.document.write('<div class="info">');
    ventanaImpresion.document.write('<p>RUC: ' + ruc + '</p>');
  }

  ventanaImpresion.document.write('<p>Camarero: ' + camarero + '</p>');
  ventanaImpresion.document.write('<p>Método de Pago: ' + metodoPago + '</p>');
  ventanaImpresion.document.write('<p>Fecha: ' + fecha + '</p>');
  ventanaImpresion.document.write('<p>Hora: ' + hora + '</p>');
  ventanaImpresion.document.write('</div>');
  ventanaImpresion.document.write(pedidosTable.outerHTML);
  ventanaImpresion.document.write('<p class="total">Precio Total: $' + total.toFixed(2) + '</p>');
  ventanaImpresion.document.write('</body></html>');
  ventanaImpresion.document.close();
  ventanaImpresion.print();
}

function calcularTotal(mesaId) {
  var pedidosTableBody = document.getElementById(mesaId + '-pedidos-body');
  var rows = pedidosTableBody.getElementsByTagName('tr');
  var total = 0;

  for (var i = 0; i < rows.length; i++) {
    var precioCell = rows[i].getElementsByTagName('td')[3];
    var precio = parseFloat(precioCell.innerHTML.substring(1));
    total += precio;
  }

  return total;
}

function aplicarPromocion(mesaId) {
  var codigoInput = document.getElementById('codigo-promocional-' + mesaId);
  var codigo = codigoInput.value.toUpperCase();

  var codigosGuardados = JSON.parse(localStorage.getItem('codigosPromocionales')) || [];
  var descuento = null;

  // Buscar el descuento del código promocional en la lista de códigos guardados
  for (var i = 0; i < codigosGuardados.length; i++) {
    if (codigosGuardados[i].codigo === codigo) {
      descuento = codigosGuardados[i].descuento;
      break;
    }
  }

  if (descuento !== null) {
    var totalElement = document.getElementById(mesaId + '-total');
    var total = parseFloat(totalElement.innerHTML.replace(/[^0-9.-]+/g, ''));

    if (total > 50) {
      var descuentoTotal = total * descuento / 100;
      total -= descuentoTotal;
      totalElement.innerHTML = '$' + total.toFixed(2);
      alert('Descuento aplicado: $' + descuentoTotal.toFixed(2));
    } else {
      alert('El total debe ser mayor a $50 para aplicar el descuento');
    }
  } else {
    alert('Código promocional inválido');
  }

  codigoInput.value = ''; // Limpiar el input del código promocional
}


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

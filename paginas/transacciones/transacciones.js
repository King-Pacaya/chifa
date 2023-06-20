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
  var transaccionesDiv = document.getElementById('transacciones');
  var contenidoTransacciones = '';

  // Obtener transacciones existentes del localStorage
  var transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];

  for (var i = 0; i < pedidosTableBody.rows.length; i++) {
    var row = pedidosTableBody.rows[i];
    var precio = parseFloat(row.cells[2].innerHTML);
    var cantidad = parseFloat(row.cells[0].innerHTML);
    total += precio * cantidad;
  }

  var totalElement = document.getElementById(mesaId + '-total');
  var total = parseFloat(totalElement.innerHTML.replace(/[^0-9.-]+/g, ''));

  if (tipoDocumento === 'boleta') {
    contenidoTransacciones += '<p class="title">Boleta de Venta Electrónica</p>';
    contenidoTransacciones += '<div class="info">';
  } else if (tipoDocumento === 'factura') {
    contenidoTransacciones += '<p class="title">Factura Electrónica</p>';
    contenidoTransacciones += '<div class="info">';
    contenidoTransacciones += '<p>RUC: ' + ruc + '</p>';
  }

  contenidoTransacciones += '<p>Camarero: ' + camarero + '</p>';
  contenidoTransacciones += '<p>Método de Pago: ' + metodoPago + '</p>';
  contenidoTransacciones += '<p>Fecha: ' + fecha + '</p>';
  contenidoTransacciones += '<p>Hora: ' + hora + '</p>';

  contenidoTransacciones += pedidosTable.outerHTML;

  contenidoTransacciones += '<p class="total">Precio Total: $' + total.toFixed(2) + '</p>';
  contenidoTransacciones += '</div>';

  // Agregar nueva transacción al arreglo
  transacciones.push(contenidoTransacciones);

  // Guardar arreglo de transacciones actualizado en el localStorage
  localStorage.setItem('transacciones', JSON.stringify(transacciones));

  // Generar contenido HTML para mostrar las transacciones y los botones de eliminación
  contenidoTransacciones = '';
  for (var j = 0; j < transacciones.length; j++) {
    contenidoTransacciones += '<div class="transaccion">';
    contenidoTransacciones += transacciones[j];
    contenidoTransacciones += '</div>';
  }

  transaccionesDiv.innerHTML = contenidoTransacciones;

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

window.onload = function() {
  var transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
  var transaccionesDiv = document.getElementById('transacciones');
  var contenidoTransacciones = '';

  for (var j = 0; j < transacciones.length; j++) {
    contenidoTransacciones += '<div class="transaccion">';
    contenidoTransacciones += transacciones[j];
    contenidoTransacciones += '<button class="eliminar-btn" onclick="eliminarTransaccion(' + j + ')">Eliminar</button>';
    contenidoTransacciones += '</div>';
  }

  transaccionesDiv.innerHTML = contenidoTransacciones;

  var password = prompt("Introduce la contraseña:");

  if (password !== "Klensexti2312") {
    window.stop(); // Detiene la carga de la página
    document.documentElement.innerHTML = ""; // Borra el contenido de la página
    alert("Contraseña incorrecta. La página no se cargará.");
  }
}

function eliminarTransaccion(index) {
  var transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];

  if (index >= 0 && index < transacciones.length) {
    transacciones.splice(index, 1);
    localStorage.setItem('transacciones', JSON.stringify(transacciones));

    var transaccionesDiv = document.getElementById('transacciones');
    var contenidoTransacciones = '';

    for (var j = 0; j < transacciones.length; j++) {
      contenidoTransacciones += '<div class="transaccion">';
      contenidoTransacciones += transacciones[j];
      contenidoTransacciones += '<button class="eliminar-btn" onclick="eliminarTransaccion(' + j + ')">Eliminar</button>';
      contenidoTransacciones += '</div>';
    }

    transaccionesDiv.innerHTML = contenidoTransacciones;
  }
}
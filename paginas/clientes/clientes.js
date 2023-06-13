// Obtener referencia al formulario y resultados
const clienteForm = document.getElementById('clienteForm');
const buscarInput = document.getElementById('buscarInput');
const buscarBtn = document.getElementById('buscarBtn');
const resultadosDiv = document.getElementById('resultados');

// Manejar el envío del formulario
clienteForm.addEventListener('submit', agregarCliente);

function agregarCliente(event) {
  event.preventDefault(); // Evitar el envío del formulario

  // Obtener valores de los campos de entrada
  const dni = document.getElementById('dni').value;
  const nombre = document.getElementById('nombre').value;
  const telefono = document.getElementById('telefono').value;

  // Crear un objeto de cliente
  const cliente = {
    dni,
    nombre,
    telefono
  };

  // Aquí puedes agregar el código para guardar el cliente en la base de datos

  // Limpiar los campos de entrada
  document.getElementById('dni').value = '';
  document.getElementById('nombre').value = '';
  document.getElementById('telefono').value = '';
}

// Manejar la búsqueda del cliente
buscarBtn.addEventListener('click', buscarCliente);

function buscarCliente() {
  const query = buscarInput.value.toLowerCase();

  // Aquí puedes agregar el código para buscar el cliente en la base de datos

  // Mostrar los resultados de búsqueda
  resultadosDiv.innerHTML = '<p>Resultados de búsqueda:</p>';
  // Aquí puedes agregar el código para mostrar los resultados encontrados
}

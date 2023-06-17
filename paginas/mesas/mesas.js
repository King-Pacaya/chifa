    function openModal(mesaId) {
      var modal = document.getElementById('modal-' + mesaId);
      modal.style.display = 'block';
    }

    function closeModal(mesaId) {
      var modal = document.getElementById('modal-' + mesaId);
      modal.style.display = 'none';
    }

// Variable para almacenar los platos agregados
var platosAgregados = [];

// Obtener referencias a los elementos del formulario
var formulario = document.getElementById('nuevo-plato-form');
var nombreInput = document.getElementById('nombre-plato-input');
var precioInput = document.getElementById('precio-plato-input');
var categoriaSelect = document.getElementById('categoria-plato-select');
var platosAgregadosList = document.getElementById('platos-agregados-list');

// Obtener los platos agregados del almacenamiento local al cargar la página
var platosAgregados = JSON.parse(localStorage.getItem('platosAgregados')) || [];

// Verificar si ya se agregaron los platos por defecto
var platosPorDefectoAgregados = localStorage.getItem('platosPorDefectoAgregados');

if (!platosPorDefectoAgregados) {
  // Agregar platos por defecto
  agregarPlatosPorDefecto();

  // Marcar los platos por defecto como agregados
  localStorage.setItem('platosPorDefectoAgregados', 'true');
} else {
  // Los platos por defecto ya se agregaron, cargar la lista desde el almacenamiento local
  actualizarPlatosAgregados();
}

// Agregar un evento de envío de formulario
formulario.addEventListener('submit', function (event) {
  event.preventDefault(); // Evitar el envío del formulario

  // Obtener los valores del formulario
  var nombre = nombreInput.value;
  var precio = parseFloat(precioInput.value);
  var categoria = categoriaSelect.value;

  // Validar que el nombre y el precio sean válidos
  if (nombre.trim() === '' || isNaN(precio)) {
    return; // Salir de la función si el nombre o el precio son inválidos
  }

  // Crear un objeto de plato
  var plato = {
    nombre: nombre,
    precio: precio,
    categoria: categoria
  };

  // Agregar el plato a la lista de platos agregados
  platosAgregados.push(plato);

  // Guardar los platos agregados en el almacenamiento local
  localStorage.setItem('platosAgregados', JSON.stringify(platosAgregados));

  // Actualizar la tabla de platos agregados
  actualizarPlatosAgregados();

  // Restablecer los valores del formulario
  nombreInput.value = '';
  precioInput.value = '';
});

// Función para agregar platos por defecto
function agregarPlatosPorDefecto() {
  var normalPorDefecto = [
    { nombre: 'Chaufa Con Pollo', precio: 12, categoria: 'Normal' },
    { nombre: 'Chaufa Con Res', precio: 14, categoria: 'Normal' },
    { nombre: 'Aeropuerto', precio: 14, categoria: 'Normal' },
    { nombre: 'Tallarín Saltado Con Pollo', precio: 14, categoria: 'Normal' },
    { nombre: 'Pollo Con Verdura Con Chaufa', precio: 15, categoria: 'Normal' },
    { nombre: 'Tallarín Saltado Con Chaufa', precio: 15, categoria: 'Normal' },
    { nombre: 'Lomo Saltado Con Pollo Y Chaufa', precio: 15, categoria: 'Normal' },
    { nombre: 'Tallarín Saltado Con Res', precio: 15, categoria: 'Normal' },
    { nombre: 'Lomo Saltado Con Res', precio: 15, categoria: 'Normal' },
    { nombre: 'Alitas Arrebozadas Con Chaufa', precio: 16, categoria: 'Normal' },
    { nombre: 'Chicharrón De Pollo Con Chaufa', precio: 16, categoria: 'Normal' },
    { nombre: 'Pollo Tamarindo Con Chaufa', precio: 16, categoria: 'Normal' },
    { nombre: 'Tortilla Con Chaufa', precio: 16, categoria: 'Normal' },
    { nombre: 'Kan Lung Wantan Con Chaufa', precio: 16, categoria: 'Normal' },
    { nombre: 'Ti Pa Kay Con Chaufa', precio: 17, categoria: 'Normal' },
    { nombre: 'Chi Jou Kay Con Chaufa', precio: 17, categoria: 'Normal' },
    { nombre: 'Pollo Enrollado Con Chaufa', precio: 17, categoria: 'Normal' },
    { nombre: 'Chancho Tamarindo Con Chaufa', precio: 17, categoria: 'Normal' },
    { nombre: 'Alitas Arrebozadas Con Verdura Y Chaufa', precio: 17, categoria: 'Normal' },
    { nombre: 'Pollo Enrollado Con Verdura Y Chaufa', precio: 17, categoria: 'Normal' },
    { nombre: 'Camarón Con Verdura Con Chaufa', precio: 17, categoria: 'Normal' },
    { nombre: 'Chancho Con Verdura Con Chaufa', precio: 17, categoria: 'Normal' },
    { nombre: 'Cho Jou Kay Con Verdura', precio: 17, categoria: 'Normal' },
    { nombre: 'Pollo Con Piña', precio: 17, categoria: 'Normal' },
  ];

  var tallarintostadoPorDefecto = [
    { nombre: 'Tallarín Tostado Simple', precio: 18, categoria: 'Tallarin Tostado' },
    { nombre: 'Tallarín Tostado Con Tomate', precio: 18, categoria: 'Tallarin Tostado' },
    { nombre: 'Tallarín Tostado De Gallina En Trozos Con Salsa De Ostión', precio: 20, categoria: 'Tallarin Tostado' },
    { nombre: 'Tallarín Tostado Con Chancho', precio: 22, categoria: 'Tallarin Tostado' },
    { nombre: 'Tallarín Tostado Con Pato', precio: 22, categoria: 'Tallarin Tostado' },
    { nombre: 'Tallarín Tostado Con Camarón', precio: 25, categoria: 'Tallarin Tostado' },
  ];

  var tallarinPorDefecto = [
    { nombre: 'Tallarín Con Gallina Simple', precio: 16, categoria: 'Tallarin' },
    { nombre: 'Tallarín Con Gallina Y Tomate', precio: 16, categoria: 'Tallarin' },
    { nombre: 'Tallarín Con Carne', precio: 18, categoria: 'Tallarin' },
    { nombre: 'Tallarín Con Pato Simple', precio: 18, categoria: 'Tallarin' },
    { nombre: 'Tallarín Especial', precio: 19, categoria: 'Tallarin' },
    { nombre: 'Tallarín De Gall. En Trozos Con Salsa De Ost.', precio: 20, categoria: 'Tallarin' },
    { nombre: 'Taypa Chico', precio: 20, categoria: 'Tallarin' },
    { nombre: 'Tallarín Con Chancho', precio: 20, categoria: 'Tallarin' },
    { nombre: 'Combinado Especial', precio: 20, categoria: 'Tallarin' },
    { nombre: 'Tallarín A La Plancha Simple', precio: 20, categoria: 'Tallarin' },
    { nombre: 'Taypa Chico Con Tallarin', precio: 22, categoria: 'Tallarin' },
    { nombre: 'Tallarín Con Camarón', precio: 22, categoria: 'Tallarin' },
    { nombre: 'Tallarín A La Plancha Especial', precio: 30, categoria: 'Tallarin' },
    { nombre: 'Taypa Especial', precio: 30, categoria: 'Tallarin' },
  ];

  var arrozchaufaPorDefecto = [
    { nombre: 'Porción De Arroz Blanco', precio: 3, categoria: 'Arroz Chaufa' },
    { nombre: 'Arroz Chaufa Simple', precio: 13, categoria: 'Arroz Chaufa' },
    { nombre: 'Aeropuerto Simple', precio: 14, categoria: 'Arroz Chaufa' },
    { nombre: 'Arroz Chaufa Con Chancho', precio: 15, categoria: 'Arroz Chaufa' },
    { nombre: 'Arroz Chaufa Con Carne', precio: 15, categoria: 'Arroz Chaufa' },
    { nombre: 'Arroz Chaufa Especial', precio: 16, categoria: 'Arroz Chaufa' },
    { nombre: 'Aeropuerto Especial', precio: 18, categoria: 'Arroz Chaufa' },
    { nombre: 'Arroz Chaufa Con Pato', precio: 20, categoria: 'Arroz Chaufa' },
    { nombre: 'Arroz Chaufa Con Langostino', precio: 20, categoria: 'Arroz Chaufa' },
    { nombre: 'Arroz Chaufa Con Samsí', precio: 22, categoria: 'Arroz Chaufa' },
  ];

  var fideochinoPorDefecto = [
    { nombre: 'Fideo Chino Con Gallina', precio: 20, categoria: 'Fideo Chino' },
    { nombre: 'Fideo Chino Con Chancho', precio: 22, categoria: 'Fideo Chino' },
    { nombre: 'Fideo Chino Con Pato', precio: 25, categoria: 'Fideo Chino' },
    { nombre: 'Fideo Chino Con Camarón', precio: 27, categoria: 'Fideo Chino' },
  ];

  var sopaPorDefecto = [
    { nombre: 'Sopa Wantan Simple', precio: 10, categoria: 'Sopas' },
    { nombre: 'Sopa Fuchi Fu  Simple', precio: 13, categoria: 'Sopas' },
    { nombre: '1/2 Porción De Alitas', precio: 14, categoria: 'Sopas' },
    { nombre: 'Sopa Wantan Especial', precio: 15, categoria: 'Sopas' },
    { nombre: 'Sopa Con Pato Simple', precio: 15, categoria: 'Sopas' },
    { nombre: 'Sopa Fuchi Fu Especial', precio: 16, categoria: 'Sopas' },
    { nombre: 'Sopa Zhong Hua', precio: 18, categoria: 'Sopas' },
    { nombre: 'Sopa Especial Con Huevo', precio: 20, categoria: 'Sopas' },
    { nombre: 'Sopa Con Camarón', precio: 20, categoria: 'Sopas' },
    { nombre: 'Sopa Con Pato Especial', precio: 20, categoria: 'Sopas' },
    { nombre: '1 Porción De Alitas', precio: 28, categoria: 'Sopas' },
  ];

  var gallinaPorDefecto = [
    { nombre: 'Gallina Con Verdura', precio: 17, categoria: 'Gallina' },
    { nombre: 'Gallina Con Tomate', precio: 17, categoria: 'Gallina' },
    { nombre: 'Gallina Con Picante', precio: 17, categoria: 'Gallina' },
    { nombre: 'Gallina Con Frijolito', precio: 17, categoria: 'Gallina' },
    { nombre: 'Gallina Con Kión', precio: 17, categoria: 'Gallina' },
    { nombre: 'Gallina Con Mensí', precio: 17, categoria: 'Gallina' },
    { nombre: 'Gallina Con Curry', precio: 17, categoria: 'Gallina' },
    { nombre: 'Gallina Con Piña Dulce', precio: 20, categoria: 'Gallina' },
    { nombre: 'Gallina Con Tamarindo Dulce', precio: 20, categoria: 'Gallina' },
    { nombre: 'Gallina Kay Tian Con Verdura', precio: 20, categoria: 'Gallina' },
    { nombre: 'Gallina Chi Jou Kay', precio: 20, categoria: 'Gallina' },
    { nombre: 'Gallina Con Salsa De Ostión', precio: 20, categoria: 'Gallina' },
    { nombre: 'Gallina Con Fruta Dulce', precio: 20, categoria: 'Gallina' },
    { nombre: 'Gallina Con  Bisteck Y Cebolla', precio: 20, categoria: 'Gallina' },
    { nombre: 'Gallina Con Chup Suy', precio: 22, categoria: 'Gallina' },
    { nombre: 'Gallina Con Samsí', precio: 22, categoria: 'Gallina' },
    { nombre: 'Gallina Ti Pa Kay Dulce', precio: 22, categoria: 'Gallina' },
    { nombre: 'Chicharrón De Gallina', precio: 25, categoria: 'Gallina' },
    { nombre: 'Gallina Con Espárrago Y Salsa De Ostión', precio: 25, categoria: 'Gallina' },
    { nombre: 'Gallina Con Espárrago Y Salsa Blanca', precio: 25, categoria: 'Gallina' },
    { nombre: 'Gallina Con Champiñon', precio: 25, categoria: 'Gallina' },
    { nombre: '1/2 Gallina Pache Kay', precio: 40, categoria: 'Gallina' },
    { nombre: '1 Gallina Pache Kay', precio: 80, categoria: 'Gallina' },
  ];

  var platospopularesPorDefecto = [
    { nombre: '1/2 Porción De Papa Frita', precio: 4, categoria: 'Platos Populares' },
    { nombre: '1 Porción De Papa Frita', precio: 8, categoria: 'Platos Populares' },
    { nombre: 'Caldo De Gallina A Vapor', precio: 13, categoria: 'Platos Populares' },
    { nombre: 'Sopa Fu Chi Fu Simple', precio: 13, categoria: 'Platos Populares' },
    { nombre: 'Arroz Chaufa Especial', precio: 16, categoria: 'Platos Populares' },
    { nombre: 'Tallarín Con Gallina', precio: 16, categoria: 'Platos Populares' },
    { nombre: 'Gallina Con Tamarindo Dulce', precio: 20, categoria: 'Platos Populares' },
    { nombre: 'Chancho Con Tamarindo Dulce', precio: 22, categoria: 'Platos Populares' },
  ];

  var patoPorDefecto = [
    { nombre: 'Pato Asado Solo', precio: 20, categoria: 'Pato' },
    { nombre: 'Pato Asado Con Verdura', precio: 20, categoria: 'Pato' },
    { nombre: 'Pato Asado Con Kión', precio: 20, categoria: 'Pato' },
    { nombre: 'Pato Asado Con Mensí', precio: 20, categoria: 'Pato' },
    { nombre: 'Pato Asado Con Tomate', precio: 20, categoria: 'Pato' },
    { nombre: 'Pato Asado Con Salsa De Ostión', precio: 22, categoria: 'Pato' },
    { nombre: 'Pato Asado Con Piña Dulce', precio: 25, categoria: 'Pato' },
    { nombre: 'Pato Asado Con Tamarindo Dulce', precio: 25, categoria: 'Pato' },
    { nombre: 'Pato Asado Con Fruta Dulce', precio: 25, categoria: 'Pato' },
    { nombre: 'Pato Asado Con Ajo', precio: 25, categoria: 'Pato' },
    { nombre: 'Pato Asado Con Champiñon', precio: 28, categoria: 'Pato' },
  ];

  var chanchoPorDefecto = [
    { nombre: '1/2 Porción De Wantan Frito', precio: 6, categoria: 'Chancho' },
    { nombre: '1 Porción De Wantan Frito', precio: 12, categoria: 'Chancho' },
    { nombre: 'Chancho Asado Solo', precio: 20, categoria: 'Chancho' },
    { nombre: 'Chancho Asado Con Mensí', precio: 20, categoria: 'Chancho' },
    { nombre: 'Chancho Con Kión', precio: 22, categoria: 'Chancho' },
    { nombre: 'Chancho Con Tomate', precio: 22, categoria: 'Chancho' },
    { nombre: 'Chancho Con Verdura Picante', precio: 22, categoria: 'Chancho' },
    { nombre: 'Chancho Asado Con Frijolito', precio: 22, categoria: 'Chancho' },
    { nombre: 'Chancho Con Verdura', precio: 22, categoria: 'Chancho' },
    { nombre: 'Chancho Asado Con Ostión', precio: 22, categoria: 'Chancho' },
    { nombre: 'Chancho Asado Con Tamarindo Dulce', precio: 25, categoria: 'Chancho' },
    { nombre: 'Chancho Con Piña Dulce', precio: 25, categoria: 'Chancho' },
    { nombre: 'Chancho Asado Con Ajo', precio: 25, categoria: 'Chancho' },
    { nombre: 'Wantan Lung Dulce', precio: 25, categoria: 'Chancho' },
    { nombre: 'Chancho Asado Con Champiñon', precio: 25, categoria: 'Chancho' },
  ];

  var langostinoPorDefecto = [
    { nombre: 'Langostino Con Tomate', precio: 25, categoria: 'Langostino' },
    { nombre: 'Langostino Con Verdura', precio: 25, categoria: 'Langostino' },
    { nombre: 'Langostino Con Verdura Picante', precio: 25, categoria: 'Langostino' },
    { nombre: 'Langostino Con Tamarindo Dulce', precio: 25, categoria: 'Langostino' },
    { nombre: 'Langostino Con Salsa De Ostión', precio: 25, categoria: 'Langostino' },
    { nombre: 'Langostino Con Mensí', precio: 25, categoria: 'Langostino' },
    { nombre: 'Langostino Con Kión', precio: 25, categoria: 'Langostino' },
    { nombre: 'Langostino Con Saltado Al Ajo', precio: 28, categoria: 'Langostino' },
    { nombre: 'Langostino Con Piña Dulce', precio: 28, categoria: 'Langostino' },
    { nombre: 'Langostino Con Champiñon', precio: 30, categoria: 'Langostino' },
    { nombre: 'Langostino Con Fruta Dulce', precio: 30, categoria: 'Langostino' },
  ];

  var platosespecialesPorDefecto = [
    { nombre: 'Lomo De Gallina', precio: 25, categoria: 'Platos Especiales' },
    { nombre: 'Gallina Limón Kay', precio: 25, categoria: 'Platos Especiales' },
    { nombre: 'Champiñon Con Verdura', precio: 25, categoria: 'Platos Especiales' },
    { nombre: 'Choy Pi Kay Con Yuyo', precio: 25, categoria: 'Platos Especiales' },
    { nombre: 'Choy Pi Kay Con Champiñon', precio: 30, categoria: 'Platos Especiales' },
  ];

  var caldosPorDefecto = [
    { nombre: 'Caldo De Kión Con Fideo Chino Simple', precio: 14, categoria: 'Caldos' },
    { nombre: 'Caldo De Kión Con Tallarín', precio: 13, categoria: 'Caldos' },
    { nombre: 'Caldo A Vapor Con Tallarín', precio: 13, categoria: 'Caldos' },
    { nombre: 'Caldo A Vapor Con Wantan', precio: 13, categoria: 'Caldos' },
    { nombre: 'Caldo De Gallina A Vapor', precio: 13, categoria: 'Caldos' },
    { nombre: 'Caldo Especial Con Wantan', precio: 13, categoria: 'Caldos' },
    { nombre: 'Caldo A Vapor Con Fideo Chino', precio: 14, categoria: 'Caldos' },
    { nombre: 'Caldo De Gallina Con Kión', precio: 14, categoria: 'Caldos' },
    { nombre: 'Caldo De Gallina Con Verdura', precio: 14, categoria: 'Caldos' },
    { nombre: 'Caldo Especial', precio: 18, categoria: 'Caldos' },
    { nombre: 'Caldo Especial Con Tallarín', precio: 18, categoria: 'Caldos' },
    { nombre: 'Caldo Especial Con Fideo Chino', precio: 20, categoria: 'Caldos' },
  ];

  var tortilladoPorDefecto = [
    { nombre: 'Tortilla Con Gallina', precio: 17, categoria: 'Tortillado' },
    { nombre: 'Tortilla Con Chancho', precio: 20, categoria: 'Tortillado' },
    { nombre: 'Tortilla Con Camarón', precio: 25, categoria: 'Tortillado' },
    { nombre: 'Tortilla Especial', precio: 25, categoria: 'Tortillado' },
  ];

  var familiarPorDefecto = [
    { nombre: 'Sopa Wantan Simple', precio: 36, categoria: 'Familiar' },
    { nombre: 'Chaufa Simple', precio: 44, categoria: 'Familiar' },
    { nombre: 'Chaufa Especial', precio: 48, categoria: 'Familiar' },
    { nombre: 'Sopa Wantan Especial', precio: 52, categoria: 'Familiar' },
    { nombre: 'Twantan Kan Lung', precio: 80, categoria: 'Familiar' },
  ];

  var resPorDefecto = [
    { nombre: 'Chaufa De Carne', precio: 14, categoria: 'Res' },
    { nombre: 'Tallarín Con Carne', precio: 16, categoria: 'Res' },
    { nombre: 'Carne Con Verdura', precio: 17, categoria: 'Res' },
    { nombre: 'Lomo Saltado Simple', precio: 18, categoria: 'Res' },
    { nombre: 'Carne Con Frijolito', precio: 20, categoria: 'Res' },
    { nombre: 'Carne Con Fansi (Fideo Chino)', precio: 20, categoria: 'Res' },
    { nombre: 'Carne Con Champiñones', precio: 22, categoria: 'Res' },
    { nombre: 'Carne Con Yuyo', precio: 22, categoria: 'Res' },
  ];

  var pescadoPorDefecto = [
    { nombre: 'Doncella Con Verdura', precio: 20, categoria: 'Pescado' },
    { nombre: 'Doncella Con Fansi', precio: 22, categoria: 'Pescado' },
    { nombre: 'Doncella Con Tamarindo Dulce', precio: 22, categoria: 'Pescado' },
    { nombre: 'Doncella Con Fruta Dulce', precio: 22, categoria: 'Pescado' },
    { nombre: 'Doncella Con Champiñones Y Huevo De Codorniz', precio: 25, categoria: 'Pescado' },
  ];

  var bebidasPorDefecto = [
    { nombre: 'Jarra De Refresco', precio: 10, categoria: 'Bebidas' },
    { nombre: 'Gordita', precio: 6, categoria: 'Bebidas' },
    { nombre: 'Gaseosa 1L', precio: 10, categoria: 'Bebidas' },
    { nombre: 'Vaso De Refresco', precio: 3, categoria: 'Bebidas' },
    { nombre: 'Gaseosa 2L', precio: 14, categoria: 'Bebidas' },
    { nombre: 'Gaseosa 1.5L', precio: 12, categoria: 'Bebidas' },
    { nombre: 'Gaseosa Personal Descartable', precio: 4, categoria: 'Bebidas' },
    { nombre: 'Gaseosa Personal Vidrio', precio: 3, categoria: 'Bebidas' },
    { nombre: 'Gaseosa 2.5L', precio: 16, categoria: 'Bebidas' },
    { nombre: 'Agua San Luis', precio: 4, categoria: 'Bebidas' },
    { nombre: 'Agua Benedicto', precio: 3, categoria: 'Bebidas' },
  ];

  // Agregar platos por defecto a la lista de platos agregados
  platosAgregados.push(...normalPorDefecto);
  platosAgregados.push(...tallarintostadoPorDefecto);
  platosAgregados.push(...tallarinPorDefecto);
  platosAgregados.push(...arrozchaufaPorDefecto);
  platosAgregados.push(...fideochinoPorDefecto);
  platosAgregados.push(...sopaPorDefecto);
  platosAgregados.push(...gallinaPorDefecto);
  platosAgregados.push(...platospopularesPorDefecto);
  platosAgregados.push(...patoPorDefecto);
  platosAgregados.push(...chanchoPorDefecto);
  platosAgregados.push(...langostinoPorDefecto);
  platosAgregados.push(...platosespecialesPorDefecto);
  platosAgregados.push(...caldosPorDefecto);
  platosAgregados.push(...tortilladoPorDefecto);
  platosAgregados.push(...familiarPorDefecto);
  platosAgregados.push(...resPorDefecto);
  platosAgregados.push(...pescadoPorDefecto);
  platosAgregados.push(...bebidasPorDefecto);

  // Guardar los platos agregados en el almacenamiento local
  localStorage.setItem('platosAgregados', JSON.stringify(platosAgregados));

  // Actualizar la tabla de platos agregados
  actualizarPlatosAgregados();
}

// Función para actualizar la tabla de platos agregados
function actualizarPlatosAgregados() {
  // Limpiar la lista de platos agregados
  platosAgregadosList.innerHTML = '';

  // Agrupar los platos por categoría
  var platosPorCategoria = {};
  for (var i = 0; i < platosAgregados.length; i++) {
    var plato = platosAgregados[i];
    if (!platosPorCategoria.hasOwnProperty(plato.categoria)) {
      platosPorCategoria[plato.categoria] = [];
    }
    platosPorCategoria[plato.categoria].push(plato);
  }

  // Recorrer las categorías y los platos correspondientes
  for (var categoria in platosPorCategoria) {
    if (platosPorCategoria.hasOwnProperty(categoria)) {
      // Crear una fila de categoría en la tabla
      var categoriaRow = document.createElement('tr');
      categoriaRow.classList.add('categoria-row');
      var categoriaTd = document.createElement('td');
      categoriaTd.classList.add('categoria-td');
      categoriaTd.colSpan = 3;
      categoriaTd.textContent = categoria;
      categoriaRow.appendChild(categoriaTd);
      platosAgregadosList.appendChild(categoriaRow);

      var platosCategoria = platosPorCategoria[categoria];

      // Recorrer los platos de la categoría y crear una fila para cada plato
      for (var j = 0; j < platosCategoria.length; j++) {
        var plato = platosCategoria[j];

        // Verificar si el plato tiene nombre y precio válidos
        if (plato.nombre.trim() === '' || isNaN(plato.precio)) {
          continue; // Pasar al siguiente plato si el nombre o el precio son inválidos
        }

        // Crear la fila del plato
        var tr = document.createElement('tr');

        var nombreTd = document.createElement('td');
        nombreTd.textContent = plato.nombre;

        var precioTd = document.createElement('td');
        precioTd.textContent = '$' + plato.precio.toFixed(2);

        var eliminarTd = document.createElement('td');
        var eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.addEventListener('click', crearEliminarPlatoHandler(plato));
        eliminarTd.appendChild(eliminarBtn);

        tr.appendChild(nombreTd);
        tr.appendChild(precioTd);
        tr.appendChild(eliminarTd);

        // Agregar la fila del plato a la tabla
        platosAgregadosList.appendChild(tr);
      }
    }
  }
}

// Función para crear un controlador de evento para eliminar un plato
function crearEliminarPlatoHandler(plato) {
  return function () {
    // Encontrar el índice del plato en la lista de platos agregados
    var indice = platosAgregados.indexOf(plato);
    if (indice !== -1) {
      // Eliminar el plato de la lista
      platosAgregados.splice(indice, 1);

      // Guardar los platos agregados actualizados en el almacenamiento local
      localStorage.setItem('platosAgregados', JSON.stringify(platosAgregados));

      // Actualizar la tabla de platos agregados
      actualizarPlatosAgregados();
    }
  };
}

// Función para actualizar los elementos <select> de cada mesa con los platos agregados
function actualizarPlatosSelect() {
  var mesas = ['mesa1', 'mesa2', 'mesa3', 'mesa4', 'mesa5', 'mesa6', 'mesa7', 'mesa8', 'mesa9', 'mesa10', 'mesa11',
   'mesa12', 'mesa13', 'mesa14',]; // Agrega aquí más nombres de mesas si es necesario

  for (var i = 0; i < mesas.length; i++) {
    var mesa = mesas[i];
    var platoSelect = document.getElementById('plato-' + mesa);

    // Limpiar las opciones actuales del elemento <select>
    platoSelect.innerHTML = '';

    // Crear la opción predeterminada
    var defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Seleccione un plato';
    platoSelect.appendChild(defaultOption);

    // Agregar las opciones de los platos agregados
    for (var j = 0; j < platosAgregados.length; j++) {
      var plato = platosAgregados[j];

      // Verificar si el plato tiene nombre y precio válidos
      if (plato.nombre.trim() !== '' && !isNaN(plato.precio)) {
        var option = document.createElement('option');
        option.value = plato.precio; // Agregar el precio como valor
        option.textContent = plato.nombre + ' $' + plato.precio.toFixed(2); // Mostrar nombre y precio
        platoSelect.appendChild(option);
      }
    }
  }
}

// Llama a la función para actualizar los elementos <select> al cargar la página
actualizarPlatosSelect();

// Función para crear el controlador de eventos para eliminar un plato
function crearEliminarPlatoHandler(plato) {
  return function () {
    // Buscar el índice del plato en la lista de platos agregados
    var index = platosAgregados.indexOf(plato);
    if (index !== -1) {
      // Eliminar el plato de la lista
      platosAgregados.splice(index, 1);

      // Guardar los platos agregados en el almacenamiento local
      localStorage.setItem('platosAgregados', JSON.stringify(platosAgregados));

      // Actualizar la tabla de platos agregados
      actualizarPlatosAgregados();
    }
  };
}

// Llamar a la función `actualizarPlatosAgregados` para cargar la tabla al cargar la página
actualizarPlatosAgregados();

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
  var restauranteNombre = "Chifa Restaurant Wonchoe";
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
  var tipoDescuento = null;

  // Buscar el descuento y el tipo del código promocional en la lista de códigos guardados
  for (var i = 0; i < codigosGuardados.length; i++) {
    if (codigosGuardados[i].codigo === codigo) {
      descuento = codigosGuardados[i].descuento;
      tipoDescuento = codigosGuardados[i].tipo;
      break;
    }
  }

  if (descuento !== null && tipoDescuento !== null) {
    var totalElement = document.getElementById(mesaId + '-total');
    var total = parseFloat(totalElement.innerHTML.replace(/[^0-9.-]+/g, ''));

    if (total > 50) {
      if (tipoDescuento === 'porcentaje') {
        var descuentoTotal = total * descuento;
        total -= descuentoTotal;
      } else if (tipoDescuento === 'cantidad') {
        total -= descuento;
        alert('Descuento aplicado: $' + descuento);
      }

      totalElement.innerHTML = '$' + total.toFixed(2);
      alert('Descuento aplicado: %' + descuento * 100);
    } else {
      alert('El total debe ser mayor a $50 para aplicar el descuento');
    }
  } else {
    alert('Código promocional inválido');
  }

  codigoInput.value = ''; // Limpiar el input del código promocional
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
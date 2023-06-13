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
      categoriaTd.id = categoria.toLowerCase(); // Usar el nombre de la categoría en minúsculas como ID
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
// Función para cambiar de pestaña
function changeTab(evt, tabName) {
  // Ocultar todos los contenidos de las pestañas
  var tabContent = document.getElementsByClassName("tab");
  for (var i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }
  
  // Eliminar la clase "active" de todos los botones
  var tabLinks = document.getElementsByClassName("tab-link");
  for (var i = 0; i < tabLinks.length; i++) {
    tabLinks[i].classList.remove("active");
  }
  
  // Mostrar el contenido de la pestaña seleccionada y marcarla como activa
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("active");
}

// Establecer la pestaña de Insumos como activa por defecto
var defaultTab = document.getElementById("insumos");
var defaultTabLink = document.getElementsByClassName("tab-link")[0];
if (defaultTab && defaultTabLink) {
  defaultTab.style.display = "block";
  defaultTabLink.classList.add("active");
}

// Obtén todos los botones de categoría
var categoryButtons = document.querySelectorAll('.tab-link');

// Agrega un event listener a cada botón de categoría
categoryButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    // Elimina la clase 'active' de todos los botones
    categoryButtons.forEach(function(btn) {
      btn.classList.remove('active');
    });

    // Agrega la clase 'active' al botón seleccionado
    button.classList.add('active');

    // Cargar los productos de la categoría seleccionada
    cargarProductos(button.getAttribute('data-category'));
  });
});

// Obtener referencias a los elementos del DOM
var formProducto = document.querySelectorAll('.form-producto');
var listaProductos = document.querySelectorAll('.lista-productos');

// Agregar evento de envío del formulario a cada formulario de producto
formProducto.forEach(function(form) {
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    // Obtener los valores del formulario
    var nombre = form.querySelector('.nombre-producto').value;
    var cantidad = form.querySelector('.cantidad-producto').value;
    var imagenInput = form.querySelector('.imagen-producto');
    var imagen = imagenInput.files.length > 0 ? imagenInput.files[0] : null;

    // Obtener la categoría del producto
    var categoria = form.getAttribute('data-category');

    // Obtener la lista de productos existente o crear una nueva lista vacía
    var productos = JSON.parse(localStorage.getItem(categoria)) || [];

    // Crear un objeto de producto
    var producto = {
      nombre: nombre,
      cantidad: cantidad,
      imagen: null, // Dejarlo como null por defecto
    };

    if (imagen) {
      // Se ha seleccionado una imagen, leer el contenido del archivo como Base64
      var reader = new FileReader();
      reader.addEventListener('load', function() {
        producto.imagen = reader.result; // Guardar la imagen como Base64
        // Agregar el nuevo producto a la lista
        productos.push(producto);
        // Guardar la lista de productos en el almacenamiento local
        localStorage.setItem(categoria, JSON.stringify(productos));
        // Actualizar la lista de productos en la interfaz
        cargarProductos(categoria);
        // Restablecer los valores del formulario
        form.reset();
      });
      reader.readAsDataURL(imagen);
    } else {
      // No se ha seleccionado una imagen, asignar una imagen predeterminada
      producto.imagen = '../../multimedia/favicon.png';
      // Agregar el nuevo producto a la lista
      productos.push(producto);
      // Guardar la lista de productos en el almacenamiento local
      localStorage.setItem(categoria, JSON.stringify(productos));
      // Actualizar la lista de productos en la interfaz
      cargarProductos(categoria);
      // Restablecer los valores del formulario
      form.reset();
    }
  });
});

function cargarProductos() {
  var categorias = ['insumos', 'utensilios', 'bebidas', 'perdidas', 'extras'];

  categorias.forEach(function(categoria) {
    var productos = JSON.parse(localStorage.getItem(categoria)) || [];
    var lista = document.querySelector('#' + categoria + ' .lista-productos');

    if (lista) {
      lista.innerHTML = '';

      productos.forEach(function(producto) {
        var div = document.createElement('div');
        var spanNombre = document.createElement('span');
        var img = document.createElement('img');
        var spanCantidad = document.createElement('span');
        var inputCantidad = document.createElement('input');
        var buttonEliminar = document.createElement('button');

        div.classList.add('producto');
        spanNombre.textContent = producto.nombre;
        spanNombre.classList.add('producto-nombre');

        if (producto.imagen) {
          img.src = producto.imagen;
        } else {
          img.src = '../../multimedia/favicon.png';
        }

        inputCantidad.type = 'number';
        inputCantidad.value = producto.cantidad;
        inputCantidad.classList.add('producto-cantidad');
        inputCantidad.addEventListener('input', function() {
          producto.cantidad = inputCantidad.value;
          actualizarProductoEnLocalStorage(categoria, productos);
        });

        spanCantidad.textContent = 'Cantidad: ';
        spanCantidad.classList.add('producto-cantidad');

        buttonEliminar.textContent = 'Eliminar';

        buttonEliminar.addEventListener('click', function() {
          eliminarProducto(categoria, producto);
        });

        div.appendChild(spanNombre);
        div.appendChild(img);
        div.appendChild(spanCantidad);
        div.appendChild(inputCantidad);
        div.appendChild(buttonEliminar);

        lista.appendChild(div);
      });
    }
  });
}


// Función para actualizar el producto en el almacenamiento local
function actualizarProductoEnLocalStorage(categoria, productos) {
  localStorage.setItem(categoria, JSON.stringify(productos));
}

// Eliminar un producto de una categoría
function eliminarProducto(categoria, producto) {
  var productos = JSON.parse(localStorage.getItem(categoria)) || [];

  // Buscar el índice del producto en la lista
  var index = productos.findIndex(function(p) {
    return p.nombre === producto.nombre && p.cantidad === producto.cantidad && p.imagen === producto.imagen;
  });

  // Eliminar el producto de la lista
  if (index !== -1) {
    productos.splice(index, 1);
    localStorage.setItem(categoria, JSON.stringify(productos));
    cargarProductos(); // Actualizar la lista de productos en la interfaz
  }
}

cargarProductos();
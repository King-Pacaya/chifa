    var promociones = {
      "PROMO1": 0.1,  // Descuento del 10% para la mesa 1
      "PROMO2": 0.2,  // Descuento del 20% para la mesa 2
      // Agrega más códigos promocionales y sus descuentos aquí
    };

function guardarCodigoPromocional() {
  var codigoInput = document.getElementById('nuevo-codigo-promocional');
  var descuentoInput = document.getElementById('nuevo-descuento-promocional');
  var codigo = codigoInput.value.toUpperCase();
  var descuento = parseFloat(descuentoInput.value);

  if (codigo.trim() !== '' && !isNaN(descuento) && descuento >= 0 && descuento <= 100) {
    promociones[codigo] = descuento;
    var codigosGuardados = JSON.parse(localStorage.getItem('codigosPromocionales')) || [];
    codigosGuardados.push({ codigo: codigo, descuento: descuento });
    localStorage.setItem('codigosPromocionales', JSON.stringify(codigosGuardados));

    // Actualizar la lista de códigos promocionales guardados
    mostrarCodigosGuardados();

        codigoInput.value = ''; // Limpiar el input del código promocional
    descuentoInput.value = ''; // Limpiar el input del descuento promocional
  } else {
    alert('Ingrese un código promocional válido y un descuento entre 0 y 100');
  }
}

function mostrarCodigosGuardados() {
  var codigosGuardados = JSON.parse(localStorage.getItem('codigosPromocionales')) || [];
  var listaCodigos = document.getElementById('codigos-guardados');
  listaCodigos.innerHTML = '';

  for (var i = 0; i < codigosGuardados.length; i++) {
    var codigo = codigosGuardados[i].codigo;
    var descuento = codigosGuardados[i].descuento;

    var li = document.createElement('li');
    var spanCodigo = document.createElement('span');
    spanCodigo.classList.add('codigo-promocional');
    spanCodigo.innerHTML = 'Código Promocional: <span class="codigo">' + codigo + '</span>';
    li.appendChild(spanCodigo);

    var spanDescuento = document.createElement('span');
    spanDescuento.classList.add('descuento');
    spanDescuento.innerHTML = ' Descuento: <span class="porcentaje-descuento">' + descuento + '%</span> ';
    li.appendChild(spanDescuento);

    var botonEliminar = document.createElement('button');
    botonEliminar.classList.add('eliminar');
    botonEliminar.innerHTML = 'Eliminar';
    botonEliminar.dataset.codigo = codigo; // Agregar atributo de datos para guardar el código promocional
    botonEliminar.addEventListener('click', function() {
      var codigo = this.dataset.codigo;
      eliminarCodigoPromocional(codigo);
    });
    li.appendChild(botonEliminar);

    listaCodigos.appendChild(li);
  }
}

// Llamar a la función mostrarCodigosGuardados al cargar la página
mostrarCodigosGuardados();



function eliminarCodigoPromocional(codigo) {
  var codigosGuardados = JSON.parse(localStorage.getItem('codigosPromocionales')) || [];
  var indice = -1;

  // Buscar el índice del código promocional en la lista
  for (var i = 0; i < codigosGuardados.length; i++) {
    if (codigosGuardados[i].codigo === codigo) {
      indice = i;
      break;
    }
  }

  if (indice !== -1) {
    // Remover el código promocional de la lista
    codigosGuardados.splice(indice, 1);
    localStorage.setItem('codigosPromocionales', JSON.stringify(codigosGuardados));

    // Actualizar la lista de códigos promocionales guardados
    mostrarCodigosGuardados();
  }
}
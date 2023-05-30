    // Obtener el modo actual almacenado en el localStorage
    const currentMode = localStorage.getItem("mode");

    // Configurar el modo inicial
    if (currentMode) {
      document.body.classList.add(currentMode);
      updateModeButton(currentMode);
    } else {
      changeMode("light-mode");
    }

    // Cambiar el modo
    function changeMode(selectedMode) {
      // Remover cualquier modo actual
      document.body.classList.remove("light-mode", "dark-mode");

      // Aplicar el nuevo modo seleccionado
      document.body.classList.add(selectedMode);

      // Guardar el modo seleccionado en el localStorage
      localStorage.setItem("mode", selectedMode);

      // Actualizar el texto del botón
      updateModeButton(selectedMode);
    }

    // Alternar entre Modo Claro y Modo Oscuro
    function toggleMode() {
      const currentMode = localStorage.getItem("mode");
      if (currentMode === "light-mode") {
        changeMode("dark-mode");
      } else {
        changeMode("light-mode");
      }
    }

    // Actualizar el texto del botón según el modo actual
    function updateModeButton(currentMode) {
      const modeButton = document.getElementById("mode-button");
      if (currentMode === "light-mode") {
        modeButton.textContent = "Modo Oscuro";
      } else {
        modeButton.textContent = "Modo Claro";
      }
    }
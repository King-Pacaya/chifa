    // Validación de inicio de sesión
    document.getElementById("login-form").addEventListener("submit", function(event) {
      event.preventDefault();
      var password = document.getElementById("password-input").value;

      // Obtener la contraseña almacenada en el localStorage
      var savedPassword = localStorage.getItem("password");
      var loggedIn = localStorage.getItem("loggedIn");

      if (loggedIn === "true" && password === savedPassword) {
        // El usuario ha iniciado sesión previamente y la contraseña es correcta
        window.location.href = "paginas/mesas/mesas.html";
      } else if (loggedIn !== "true" && password === savedPassword) {
        // Contraseña por defecto, se permite el acceso
        localStorage.setItem("loggedIn", "true");
        window.location.href = "paginas/mesas/mesas.html";
      } else {
        // Contraseña incorrecta o no se ha iniciado sesión previamente
        alert("Contraseña incorrecta");
      }
    });

    // Comprobar si la contraseña por defecto está almacenada en el localStorage
    var defaultPassword = "Klensexti";
    var savedPassword = localStorage.getItem("password");

    if (!savedPassword) {
      // La contraseña por defecto no está almacenada, guardarla en el localStorage
      localStorage.setItem("password", defaultPassword);
    }
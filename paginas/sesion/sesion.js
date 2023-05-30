document.getElementById("change-password-form").addEventListener("submit", function(event) {
  event.preventDefault();
  var newPassword = document.getElementById("new-password-input").value;

  // Guardar la nueva contraseña en el localStorage
  localStorage.setItem("password", newPassword);

  // Cambiar el estado de inicio de sesión a "false"
  localStorage.setItem("loggedIn", "false");

  alert("Contraseña cambiada exitosamente");
  window.location.href = "../../login.html";
});
// Verificar si se ha cerrado sesión
var loggedIn = localStorage.getItem("loggedIn");
if (loggedIn === "false") {
  // Redireccionar al login si se ha cerrado sesión
  window.location.href = "../../login.html";
}
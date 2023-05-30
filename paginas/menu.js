    function toggleMenu() {
      document.getElementById("menu").classList.toggle("open");
      document.getElementById("menu-toggle-button").classList.toggle("open");
    }

    function cerrarSesion() {
      localStorage.setItem("loggedIn", "false");
      window.location.href = "login.html";
    }

    var currentPage = window.location.pathname.split("/").pop();
    var menuLinks = document.querySelectorAll("#menu a");

    for (var i = 0; i < menuLinks.length; i++) {
      var link = menuLinks[i];
      if (link.getAttribute("href") === currentPage) {
        link.parentNode.classList.add("current-page");
      }
    }
window.onload = function() {
  let username = localStorage.getItem('username');
  if (username) {
      document.getElementById('username').textContent = `Bienvenido, ${username}!`;
  } else {
      document.getElementById('username').textContent = 'Bienvenido!';
  }
};


//para cerrar sesion e ingresar como otro jugador
function CerrarSesion(){
  localStorage.removeItem('username');
  window.location.href = "index.html"
}


//abre los html de los juegos
function JuegoMemoria(){
  window.location.href = "Memoria.html";
}

function JuegoAdivinar(){
  window.location.href = "Adivinanzas.html";
}

function JuegoBuscaMinas(){
  window.location.href = "BuscaMinas.html";
}

//para el modal de alerta
let alerta = document.getElementById("alerta");

function abrirAlerta(){
  alerta.style.display = ("block")
}

function cerrarModal(){
  alerta.style.display = "none";
}

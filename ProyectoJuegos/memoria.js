//modal para salir o continuar 
function abrirModalSalir() {
  document.getElementById("modalSalir").style.display = "block";
}

function salir() {
  window.location.href = "elegirJuego.html";
}

function continuar() {
  document.getElementById("modalSalir").style.display = "none";
}

//modal para elegir el modo 
var facil, dificil, figuras, numero;
var modal = document.getElementById("dificultadModal");
var modalModo = document.getElementById("modoModal");

function abrirModal() {
  modal.style.display = "block";
}

window.onload = abrirModal;

function abrirModalModo() {
  modalModo.style.display = "block";
}


//se selecciona el modo y dificultad con los botones del modal
function elegirDificultad(dificultad) {
  if (dificultad === 'facil') {
    modal.style.display = "none";
    abrirModalModo();
    facil = 1;
  } else if (dificultad === 'dificil') {
    modal.style.display = "none";
    abrirModalModo();
    dificil = 1;
  }
}

function elegirModo(modo) {
  if (modo === 'figuras') {
    modalModo.style.display = "none";
    figuras = 1;
  } else if (modo === 'numero') {
    modalModo.style.display = "none";
    numero = 1;
  }
  irJuego();
}
//para cambiar de modo desde el juego 
var btnCambio = document.getElementById("cambiarDificultad");
function abrirModalCambio() {
  btnCambio.style.display = "block";
}

function cambiarDificultad(dificultad) {
  if (dificultad === 'facil') {
    btnCambio.style.display = "none";
    abrirModalModo();
    facil = 1;
  } else if (dificultad === 'dificil') {
    btnCambio.style.display = "none";
    abrirModalModo();
    dificil = 1;
  }
}

//va al modo de juego y dificultad seleccionada
function irJuego() {
  if (figuras === 1) {
    if (facil === 1) {
      window.location.href = "MfacilFiguras.html";
    } else if (dificil === 1) {
      window.location.href = "MdificilFiguras.html";
    }
  } else if (numero === 1) {
    if (facil === 1) {
      window.location.href = "MfacilNumeros.html";
    } else if (dificil === 1) {
      window.location.href = "MdificilNumeros.html";
    }
  }
}

//variables globales del juego
let tarjetasMostradas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let temporizador = false;
let contadorMovimientos = 0;
let primerResultado = null;
let segundoResultado = null;
let aciertos = 0;
let timerFacil = 40;
let timerDificil = 80;
let tiempovoid = null;
let derrotas = 0;
let victorias = 0;

let contadorVictorias = document.getElementById("victorias");
let contadorDerrotas = document.getElementById("derrotas");
let contadorAciertos = document.getElementById("aciertos");
let cuentaRondas = document.getElementById("rondas");
let mostrarTiempo = document.getElementById("tiempo");


//juego numeros en facil 4*4 ------------------------------------------------------------------------
let numerosFacil = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numerosFacil = numerosFacil.sort(() => { return Math.random() - 0.5 });

function mostrar(id) {
  if (temporizador == false) {//activa el tiempo
    contarTiempoFacil();
    temporizador = true;
  }
  tarjetasMostradas++;
  if (tarjetasMostradas == 1) {//para la primera tarjeta seleccionada
    tarjeta1 = document.getElementById(id);
    primerResultado = numerosFacil[id];
    tarjeta1.innerHTML = primerResultado;
    tarjeta1.disabled = true;
  } else if (tarjetasMostradas == 2) {//para la segunda tarjeta seleccionada
    tarjeta2 = document.getElementById(id);
    segundoResultado = numerosFacil[id];
    tarjeta2.innerHTML = segundoResultado;
    tarjeta2.disabled = true;
    contadorMovimientos++;
    cuentaRondas.innerHTML = `Movimientos: ${contadorMovimientos}`;
    if (primerResultado == segundoResultado) {//se acerto la pareja
      tarjetasMostradas = 0;
      aciertos++;
      contadorAciertos.innerHTML = `Aciertos: ${aciertos}`;
      if (aciertos == 8) {//se gano el juego
        clearInterval(tiempovoid)
        abrirModalVictoria();
        victorias++;
        actualizarVictorias();
        guardarEstadisticasUsuario();
      }
    } else {//se fallo el acierto se vuelven las cartas
      setTimeout(() => {
        tarjeta1.innerHTML = ' ';
        tarjeta2.innerHTML = ' ';
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasMostradas = 0;
      }, 1000)
    }
  }
}

//timer facil numeros
function contarTiempoFacil() {
  tiempovoid = setInterval(() => {
    timerFacil--;
    mostrarTiempo.innerHTML = `Tiempo: ${timerFacil} segundos`;
    if (timerFacil == 0) {
      clearInterval(tiempovoid);
      abrirModalDerrota();
      bloquearTarjetas();
      derrotas++;
      actualizarDerrotas();
      guardarEstadisticasUsuario();
    }
  }, 1000)
}

//bloqueo facil numeros
function bloquearTarjetas() {
  for (let i = 0; i <= 15; i++) {
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = numerosFacil[i];
    tarjetaBloqueada.disabled = true;
  }
}


//juego numeros dificil 8*8 ---------------------------------------------------------------
let numerosDificil = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17];
numerosDificil = numerosDificil.sort(() => { return Math.random() - 0.5 });

function mostrarDificil(id) {
  if (temporizador == false) {//se activa el tiempo
    contarTiempoDificil();
    temporizador = true;
  }
  tarjetasMostradas++;
  if (tarjetasMostradas == 1) {//para la primera tarjeta seleccionada
    tarjeta1 = document.getElementById(id);
    primerResultado = numerosDificil[id];
    tarjeta1.innerHTML = primerResultado;
    tarjeta1.disabled = true;
  } else if (tarjetasMostradas == 2) {//para la segunda tarjeta seleccionada
    tarjeta2 = document.getElementById(id);
    segundoResultado = numerosDificil[id];
    tarjeta2.innerHTML = segundoResultado;
    tarjeta2.disabled = true;
    contadorMovimientos++;
    cuentaRondas.innerHTML = `Movimientos: ${contadorMovimientos}`;
    if (primerResultado == segundoResultado) {//se acerto la pareja
      tarjetasMostradas = 0;
      aciertos++;
      contadorAciertos.innerHTML = `Aciertos: ${aciertos}`;
      if (aciertos == 18) {//se gano
        clearInterval(tiempovoid)
        abrirModalVictoria();
        victorias++;
        actualizarVictorias();
        //mostrar animacion de victoria
      }
    } else {//si se fallo se vuelven las cartas
      setTimeout(() => {
        tarjeta1.innerHTML = ' ';
        tarjeta2.innerHTML = ' ';
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasMostradas = 0;
      }, 1000)


    }
  }
}

//timer dificil numeros
function contarTiempoDificil() {
  tiempovoid = setInterval(() => {
    timerDificil--;
    mostrarTiempo.innerHTML = `Tiempo: ${timerDificil} segundos`;
    if (timerDificil == 0) {
      clearInterval(tiempovoid);
      abrirModalDerrota();
      bloquearTarjetasDificil();
      derrotas++;
      actualizarDerrotas();
      guardarEstadisticasUsuario();
    }
  }, 1000)
}

//bloqueo numeros dificil
function bloquearTarjetasDificil() {
  for (let i = 0; i <= 35; i++) {
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = numerosDificil[i];
    tarjetaBloqueada.disabled = true;
  }
}


//juego figuras facil 4*4 ------------------------------------------------------------------
let figurasFacil = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
figurasFacil = figurasFacil.sort(() => { return Math.random() - 0.5 });
function mostrarFigurasFacil(id) {
  if (temporizador == false) {
    contarTiempoFigurasFacil();
    temporizador = true;
  }

  tarjetasMostradas++;
  if (tarjetasMostradas == 1) {
    tarjeta1 = document.getElementById(id);
    primerResultado = figurasFacil[id];
    tarjeta1.innerHTML = `<img src="recursos/${primerResultado}.png" alt"">`;
    tarjeta1.disabled = true;

  } else if (tarjetasMostradas == 2) {
    tarjeta2 = document.getElementById(id);
    segundoResultado = figurasFacil[id];
    tarjeta2.innerHTML = `<img src="recursos/${segundoResultado}.png" alt"">`;
    tarjeta2.disabled = true;
    contadorMovimientos++;
    cuentaRondas.innerHTML = `Movimientos: ${contadorMovimientos}`;

    if (primerResultado == segundoResultado) {
      tarjetasMostradas = 0;
      aciertos++;
      contadorAciertos.innerHTML = `Aciertos: ${aciertos}`;

      if (aciertos == 8) {
        clearInterval(tiempovoid)
        abrirModalVictoria();
        victorias++;
        actualizarVictorias();
      }
    } else {
      setTimeout(() => {
        tarjeta1.innerHTML = ' ';
        tarjeta2.innerHTML = ' ';
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasMostradas = 0;
      }, 1000)


    }
  }
}


//bloqueo facil figuras
function bloquearTarjetasFiguras() {
  for (let i = 0; i <= 15; i++) {
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = `<img src="recursos/${figurasFacil[i]}.png" alt"">`;
    tarjetaBloqueada.disabled = true;
  }
}

//timer facil figuras 
function contarTiempoFigurasFacil() {
  tiempovoid = setInterval(() => {
    timerFacil--;
    mostrarTiempo.innerHTML = `Tiempo: ${timerFacil} segundos`;
    if (timerFacil == 0) {
      clearInterval(tiempovoid);
      abrirModalDerrota();
      bloquearTarjetasFiguras();
      derrotas++;
      actualizarDerrotas();
      guardarEstadisticasUsuario();
    }
  }, 1000)
}


//juego figuras dificil 8*8 -------------------------------------------------------------------------------------------------------------------------
let figurasDificil = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17];
figurasDificil = figurasDificil.sort(() => { return Math.random() - 0.5 });

function mostrarFiguraDificil(id) {
  if (temporizador == false) {
    contarTiempoFigurasDificil();
    temporizador = true;
  }

  tarjetasMostradas++;
  if (tarjetasMostradas == 1) {
    tarjeta1 = document.getElementById(id);
    primerResultado = figurasDificil[id];
    tarjeta1.innerHTML = `<img src="recursos/${primerResultado}.png" alt"">`;
    tarjeta1.disabled = true;

  } else if (tarjetasMostradas == 2) {
    tarjeta2 = document.getElementById(id);
    segundoResultado = figurasDificil[id];
    tarjeta2.innerHTML = `<img src="recursos/${segundoResultado}.png" alt"">`;
    tarjeta2.disabled = true;
    contadorMovimientos++;
    cuentaRondas.innerHTML = `Movimientos: ${contadorMovimientos}`;

    if (primerResultado == segundoResultado) {
      tarjetasMostradas = 0;
      aciertos++;
      contadorAciertos.innerHTML = `Aciertos: ${aciertos}`;

      if (aciertos == 18) {
        clearInterval(tiempovoid)
        abrirModalVictoria();
        victorias++;
        actualizarVictorias();
      }
    } else {
      setTimeout(() => {
        tarjeta1.innerHTML = ' ';
        tarjeta2.innerHTML = ' ';
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasMostradas = 0;
      }, 1000)
    }
  }
}

//timer dificil figuras
function contarTiempoFigurasDificil() {
  tiempovoid = setInterval(() => {
    timerDificil--;
    mostrarTiempo.innerHTML = `Tiempo: ${timerDificil} segundos`;
    if (timerDificil == 0) {
      clearInterval(tiempovoid);
      bloquearTarjetasFigurasDificil();
      abrirModalDerrota();
      derrotas++;
      actualizarDerrotas();
      guardarEstadisticasUsuario();
    }
  }, 1000)
}
//bloqueo figuras dificil
function bloquearTarjetasFigurasDificil() {
  for (let i = 0; i <= 35; i++) {
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = `<img src="recursos/${figurasDificil[i]}.png" alt"">`;
    tarjetaBloqueada.disabled = true;
  }
}


//modal de victoria o derrota
let totalMovimientos = document.getElementById("mensajePartida");
let totalAciertos = document.getElementById("mensajeAciertos");
let tiempoUsado = document.getElementById("mensajeTiempo");
let msjVictoria = document.getElementById("mensajeVictoria");
let msjDerrota = document.getElementById("mensajeDerrota");

function abrirModalVictoria() {
  if (aciertos == 18) {
    let TiempoUsado = 80 - timerDificil;
    tiempoUsado.innerHTML = `Duraste: ${TiempoUsado} segundos`;
  } else {
    let TiempoUsado = 40 - timerFacil;
    tiempoUsado.innerHTML = `Duraste: ${TiempoUsado} segundos`;
  }
  totalMovimientos.innerHTML = `Usaste unicamente: ${contadorMovimientos} movimientos`;
  msjVictoria.style.display = "block";
}


function abrirModalDerrota() {
  totalAciertos.innerHTML = `Tuviste: ${aciertos} aciertos`;
  msjDerrota.style.display = "block";
}

function jugarDeNuevo() {
  window.location.reload()
}


//actualizar derrotas y victorias
window.addEventListener('load', function () {
  if (localStorage.getItem('username')) {
    let usuarioGuardado = JSON.parse(localStorage.getItem('username'));
    victorias = usuarioGuardado.victoriasMemoria;
    derrotas = usuarioGuardado.derrotasMemoria;
    actualizarVictorias();
    actualizarDerrotas();
  }
});

// Función para actualizar el contador de victorias
function actualizarVictorias() {
  localStorage.setItem('victorias', victorias);
  contadorVictorias.innerHTML = `Victorias: ${victorias}`;
}
function actualizarDerrotas() {
  localStorage.setItem('derrotas', derrotas);
  contadorDerrotas.innerHTML = `Derrotas: ${derrotas}`;
}
function guardarEstadisticasUsuario() {
  let usuarioGuardado = JSON.parse(localStorage.getItem('username'));
  usuarioGuardado.victoriasMemoria = victorias;
  usuarioGuardado.derrotasMemoria = derrotas;
  localStorage.setItem('username', JSON.stringify(usuarioGuardado));
}

//para que el nombre del jugador salga en pantalla
document.addEventListener("DOMContentLoaded", function () {
  let username = localStorage.getItem('username');
  document.getElementById("username").textContent = `Jugador: ${username}`;
});


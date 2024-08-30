//para el modal de salir o continuar
function abrirModalSalir() {
  document.getElementById("modalSalir").style.display = "block";
}
function salir() {
  window.location.href = "elegirJuego.html";
}
function continuar() {
  document.getElementById("modalSalir").style.display = "none";
}

//para jugar de nuevo cuando se acaba la partida
function jugarDeNuevo() {
  window.location.reload()
}

//todo el juego
let preguntas = [
  {
    bandera: "recursos/banderas/cr.svg",
    opciones: ["Costa Rica", "Francia", "Panama", "Peru"],
    respuestaCorrecta: "Costa Rica",
  },
  {
    bandera: "recursos/banderas/al.svg",
    opciones: ["Tunez", "Albania", "Turquia", "Rusia"],
    respuestaCorrecta: "Albania",
  },
  {
    bandera: "recursos/banderas/am.svg",
    opciones: ["Argelia", "Etiopia", "Lituania", "Armenia"],
    respuestaCorrecta: "Armenia",
  },
  {
    bandera: "recursos/banderas/ar.svg",
    opciones: ["Honduras", "Uruguay", "Argentina", "Nicaragua"],
    respuestaCorrecta: "Argentina",
  },
  {
    bandera: "recursos/banderas/be.svg",
    opciones: ["Belgica", "Suecia", "Holanda", "Dinamarca"],
    respuestaCorrecta: "Belgica",
  },
  {
    bandera: "recursos/banderas/br.svg",
    opciones: ["Brasil", "Colombia", "Venezuela", "Argentina"],
    respuestaCorrecta: "Brasil",
  },
  {
    bandera: "recursos/banderas/bt.svg",
    opciones: ["Bután", "Nepal", "Sri Lanka", "India"],
    respuestaCorrecta: "Bután",
  },
  {
    bandera: "recursos/banderas/bz.svg",
    opciones: ["Belice", "Honduras", "Guatemala", "El Salvador"],
    respuestaCorrecta: "Belice",
  },
  {
    bandera: "recursos/banderas/dz.svg",
    opciones: ["Argelia", "Marruecos", "Túnez", "Libia"],
    respuestaCorrecta: "Argelia",
  },
  {
    bandera: "recursos/banderas/kz.svg",
    opciones: ["Kazajistán", "Uzbekistán", "Turkmenistán", "Kirguistán"],
    respuestaCorrecta: "Kazajistán",
  },
  {
    bandera: "recursos/banderas/nl.svg",
    opciones: ["Países Bajos", "Alemania", "Bélgica", "Luxemburgo"],
    respuestaCorrecta: "Países Bajos",
  },
  {
    bandera: "recursos/banderas/np.svg",
    opciones: ["Nepal", "China", "India", "Bután"],
    respuestaCorrecta: "Nepal",
  },
  {
    bandera: "recursos/banderas/td.svg",
    opciones: ["Chad", "Níger", "Mali", "Sudán"],
    respuestaCorrecta: "Chad",
  },
  {
    bandera: "recursos/banderas/uz.svg",
    opciones: ["Uzbekistán", "Kazajistán", "Turkmenistán", "Tayikistán"],
    respuestaCorrecta: "Uzbekistán",
  },
  {
    bandera: "recursos/banderas/hu.svg",
    opciones: ["Hungría", "Rumanía", "Bulgaria", "Serbia"],
    respuestaCorrecta: "Hungría",
  },
  {
    bandera: "recursos/banderas/jp.svg",
    opciones: ["Japón", "China", "Corea del Sur", "Taiwán"],
    respuestaCorrecta: "Japón",
  },
  {
    bandera: "recursos/banderas/ug.svg",
    opciones: ["Uganda", "Kenia", "Ruanda", "Tanzania"],
    respuestaCorrecta: "Uganda",
  },
  {
    bandera: "recursos/banderas/pt.svg",
    opciones: ["Portugal", "España", "Italia", "Francia"],
    respuestaCorrecta: "Portugal",
  },
  {
    bandera: "recursos/banderas/lu.svg",
    opciones: ["Luxemburgo", "Bélgica", "Alemania", "Francia"],
    respuestaCorrecta: "Luxemburgo",
  },
  {
    bandera: "recursos/banderas/gb-wls.svg",
    opciones: ["Gales", "Escocia", "Inglaterra", "Irlanda del Norte"],
    respuestaCorrecta: "Gales",
  },
  {
    bandera: "recursos/banderas/fi.svg",
    opciones: ["Finlandia", "Suecia", "Noruega", "Dinamarca"],
    respuestaCorrecta: "Finlandia",
  },
  {
    bandera: "recursos/banderas/fo.svg",
    opciones: ["Islas Feroe", "Groenlandia", "Islandia", "Noruega"],
    respuestaCorrecta: "Islas Feroe",
  },
  {
    bandera: "recursos/banderas/au.svg",
    opciones: ["Australia", "Nueva Zelanda", "Papúa Nueva Guinea", "Fiyi"],
    respuestaCorrecta: "Australia",
  },
  {
    bandera: "recursos/banderas/nz.svg",
    opciones: ["Nueva Zelanda", "Australia", "Tonga", "Samoa"],
    respuestaCorrecta: "Nueva Zelanda",
  },
];


var timer = 15;
let posActual = 0;
let cantidadCorrectas = 0;
let cantidadIncorrectas = 0;
let contadorCorrectas = document.getElementById("correctas");
let contadorIncorrectas = document.getElementById("incorrectas");

//para que se hagan las preguntas aleatorias
let preguntasAleatorias = [];
for (let i = 0; i < preguntas.length; i++) {
  preguntasAleatorias.push(i);
}
function mezclarPreguntas() {
  for (let i = preguntasAleatorias.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [preguntasAleatorias[i], preguntasAleatorias[j]] = [preguntasAleatorias[j], preguntasAleatorias[i]];
  }
}

//cuando se le da al boton comenzar juego
function comenzarJuego() {
  posActual = 0;
  cantidadCorrectas = 0;
  document.getElementById("pantallaInicial").style.display = "none";
  document.getElementById("pantallaJuego").style.display = "block";
  contarTiempo();
  mezclarPreguntas();
  cambiarPregunta();
}

//funcio que cambia las preguntas y verifica si se acabo el juego
function cambiarPregunta() {
  if (posActual >= 20) { //se termina el juego porque no hay mas preguntas
    if (cantidadCorrectas >= 16) {
      abrirModalVictoria();
      userData.victoriaTrivia++;
    } else {
      abrirModalDerrota();
      userData.derrotaTrivia++;
    }
  } else {//cambia la pregunta si hay mas preguntas
    let indicePreguntaActual = preguntasAleatorias[posActual];
    document.getElementById("imgBandera").src = preguntas[indicePreguntaActual].bandera;
    document.getElementById("n0").innerHTML = preguntas[indicePreguntaActual].opciones[0];
    document.getElementById("n1").innerHTML = preguntas[indicePreguntaActual].opciones[1];
    document.getElementById("n2").innerHTML = preguntas[indicePreguntaActual].opciones[2];
    document.getElementById("n3").innerHTML = preguntas[indicePreguntaActual].opciones[3];
  }
}

//para comprobar si la opcion elejida era la correcta
let mensajeRespuesta = document.getElementById("MensajeRespuesta");
function comprobarRespuesta(opElegida) {
  let opcionElegida = document.getElementById(`n${opElegida}`).innerHTML;
  let indicePreguntaActual = preguntasAleatorias[posActual];
  let respuestaCorrecta = preguntas[indicePreguntaActual].respuestaCorrecta; 
  if (opcionElegida === respuestaCorrecta) {
    cantidadCorrectas++;
    actualizarCorrectas();
    abrirModalCorrecto();
  } else {
    cantidadIncorrectas++;
    actualizarIncorrectas();
    mensajeRespuesta.innerHTML = `La respuesta correcta era: ${respuestaCorrecta}`;
    abrirModalIncorrecto();
  }
}

//para abrir el modal de correctas e incorrectas
let msjCorrecto = document.getElementById("mensajeCorrecto");
function abrirModalCorrecto() {
  msjCorrecto.style.display = "block";
}

let msjIncorrecto = document.getElementById("mensajeIncorrecto");
function abrirModalIncorrecto() {
  msjIncorrecto.style.display = "block";
}

//actualiza las correctas e incorrectas en pantalla
function actualizarCorrectas() {
  contadorCorrectas.innerHTML = `Correctas: ${cantidadCorrectas}`;
}
function actualizarIncorrectas() {
  contadorIncorrectas.innerHTML = `Incorrectas: ${cantidadIncorrectas}`;
}

//cierra el modal y cambia la pregunta
function cerrarModal() {
  msjIncorrecto.style.display = "none";
  msjCorrecto.style.display = "none";
  posActual++;
  timer = 16;
  cambiarPregunta();
}

//modal de victoria y derrota

let msjVictoria = document.getElementById("mensajeVictoria");
let mostrarTotalCorrectasVictoria = document.getElementById("mensajeTotalCorrectasVictoria");
function abrirModalVictoria() {
  mostrarTotalCorrectasVictoria.innerHTML = `Tuviste un total de: ${cantidadCorrectas} correctas`;
  msjVictoria.style.display = "block";
}

let msjDerrota = document.getElementById("mensajeDerrota");
let mostrarTotalCorrectasDerrota = document.getElementById("mensajeTotalCorrectasDerrota");
function abrirModalDerrota() {
  mostrarTotalCorrectasDerrota.innerHTML = `Tuviste un total de: ${cantidadCorrectas} correctas`;
  msjDerrota.style.display = "block";
}


//actualiza el timer en pantalla y da incorrecta si se acaba el tiempo
let mostrarTiempo = document.getElementById("tiempo");
let tiempoid = null;
function contarTiempo() {
  tiempoid = setInterval(() => {
    timer--;
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
    if (timer == 0) {
      cantidadIncorrectas++;
      actualizarIncorrectas();
      abrirModalIncorrecto();
    }
  }, 1000)
}

//para que el nombre del jugador salga en pantalla
document.addEventListener("DOMContentLoaded", function() {
  let username = localStorage.getItem('username');
  document.getElementById("username").textContent = `Jugador: ${username}`
});
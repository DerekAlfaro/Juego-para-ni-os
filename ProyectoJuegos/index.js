//index
function MostrarJuegos() {
    let username = document.getElementById('username').value;
    if (username !== '') {
        localStorage.setItem('username', username);
        window.location.href = "elegirJuego.html";
    } else {
        // Mostrar el modal en lugar de la alerta
        let alerta = new bootstrap.Modal(document.getElementById('alerta'));
        alerta.show();
    }
}

function cerrarModal() {
    let alerta = new bootstrap.Modal(document.getElementById('alerta'));
    alerta.hide();
}



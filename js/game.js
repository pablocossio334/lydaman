
const sonidoColision = new Audio('../sounds/explota.mp3');
const sonidoColision2 = new Audio('../sounds/ayy.mp3');
const sonidoSalto=new Audio('../sounds/salto.mp3')
const sondidoBonus=new Audio('../sounds/collect.mp3');
const sonidoGameOver=new Audio('../sounds/gameOver.mp3')
const jugador = document.getElementById('jugador');
const contenedor = document.getElementById('contenedor');
const puntajeDisplay = document.getElementById('puntaje');
const vidasDisplay = document.getElementById('vidasCount');
const info=document.getElementById('info');
const mensaje = document.getElementById('mensaje');
const fondo=document.getElementById('fondo');
const bonusImages = ['../img/LydaP.png', '../img/lydaN.png', '../img/lydaC.png','../img/lydaL.png'];

const tiempoDisplay = document.getElementById('tiempo');
const fondos=['../img/arbustos.jpg','../img/desierto.jpg','../img/egipto.png ','../img/bosque.png','../img/espacio.png']

let isJumping = false;
let nivel=1;
let puntaje = 0;
let vidas = 3;
let jugando = false;
let tiempoJuego = 0;


function actualizarTiempo() {
    if (jugando) {
        tiempoJuego++;
        tiempoDisplay.textContent = `Tiempo: ${tiempoJuego} s`;

    if(tiempoJuego>=10)
    {
        tiempoJuego=0;
        nivel++;
        mostrarNivel();
    }
        


    }
}

setInterval(actualizarTiempo, 1000);


function actualizarResolucion() {
    let ancho = window.innerWidth;
    let alto = window.innerHeight;
    document.getElementById('resolucion').textContent = `Resolución: ${ancho} x ${alto}`;
}

// Mostrar resolución al cargar la página
actualizarResolucion();

// Actualizar si cambia el tamaño de la ventana
window.addEventListener('resize', actualizarResolucion);

document.addEventListener('keydown', function(event) {
    if (event.key === ' ' && !jugando) {
        ocultarMensaje();
        mostrarNivel();
        jugando = true;
        puntaje = 0;
        vidas = 3;
        tiempoJuego = 0; // Reiniciar tiempo al iniciar el juego
        puntajeDisplay.textContent = ` ${puntaje}`;
        vidasDisplay.textContent = `x ${vidas}`;
        tiempoDisplay.textContent = `Tiempo: ${tiempoJuego} s`;
    }
});
function mostrarNivel() {
    nivelMensaje.textContent = `Nivel ${nivel}`; // Muestra el nivel actual
    nivelMensaje.style.display = 'block'; // Hace visible el mensaje
    fondo.style.backgroundImage = `url('${fondos[nivel - 1]}')`;
    fondo.style.display='block';
    setTimeout(() => {
        nivelMensaje.style.display = 'none'; // Oculta el mensaje después de 2 segundos
        
    }, 2000);
    
   
}




function mostrarMensaje() {
    mensaje.style.display = 'block';

}

function ocultarMensaje() {
    mensaje.style.display = 'none';
    
   info.style.display='flex';

}



function detectarColision(jugador, elemento) {
    const margen = 10; // Ajusta este valor según necesites
const factorColision = 0.3; // Reduce el área efectiva de colisión (ajústalo)

const jugadorRect = jugador.getBoundingClientRect();
const elementoRect = elemento.getBoundingClientRect();

// Reducir el área de colisión del enemigo
const elementoCentroX = elementoRect.left + (elementoRect.width / 2);
const elementoCentroY = elementoRect.top + (elementoRect.height / 2);
const elementoAnchoReducido = elementoRect.width * factorColision;
const elementoAltoReducido = elementoRect.height * factorColision;

return (
    jugadorRect.right - margen > elementoCentroX - elementoAnchoReducido &&
    jugadorRect.left + margen < elementoCentroX + elementoAnchoReducido &&
    jugadorRect.bottom - margen > elementoCentroY - elementoAltoReducido &&
    jugadorRect.top + margen < elementoCentroY + elementoAltoReducido
);
}

function crearObstaculoVolador() {
    const obstaculoVolador = document.createElement("div");
    obstaculoVolador.classList.add("obstaculo-volador");

    // Posición horizontal (fuera de la pantalla, a la derecha)
    obstaculoVolador.style.left = "100vw";

    // Posición vertical aleatoria en la parte superior del juego
    const alturaMin = 20; // Mínima altura
    const alturaMax = 50; // Máxima altura
    const posicionY = Math.random() * (alturaMax - alturaMin) + alturaMin;
    obstaculoVolador.style.top = `${posicionY}vh`; 

    contenedor.appendChild(obstaculoVolador);

    moverObstaculoVolador(obstaculoVolador);
}
function moverObstaculoVolador(obstaculoVolador) {
    let posicionX = window.innerWidth;

    function animar() {
        if (posicionX < -50) { // Si ya salió de la pantalla, eliminarlo
            obstaculoVolador.remove();
        } else {
            posicionX -= 4; // Velocidad del obstáculo
            obstaculoVolador.style.left = `${posicionX}px`;
            requestAnimationFrame(animar);
        }
    }

    animar();
}






function crearObstaculo() {
    const obstaculo = document.createElement('div');
    obstaculo.classList.add('obstaculo');

    const imgObstaculo = ["../img/enemies/avestruz.gif","../img/enemies/cactus.gif","../img/enemies/Momia-04.gif","../img/enemies/gorila.gif  ","../img/enemies/aliene.gif"];
    const enemigo = document.createElement('img');
    enemigo.src = imgObstaculo[nivel-1]; // Asigna la imagen
    enemigo.alt = "Enemigo"; // Añade texto alternativo
    enemigo.classList.add('enemigo'); // Agrega una clase para estilos

    // Añadir la imagen dentro del div obstaculo
    obstaculo.appendChild(enemigo);
    
    // Añadir el obstáculo al contenedor
    contenedor.appendChild(obstaculo);

    setTimeout(() => {
        if (obstaculo.parentElement) {
            obstaculo.remove();
        }
    }, 3000);
}

function crearBonus() {
const bonus = document.createElement('div');
bonus.classList.add('bonus');

// Selecciona una imagen aleatoria del arreglo
const randomIndex = Math.floor(Math.random() * bonusImages.length);
bonus.style.backgroundImage = `url('${bonusImages[randomIndex]}')`;

let posicionValida = false;

while (!posicionValida) {
    const minHeight = contenedor.offsetHeight * 0.2; // Al menos el 20% desde arriba
const maxHeight = contenedor.offsetHeight * 0.8; // Máximo 80% desde arriba
const randomTop = Math.random() * (maxHeight - minHeight) + minHeight;
   // const minHeight = 250;
    //const maxHeight = contenedor.offsetHeight - 50;
    //const randomTop = Math.random() * (maxHeight - minHeight) + minHeight;

    bonus.style.top = `${randomTop}px`;
    const obstaculoList = document.querySelectorAll('.obstaculo');
    posicionValida = Array.from(obstaculoList).every(obstaculo => {
        const obstaculoRect = obstaculo.getBoundingClientRect();
        const bonusRect = bonus.getBoundingClientRect();

        return !(
            bonusRect.left < obstaculoRect.right &&
            bonusRect.right > obstaculoRect.left &&
            bonusRect.top < obstaculoRect.bottom &&
            bonusRect.bottom > obstaculoRect.top
        );
    });
}

contenedor.appendChild(bonus);

setTimeout(() => {
    if (bonus.parentElement) {
        bonus.remove();
    }
}, 3000);
}

let invulnerable = false;  // Bandera para la invulnerabilidad

function verificarColisiones() {
const bonusList = document.querySelectorAll('.bonus');
const obstaculoList = document.querySelectorAll('.obstaculo');

bonusList.forEach(bonus => {
if (detectarColision(jugador, bonus)) {
    puntaje += 10;
    puntajeDisplay.textContent = ` ${puntaje}`;
    sondidoBonus.play();
    bonus.remove();
}
});

obstaculoList.forEach(obstaculo => {
if (detectarColision(jugador, obstaculo) && !invulnerable) {
    sonidoColision.play();
    sonidoColision2.play();
    invulnerable = true;  // Activar invulnerabilidad
    vidas -= 1;
    obstaculo.removeChild(obstaculo.firstChild);
    obstaculo.style.backgroundImage = "url('../img/boom.gif')";
    vidasDisplay.textContent = `x  ${vidas}`;

    if (vidas <= 0) {
        sonidoGameOver.play();
        alert('¡Juego terminado!');
        
        jugando = false;
        
        mostrarMensaje();
        window.location.reload();
    }

    // Desactivar invulnerabilidad después de 3 segundo
    setTimeout(() => {
        invulnerable = false;
    }, 3000);
}
});
}
function iniciarJuegoOSaltar() {
    if (!jugando) {
        ocultarMensaje();
        jugando = true;
        mostrarNivel();
        puntaje = 0;
        vidas = 3;
        puntajeDisplay.textContent = ` ${puntaje}`;
        vidasDisplay.textContent = `x   ${vidas}`;
    } else if (jugando && !isJumping) {
        isJumping = true;
        jugador.style.transform = 'translateY(-250%)';
        sonidoSalto.play();
        setTimeout(() => {
            jugador.style.transform = 'translateY(0)';
            isJumping = false;
        }, 300);
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === ' ') {
        iniciarJuegoOSaltar();
    }
});
document.addEventListener('click', function() {
    iniciarJuegoOSaltar();
});
setInterval(() => {
    if (jugando) {
        crearObstaculo();
    }
}, 2500);

setInterval(() => {
    if (Math.random() < 0.4) { // 40% de probabilidad de aparecer cada ciclo
        crearObstaculoVolador();
    }
}, 3000); 


setInterval(() => {
    if (jugando) {
        crearBonus();
    }
}, 1000);

setInterval(() => {
    if (jugando) {
        verificarColisiones();
    }
}, 50);

mostrarMensaje();

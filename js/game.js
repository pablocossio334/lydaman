
const sonidoColision = new Audio('../sounds/explota.mp3');
const sonidoColision2 = new Audio('../sounds/ayy.mp3');
const sonidoSalto=new Audio('../sounds/salto.mp3')
const sondidoBonus=new Audio('../sounds/collect.mp3');
const sonidoGameOver=new Audio('../sounds/gameOver.mp3')
const jugador = document.getElementById('jugador');
const contenedor = document.getElementById('contenedor');
const puntajeDisplay = document.getElementById('puntaje');
const nivelDisplay=document.getElementById('nivel');
const vidasDisplay = document.getElementById('vidasCount');
const info=document.getElementById('info');
const mensaje = document.getElementById('mensaje');
const fondo=document.getElementById('fondo');
const bonusImages = ['../img/LydaP.png', '../img/lydaN.png', '../img/lydaC.png','../img/lydaL.png'];

const tiempoDisplay = document.getElementById('tiempo');
const fondos=['../img/arbustos.jpg','../img/desierto.jpg','../img/egipto.png ','../img/bosque.png','../img/espacio.png','../img/bosque-noche.jpg']

let isJumping = false;
let nivel=1;
let puntaje = 0;
let vidas = 3;
let jugando = false;
let tiempoJuego = 0;
let mostrandoNivel = false;

function actualizarTiempo() {
    if (jugando) {
        tiempoJuego++;
        tiempoDisplay.textContent = `Tiempo: ${tiempoJuego-30} s`;

    if(tiempoJuego>=30)
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
    mostrandoNivel = true; // Bloquea interacción

    const pantallaNivel = document.createElement("div");
    pantallaNivel.style.position = "fixed";
    pantallaNivel.style.top = "0";
    pantallaNivel.style.left = "0";
    pantallaNivel.style.width = "100vw";
    pantallaNivel.style.height = "100vh";
    pantallaNivel.style.backgroundColor = "black";
    pantallaNivel.style.color = "white";
    pantallaNivel.style.display = "flex";
    pantallaNivel.style.justifyContent = "center";
    pantallaNivel.style.alignItems = "center";
    pantallaNivel.style.fontSize = "5rem";
    pantallaNivel.style.zIndex = "1000";
    pantallaNivel.textContent = `Nivel ${nivel}`;
    nivelDisplay.textContent = `Nivel ${nivel}`;
    
    document.body.appendChild(pantallaNivel);
    fondo.style.display = "none"; 

    setTimeout(() => {
        pantallaNivel.remove();
        fondo.style.display = "block";
        fondo.style.backgroundImage = `url('${fondos[nivel - 1]}')`;
        mostrandoNivel = false; // Permite interacción nuevamente
    }, 2000);
}


function gameOver() {
    // Detener el juego
    jugando = false;
    // Mostrar el mensaje de Game Over
    const gameOverScreen = document.createElement('div');
    gameOverScreen.id = "gameOver";
    gameOverScreen.style.position = "fixed";
    gameOverScreen.style.top = "0";
    gameOverScreen.style.left = "0";
    gameOverScreen.style.width = "100vw";
    gameOverScreen.style.height = "100vh";
    gameOverScreen.style.backgroundColor = "black";
    gameOverScreen.style.color = "white";
    gameOverScreen.style.display = "flex";
    gameOverScreen.style.justifyContent = "center";
    gameOverScreen.style.alignItems = "center";
    gameOverScreen.style.fontSize = "6rem";
    gameOverScreen.textContent = "Game Over!";
    document.body.appendChild(gameOverScreen);

    // Espera 5 segundos y luego reinicia el juego
    setTimeout(function() {
        // Eliminar la pantalla de Game Over
        gameOverScreen.remove();
        // Reiniciar el juego
        window.location.reload();
    }, 5000);
}


function mostrarMensaje() {
    mensaje.style.display = 'block';

}
function crearBurbuja() {
    let mensaje = document.getElementById("mensaje");

    // Solo crear burbujas si el título está visible
    if (window.getComputedStyle(mensaje).display === "none") return;

    let burbuja = document.createElement("div");
    burbuja.classList.add("burbuja");

    let tamaño = Math.random() * 20 + 10; // Tamaño aleatorio entre 10px y 30px
    burbuja.style.width = `${tamaño}px`;
    burbuja.style.height = `${tamaño}px`;

    burbuja.style.left = `${Math.random() * 100}vw`; // Se generan en cualquier parte de la pantalla
    burbuja.style.animationDuration = `${4 + Math.random() * 2}s`; // Duración aleatoria entre 4s y 6s

    document.body.appendChild(burbuja);

    setTimeout(() => {
        burbuja.remove();
    }, 6000); // Se eliminan después de 6s
}

let intervaloBurbujas;
function activarBurbujas() {
    intervaloBurbujas = setInterval(crearBurbuja, 500);
}

function desactivarBurbujas() {
    clearInterval(intervaloBurbujas);
}

// Activar burbujas cuando se carga la página
document.addEventListener("DOMContentLoaded", activarBurbujas);

// Detener burbujas al hacer clic en el título
document.getElementById("mensaje").addEventListener("click", function () {
    desactivarBurbujas();
});


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


function moverObstaculoVolador(obstaculoVolador) {
    let posicionX = window.innerWidth;
    let velocidad = 8; // Ajusta la velocidad (mayor que la de los enemigos normales)

    function animar() {
        if (posicionX < -50) {
            obstaculoVolador.remove();
        } else {
            posicionX -= velocidad; // Se mueve más rápido que los enemigos normales
            obstaculoVolador.style.left = `${posicionX}px`;
            requestAnimationFrame(animar);
        }
    }

    animar();
}






function crearObstaculo() {
    const obstaculo = document.createElement('div');
    obstaculo.classList.add('obstaculo');

    const imgObstaculo = ["../img/enemies/avestruz.gif","../img/enemies/cactus.gif","../img/enemies/Momia-04.gif","../img/enemies/gorila.gif  ","../img/enemies/aliene.gif","../img/enemies/Monstruo.gif"];
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



function crearObstaculoVolador() {
    const obstaculoVolador = document.createElement("img");
    voladores=["../img/enemies/pajaro.gif","../img/enemies/aguila.gif","../img/enemies/condor.gif","../img/enemies/picaflor.gif  ","../img/enemies/ovni.gif","../img/enemies/murcielago.gif"];
    obstaculoVolador.src=voladores[nivel-1];
    obstaculoVolador.alt = "Enemigo"; // Añade texto altern
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
    const obstaculoVoladorList = document.querySelectorAll('.obstaculo-volador'); // NUEVO

    // Verificar colisión con bonus
    bonusList.forEach(bonus => {
        if (detectarColision(jugador, bonus)) {
            puntaje += 10;
            puntajeDisplay.textContent = ` ${puntaje}`;
            sondidoBonus.play();
            bonus.remove();
        }
    });

    // Verificar colisión con obstáculos en el suelo
    obstaculoList.forEach(obstaculo => {
        if (detectarColision(jugador, obstaculo) && !invulnerable) {
            manejarColision(obstaculo);
        }
    });

    // Verificar colisión con obstáculos voladores
    obstaculoVoladorList.forEach(obstaculoVolador => {
        if (detectarColision(jugador, obstaculoVolador) && !invulnerable) {
            manejarColision(obstaculoVolador);
        }
    });
}

function manejarColision(obstaculo) {
    if (!jugando) return; // Evita que el juego continúe si ya se terminó

    sonidoColision.play();
    sonidoColision2.play();
    invulnerable = true;
    vidas -= 1;
    vidasDisplay.textContent = `x  ${vidas}`;
    
    // Animación de explosión en el obstáculo
    obstaculo.style.backgroundImage = "url('../img/boom.gif')";
    
    setTimeout(() => {
        obstaculo.remove();
    }, 300);

    if (vidas <= 0) {
        sonidoGameOver.play();
        gameOver();  // Llama a gameOver() cuando las vidas sean 0
    }

    // Desactivar invulnerabilidad después de 3 segundos
    setTimeout(() => {
        invulnerable = false;
    }, 3000);
}
function mostrarNivel() {
    // Crear pantalla negra
    const pantallaNivel = document.createElement("div");
    pantallaNivel.style.position = "fixed";
    pantallaNivel.style.top = "0";
    pantallaNivel.style.left = "0";
    pantallaNivel.style.width = "100vw";
    pantallaNivel.style.height = "100vh";
    pantallaNivel.style.backgroundColor = "black";
    pantallaNivel.style.color = "white";
    pantallaNivel.style.display = "flex";
    pantallaNivel.style.justifyContent = "center";
    pantallaNivel.style.alignItems = "center";
    pantallaNivel.style.fontSize = "5rem";
    pantallaNivel.style.zIndex = "1000";
    pantallaNivel.textContent = `Nivel ${nivel}`;
    nivelDisplay.textContent=`Nivel ${nivel}`;
    document.body.appendChild(pantallaNivel);

    // Ocultar fondo del juego
    fondo.style.display = "none";

    // Mostrar el fondo y ocultar la pantalla negra después de 2 segundos
    setTimeout(() => {
        pantallaNivel.remove();
        fondo.style.display = "block";
        fondo.style.backgroundImage = `url('${fondos[nivel - 1]}')`;
    }, 2000);
}


function iniciarJuegoOSaltar() {
    if (mostrandoNivel) return; // 🚨 Evita interacción mientras la pantalla negra está activa

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
        jugador.style.transform = 'translateY(-350%)';
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
    if (jugando) {
        if (Math.random() < 0.4) { // 40% de probabilidad de aparecer cada ciclo
            crearObstaculoVolador();
        }
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

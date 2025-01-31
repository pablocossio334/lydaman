
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
const fondos=['../img/arbustos.jpg','../img/desierto.png']

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

    if(tiempoJuego>=30)
    {
        tiempoJuego=0;
        nivel++;
        mostrarNivel();
    }
        


    }
}

setInterval(actualizarTiempo, 1000);

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

    const jugadorRect = jugador.getBoundingClientRect();
    const elementoRect = elemento.getBoundingClientRect();

    return (
        jugadorRect.right - margen > elementoRect.left + margen &&
        jugadorRect.left + margen < elementoRect.right - margen &&
        jugadorRect.bottom - margen > elementoRect.top + margen &&
        jugadorRect.top + margen < elementoRect.bottom - margen
    );
}

function crearObstaculo() {
    const obstaculo = document.createElement('div');
    obstaculo.classList.add('obstaculo');

    const imgObstaculo = ["../img/enemies/avestruz.gif","../img/enemies/cactus.gif","../img/enemies/Momia-04.gif"];
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
    const minHeight = 250;
    const maxHeight = contenedor.offsetHeight - 50;
    const randomTop = Math.random() * (maxHeight - minHeight) + minHeight;

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
document.addEventListener('keydown', function(event) {
    if (event.key === ' ' && !jugando) {
        ocultarMensaje();
        jugando = true;
        puntaje = 0;
        vidas = 3;
        puntajeDisplay.textContent = ` ${puntaje}`;
        vidasDisplay.textContent = `x   ${vidas}`;
    } else if (event.key === ' ' && jugando && !isJumping) {
        isJumping = true;
        jugador.style.transform = 'translateY(-250%)';
        sonidoSalto.play();
        setTimeout(() => {
            jugador.style.transform = 'translateY(0)';
            isJumping = false;
        }, 300);
    }
});

setInterval(() => {
    if (jugando) {
        crearObstaculo();
    }
}, 2500);

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

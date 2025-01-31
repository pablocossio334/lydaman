console.log("esto es una prueba");

const mensaje=document.getElementById('mensaje');
const mensajes=['MENSAJE 1','MENSAJE2','MENSAJE 3'];
mensajes.forEach((elemento, index) => { 
    setTimeout(() => {
        mensaje.innerText = elemento;
    }, 3000 * (index + 1)); // Multiplica el tiempo para que cada mensaje aparezca en distinto momento
});

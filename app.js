const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.end('Mi primer servidor con Express.');
});

app.get('/novedades' , (req, res) => {
    res.end('Las ulimas novedades las podras encontrar aqui...');
});

app.get('/novedades/ultimasmejoras', (req, res) => {
    res.end('Las mejoras en nuestros productos nos emocionan, y te las contamos todas aca...');
});

app.get('/contacto', (req, res) => {
    res.end('Completa el siguiente formulario para que nos contactemos...');
});



const puerto = 3000;

app.listen(puerto, () => {
    console.log(`El servidor está escuchando en el puerto ${puerto}...`);
})




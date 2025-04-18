const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const cors = require("cors")

app.use(cors());

// Servir archivos estáticos (HTML, JS, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta de la API que devuelve JSON
app.get('/api/saludo', (req, res) => {
    res.json({ mensaje: "¡Hola desde la API!" });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
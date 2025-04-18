
function simularLlamadaApi(url) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0',  // importante para evitar redirección de Ngrok
                'ngrok-skip-browser-warning': 'true'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();  // ← Acá usamos json en vez de text
            } else {
                reject("Error en la respuesta de la API");
            }
        })
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
}

async function ejecutarLlamada(url) {
    try {
        const resultado = await simularLlamadaApi(url);
        console.log("Resultado:", resultado);
    } catch (error) {
        console.log("Falló la llamada:", error);
    }
}

async function llamarAPI() {
    try {
        const res = await fetch(urlngrok, {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        });
        const data = await res.json();
        document.getElementById('resultado').innerText = data.mensaje;
    } catch (err) {
        document.getElementById('resultado').innerText = 'Error al llamar la API';
        console.error(err);
    }
}

document.getElementById('btnConsultar').addEventListener('click', async () => {
    const url = document.getElementById('inputUrl').value;
    const resultado = document.getElementById('resultado');
    resultado.textContent = "Consultando...";
    try {
        const res = await fetch(url, {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        });
        const data = await res.json();
        resultado.textContent = data.mensaje ?? JSON.stringify(data, null, 2);
    } catch (err) {
        resultado.textContent = 'Error al llamar la API:\n' + err;
    }
});

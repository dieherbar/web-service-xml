# Web Service XML con Express

Este proyecto es un web service construido con [Express](https://expressjs.com/) que recibe y responde datos en formato XML.

## Características

- API RESTful usando Express.
- Recepción y respuesta en formato XML.
- Manejo de dependencias para procesamiento de XML.

## Dependencias principales

```bash
npm install express body-parser xml2js js2xmlparser
```

- **express**: Framework para crear el servidor web.
- **body-parser**: Middleware para procesar el cuerpo de las solicitudes.
- **xml2js**: Convierte XML a objetos JavaScript.
- **js2xmlparser**: Convierte objetos JavaScript a XML.

## Ejemplo de uso

```js
const express = require('express');
const bodyParser = require('body-parser');
const xml2js = require('xml2js');
const js2xmlparser = require('js2xmlparser');

const app = express();
app.use(bodyParser.text({ type: 'application/xml' }));

app.post('/xml', (req, res) => {
    xml2js.parseString(req.body, (err, result) => {
        if (err) return res.status(400).send('XML inválido');
        // Procesar el objeto result
        const response = js2xmlparser.parse('response', { mensaje: 'Recibido correctamente' });
        res.type('application/xml').send(response);
    });
});

app.listen(3000, () => console.log('Servidor escuchando en puerto 3000'));
```

## Cómo ejecutar

1. Instala las dependencias:
     ```bash
     npm install
     ```
2. Inicia el servidor:
     ```bash
     node index.js
     ```

## Licencia

MIT
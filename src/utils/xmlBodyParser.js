import { parseString } from 'xml2js';

export function xmlParser(req, res, next) {
  const contentType = req.headers['content-type'];

  if (req.method === 'POST' && contentType === 'application/xml') {
    let data = '';

    req.setEncoding('utf8');

    req.on('data', chunk => {
      data += chunk;
    });

    req.on('end', () => {
      parseString(data, { explicitArray: false }, (err, result) => {
        if (err) {
          console.error('Error al parsear XML:', err);
          return res.status(400).send('XML inválido');
        }

        // Convertimos el contenido a req.body
        req.body = result?.XML || {};
        next();
      });
    });
  } else {
    next();
  }
}

import { parseString } from 'xml2js';
import { stripPrefix } from 'xml2js/lib/processors.js';

export const procesarSoap = async (req, res) => {
    const xml = req.body;
    const idsValidos = ['A87654321', 'J99542516', 'C99999999'];

    try {
        console.log('🧾 XML recibido en req.body:', xml);

        parseString(
            xml,
            { tagNameProcessors: [stripPrefix] },
            (err, result) => {
                if (err) {
                    console.error('❌ Error al parsear XML:', err);
                    return res.status(400).send('XML inválido');
                }

                // Navegar el árbol del XML
                const body = result?.Envelope?.Body?.[0];
                const datos = body?.Z_FI_WS_CONS_DEUD_ACR?.[0];

                if (!datos) {
                    console.error('❌ No se encontró el nodo Z_FI_WS_CONS_DEUD_ACR');
                    return res.status(400).send('SOAP Body inválido');
                }

                // Obtener STCD1
                const stcd1Raw = datos.STCD1?.[0];
                const stcd1 = typeof stcd1Raw === 'object' && '_' in stcd1Raw ? stcd1Raw._ : stcd1Raw;
                const id = stcd1; // Usamos STCD1 como ID

                console.log('📥 Valor STCD1 recibido:', stcd1);

                // Lógica de respuesta
                let codAcr = '';
                let codDeud = '';

                // Simulamos solo si coincide con un STCD1 válido
                if (stcd1 === 'J99542516') {
                    codAcr = '0000527733';
                    codDeud = '';
                }
                // Respuesta si el ID es válido
                if (idsValidos.includes(id)) {
                    //<COD_DEUD>${codDeud}</COD_DEUD>
                    const respuestaSoap = `<?xml version="1.0" encoding="UTF-8"?>
                <soap-env:Envelope xmlns:soap-env="http://schemas.xmlsoap.org/soap/envelope/">
                <soap-env:Header/>
                <soap-env:Body>
                <n0:Z_FI_WS_CONS_DEUD_ACRResponse xmlns:n0="urn:sap-com:document:sap:rfc:functions">
                <COD_ACR>0000527733</COD_ACR>
                <COD_DEUD></COD_DEUD>
    </n0:Z_FI_WS_CONS_DEUD_ACRResponse>
  </soap-env:Body>
</soap-env:Envelope>`;

                    res.set('Content-Type', 'text/xml; charset=utf-8');
                    //res.type('application/xml');
                    res.send(respuestaSoap);
                }
            }

        );
        

    } catch (error) {
        console.error('❌ Error inesperado:', error);
        res.status(500).send('Error interno del servidor');
    }
};

import express from "express";
//import { join, __dirname } from "./utils/index.js";
import bodyParser from "body-parser";
import { xmlParser } from './utils/xmlBodyParser.js';
import soapRoutes from './routes/soap.route.js';


//settings
const app = express();
app.set("PORT", 3000);

// middlewares
app.use(express.json());
//app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(xmlParser);
app.use(express.text({ type: '*/xml' }));// Middleware para parsear cuerpos XML agregado el 07/08/25


//routes
app.use('/ws', soapRoutes); // Por ejemplo: POST /ws/soap
app.get("/", (req, res) => {
  res.json({ title: "Home Page" });
});

// Middleware para manejar errores 404 
app.use((req, res) => {
  res.status(404).send('Recurso no encontrado o ruta inválida'); 
});

//listeners
app.listen(app.get("PORT"), () => {
  console.log(`Server on port http://localhost:${app.get("PORT")}`);
});

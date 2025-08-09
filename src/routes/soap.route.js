import express from 'express';
//import { procesarSoap, procesarSoapDebug } from '../controllers/soap.controller.js';
import { procesarSoap } from '../controllers/soap.controller.js';

const router = express.Router();

router.post('/soap', procesarSoap);

export default router;

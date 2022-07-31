const { Router } = require('express');
const express = require('express');
const Dogs = require('./Dogs')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.use(express.json());

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', Dogs);


module.exports = router;

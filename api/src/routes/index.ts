import { Router } from 'express';
const express = require('express');
const Dogs = require('./Dogs')
const Createdog = require('./Createdog')
const Temper = require('./Temper')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.use(express.json());

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', Dogs);
router.use('/create', Createdog);
router.use('/temperaments', Temper);


module.exports = router;

const { Router } = require('express');
const videogameRoute = require('./videogames');
const genreRoute = require('./genre');
const getVideogame = require('./getVideogame')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/videogames', videogameRoute);   //! /api/videogames/*
router.use('/videogame', getVideogame);      //! /api/videogame/*
router.use('/genres', genreRoute);           //! /api/genre/*

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;

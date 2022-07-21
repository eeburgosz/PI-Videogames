const { Router } = require('express');
const { juegosDb } = require('../controllers/infoDb');
const axios = require('axios');

require("dotenv").config();
const { API_KEY } = process.env;

const router = Router();

//!------------------------------------------------------------------------------------------
//!      [ ] GET /videogame/{idVideogame}
//!------------------------------------------------------------------------------------------
router.get('/:idVideogame', async (req, res, next) => {
   const { idVideogame } = req.params;
   try {
      if (idVideogame.length > 6) {
         let game = await juegosDb();
         //!   PREGUNTAR ESTE MANEJO DE ERRORES
         console.log(game)
         let gameId = game.find(e => e.id === idVideogame);
         gameId
            ? res.json(gameId)
            : res.status(404).send({ errorMsg: "El juego con ese id no existe" });
      } else {
         let infoApi = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`);
         let data = infoApi.data;
         let gameId = {
            id: data.id,
            name: data.name,
            release: data.released,
            description: data.description,
            rating: data.rating,
            bgImage: data.background_image,
            platforms: data.platforms.map(e => e.platform.name),
            genres: data.genres.map(e => e.name)
         }
         gameId
            ? res.json(gameId)
            : res.status(404).send({ errorMsg: "El juego con ese id no existe" });
      }
   } catch (error) {
      next(error)
   }
});

module.exports = router;

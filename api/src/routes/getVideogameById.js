const { Router } = require('express');
const { juegosDb } = require('../controllers/infoDb');
const { juegosApi } = require('../controllers/infoApi');
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
         let gameId = game.find(e => e.id === idVideogame);
         gameId
            ? res.json(gameId)
            : res.status(404).send({ errorMsg: "El juego con ese id no existe" });
      } else {
         const game = await axios.get(
            `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
         );
         const gameId = {
            id: game.data.id,
            name: game.data.name,
            img: game.data.background_image,
            genres: game.data.genres.map((e) => e.name),
            platforms: game.data.platforms.map((e) => e.platform.name),
            description: game.data.description,
            rating: game.data.rating,
            released: game.data.released,
         };
         gameId
            ? res.json(gameId)
            : res.status(404).send({ errorMsg: "El juego con ese id no existe" });
      }
   } catch (error) {
      next(error)

   }
});

module.exports = router;


/* 
let game = await juegosApi();
         let gameId = game.find(e => e.id.toString() === idVideogame);
         console.log(gameId)
         gameId
            ? res.json(gameId)
            : res.status(404).send({ errorMsg: "El juego con ese id no existe" });
*/
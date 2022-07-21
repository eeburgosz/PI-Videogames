const { Router } = require('express');
const { Videogame, Genre } = require('../db');
const { juegosApi } = require('../controllers/infoApi');
const { juegosDb } = require('../controllers/infoDb');

const router = Router();

//!------------------------------------------------------------------------------------------
//!      [ ] GET /videogames  -  [ ] GET /videogames?name="..."
//!------------------------------------------------------------------------------------------
router.get('/', async (req, res, next) => {
   try {
      const { name } = req.query;
      let allGames = (await juegosDb()).concat(await juegosApi())
      if (name) {
         let filterGames = allGames.filter((e) => {
            return e.name.toLowerCase().includes(name.toLowerCase());
         });
         if (filterGames.length) return res.json(filterGames.splice(0, 15))
         else res.status(404).send("El juego no existe");
      } else {
         res.status(200).json(allGames);
      }
   }
   catch (error) {
      next(error)
   }
});

//!------------------------------------------------------------------------------------------
//!      [ ] POST /videogames
//!------------------------------------------------------------------------------------------
router.post('/', async (req, res, next) => {
   try {
      const { name, description, release, rating, platforms, bgImage, genres } = req.body;

      const newGame = await Videogame.create({
         name,
         description,
         release,
         rating,
         platforms,
         bgImage,
         genres
      });

      genres.forEach(async (genre) => {
         //console.log(genre)
         let genreDB = await Genre.findAll({
            where: {
               name: genre
            }
         });
         //console.log(genreDB)
         newGame.addGenre(genreDB);
      });
      return res.json(newGame)
   } catch (error) {
      next(error)
   }
});


module.exports = router;

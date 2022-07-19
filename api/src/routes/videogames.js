const { Router } = require('express');
const { Videogame, Genre } = require('../db');
const axios = require('axios')

require("dotenv").config();
const { API_KEY } = process.env;
//!------------------------------------------------------------
const router = Router();

router.get('/', async (req, res, next) => {

   try {
      let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
      const gamesApi = await axios.get(url);
      const apiGames = [];
      for (let i = 0; i < 5; i++) {
         for (let i = 0; i < 20; i++) {
            let juego = gamesApi.data.results[i]
            apiGames.push({
               id: juego.id,
               name: juego.name,
               release: juego.released,
               rating: juego.rating,
               platforms: juego.platforms.map(game => game.platform.name),
               bgImage: juego.background_image,
               genres: juego.genres.map(genre => genre.name),
            })
         }
         url = gamesApi.data.next
      }
      const videogameDataBase = await Videogame.findAll({
         include: {
            model: Genre,
            attributes: ["name"],
            through: {
               attributes: []
            }
         }
      });
      const videogameDb = videogameDataBase.map((game) => {
         return {
            id: game.id,
            name: game.name,
            description: game.description,
            release: game.release,
            rating: game.rating,
            platforms: game.platforms,
            bgImage: game.bgImage,
            genres: game.genres
         }
      });
      const allGames = [...videogameDb, ...apiGames];

      return res.send(allGames)
   } catch (error) {
      next(error)
   }
});
//!------------------------------------------------------------------------------------------

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
      console.log(genres)
      genres.forEach(async (genre) => {
         let genreDB = await Genre.findAll({
            where: {
               name: genre
            }
         });
         newGame.addGenre(genreDB);
      });
      /* let genreDB = await Genre.findAll({
         where: {
            name: genres
         }
      }); */
      //newGame.addGenre(genreDB)
      return res.json(newGame)
   } catch (error) {
      next(error)
   }
});

module.exports = router;

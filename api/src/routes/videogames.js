const { Router } = require('express');
const { Videogame, Genre } = require('../db');
const axios = require('axios')

require("dotenv").config();
const { API_KEY } = process.env;
//!------------------------------------------------------------
const router = Router();

router.get('/', async (req, res, next) => {

   /* let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
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
   res.send(apiGames) */

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
         bgImage: game.bgImage
      }
   });

   res.send(videogameDb)


   /* try {
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
            bgImage: game.bgImage
         }
      });
      const videogamesApi = [];
      let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
      try {
         for (let i = 0; i < 5; i++) {
            let info = await axios.get(url);
            info.data.results.map((juego) => {
               videogamesApi.push({
                  id: juego.id,
                  name: juego.id,
                  release: juego.released,
                  rating: juego.rating,
                  platforms: juego.platforms.map(game => game.platform.name),
                  bgImage: juego.background_image,
                  genres: juego.genres,
               });
            })
            url = info.data.next;
         }
         return videogamesApi
      } catch (error) {
         console.log(error)
      }
      const allGames = [...videogameDb, ...videogamesApi]
      res.status(201).json(allGames);
   } catch (error) {
      next(error)
   } */
});

router.post('/', async (req, res, next) => {
   try {
      const { name, description, release, rating, platforms, bgImage } = req.body
      const newGame = await Videogame.create({
         name,
         description,
         release,
         rating,
         platforms,
         bgImage
      })
      return res.json(newGame)
   } catch (error) {
      next(error)
   }
});

module.exports = router;

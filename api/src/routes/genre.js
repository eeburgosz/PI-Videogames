const { Router } = require('express');
const { Genre } = require('../db');
const axios = require('axios');

require("dotenv").config();
const { API_KEY } = process.env;

const router = Router();
//!------------------------------------------------------------------------------------------
//!      [ ] GET /genres
//!------------------------------------------------------------------------------------------
router.get('/', async (req, res, next) => {
   const genreDb = await Genre.findAll();
   if (genreDb.length === 0) {
      try {
         const allGenresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
         const allGenres = allGenresApi.data.results.map((genres) => genres.name);
         allGenres.forEach((genre) => {
            Genre.findOrCreate({
               where: { name: genre }
            });
         });
         res.json(allGenres);
      } catch (error) {
         next(error);
      }
   } else if (genreDb > 0) {
      res.send(genreDb);
   }
});

/* const genreDb = async () => {
   const genreDb = await Genre.findAll();
   if (genreDb.length === 0) {
      try {
         const allGenresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
         const allGenres = allGenresApi.data.results.map((genres) => genres.name);
         allGenres.forEach((genre) => {
            Genre.findOrCreate({
               where: { name: genre }
            });
         });
         return console.log('Se cargaron los géneros en la DB');
      } catch (error) {
         console.log('Fallo de conexión con la API');
      }
   }
} */

module.exports = router /* { genreDb } */;

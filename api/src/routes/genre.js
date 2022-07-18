const { Router } = require('express');
const { Genre } = require('../db');
require("dotenv").config();
const { API_KEY } = process.env;
const axios = require('axios');
//!------------------------------------------------------------
const router = Router();

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
})

module.exports = router;

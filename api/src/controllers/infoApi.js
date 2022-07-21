require("dotenv").config();
const { API_KEY } = process.env;

const axios = require('axios')

const juegosApi = async () => {
   let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
   const apiGames = [];
   for (let i = 0; i < 5; i++) {
      let dataApi = await axios.get(url);
      dataApi.data.results.map((games) => {
         apiGames.push({
            id: games.id,
            name: games.name,
            released: games.released,
            rating: games.rating,
            platforms: games.platforms.map((e) => e.platform.name),
            background_image: games.background_image,
            genres: games.genres.map((e) => e.name),
         });
      });
      url = dataApi.data.next;
   }
   return apiGames;
}

module.exports = { juegosApi }
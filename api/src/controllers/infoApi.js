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
            description: games.description,
            released: games.released,
            rating: games.rating,
            platforms: games.platforms.map((e) => e.platform.name),
            background_image: games.background_image,
            genres: games.genres.map((e) => e.name),
         });/* 
         let arrPlat = []
         let allPlatforms = []
         dataApi.data.results.map((plat) => {
            arrPlat.push(plat.platforms.map(e => e.platform.name))
         })
         let newArr = []
         arrPlat.map((e) => {
            for (let i = 0; i < arrPlat.length + 1; i++) {
               newArr.push(e[i])
            }
         })
         //console.log(newArr)
         //console.log(arrPlat)
         let arr = []

         newArr.forEach((elemento) => {
            if (!allPlatforms.includes(elemento)) {
               allPlatforms.push(elemento);
            }
         });
         console.log('allPlatforms: ', allPlatforms)
 */
      });
      url = dataApi.data.next;
   }
   return apiGames;
}
/* const platformsApi = async () => {
   let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
   const apiPlat = [];
   for (let i = 0; i < 5; i++) {
      let dataApi = await axios.get(url);
      dataApi.data.results.map(e => {
         apiPlat.push(e.platforms.map(el => el.platform.name))
      })
   }
   console.log(apiPlat)
   return apiPlat
} */

module.exports = { juegosApi }
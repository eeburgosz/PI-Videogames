const { Videogame, Genre } = require('../db');

const juegosDb = async () => {
   const videogameDataBase = await Videogame.findAll({
      include: [{
         model: Genre,
         attributes: ['name'],
         through: {
            attributes: []
         }
      }]
   });
   const videogameDb = videogameDataBase.map((game) => {
      //console.log(game.background_image)
      return {
         id: game.id,
         name: game.name,
         description: game.description,
         release: game.release,
         rating: game.rating,
         platforms: game.platforms,
         background_image: game.background_image || 'https://www.laps4.com/wp-content/themes/child-laps4/assets/img/no-image.jpg',
         genres: game.genres.map(e => e.name)
      }
   });
   return videogameDb;
}
module.exports = { juegosDb }
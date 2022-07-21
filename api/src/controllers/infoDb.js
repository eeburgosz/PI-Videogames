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
      return {
         id: game.id,
         name: game.name,
         description: game.description,
         release: game.release,
         rating: game.rating,
         platforms: game.platforms,
         bgImage: game.bgImage,
         genres: game.genres.map(e => e.name)
      }
   });
   return videogameDb;
}
module.exports = { juegosDb }
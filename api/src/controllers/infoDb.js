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
         released: game.released,
         rating: game.rating,
         platforms: game.platforms,
         background_image: game.background_image || 'https://estaticos.muyinteresante.es/media/cache/760x570_thumb/uploads/images/test/5bd716115bafe8b8983c9872/test-video2.jpg',
         genres: game.genres.map(e => e.name),
         dbCreated: game.dbCreated
      }
   });
   return videogameDb;
}
module.exports = { juegosDb }
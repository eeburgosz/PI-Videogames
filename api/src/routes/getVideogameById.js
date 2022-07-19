const { Router } = require('express');

const router = Router();

router.get('/', async (req, res, next) => {
   res.send('Soy /videogame GET')
});

module.exports = router;

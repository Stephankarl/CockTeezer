const express = require('express');
const router = express.Router();
const Cocktails = require('../js/cocktailsHandler');
const dataHandle = new Cocktails();

router.get('/', (req, res) => {
    const cocktails = dataHandle.get();
    res.render('cocktails/showCocktails', { cocktails: cocktails });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Cocktails = require('../js/cocktailsHandler');
const dataHandle = new Cocktails();

router.get('/', (req, res) => {
    const cocktails = dataHandle.get();
    res.status(200).send(cocktails);
    // res.render('cocktails/cocktails', { cocktails: cocktails });
});

module.exports = router;
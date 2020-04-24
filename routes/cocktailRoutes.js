const express = require('express');
const router = express.Router();
const Cocktails = require('../js/cocktailsHandler');
const dataHandle = new Cocktails();
const Liquor = require('../js/liquorHandle');
const liquorHandle = new Liquor();
const Mixers = require('../js/mixersHandle');
const mixersHandle = new Mixers();
const ContentAndOptionalDataHandle = require('../js/contentAndOptionalHandle');
const allData = new ContentAndOptionalDataHandle();
const contentPath = './data/addedContent.json';
const optionalPath = './data/optional.json';

router.get('/', (req, res) => {
    const cocktails = dataHandle.get();
    res.render('cocktails/showCocktails', { cocktails: cocktails });
    // res.status(200).send(cocktails);
});

//Show form to create new Cocktail
router.get('/new', (req, res) => {
    const liquor = liquorHandle.get();
    const mixers = mixersHandle.get();
    const content = allData.get(contentPath);
    const optional = allData.get(optionalPath);
    res.render('cocktails/addCocktail', {
        liquor: liquor,
        mixers: mixers,
        content: content,
        optional: optional
    });
});

//Show cocktail
router.get('/:id', (req, res) => {
    const allCocktails = dataHandle.get();
    const foundCocktail = allCocktails.find((cocktail) => cocktail.id == req.params.id);
    if(foundCocktail) {
        res.render('cocktails/showIndividualCocktail', { cocktail: foundCocktail });
    } else {
        console.log('Cocktail not found');
        res.redirect('/cocktails');
    }
});

//Getting New cocktail data
router.post('/', (req, res) => {
    
    const allCocktails = dataHandle.get();
    const foundCocktail = allCocktails.find((cocktail) => cocktail.name == req.body.cocktailName);
    if(foundCocktail) {
        console.log('Cocktail Exist');
    } else {
        const newCocktail = {
            "id": `${Date.now()}`,
            "name": req.body.cocktailName,
            "ingrediants": () => {
                let ingrediantsList = [];
                for(let i = 0; i < req.body.liquor.type; i++) {
                    let ingrediantObj = {
                        "type": req.body.liquor.type[i],
                        "category": req.body.liquor.category[i],
                        "name": req.body.liquor.name[i],
                        "quantity": req.body.liquor.quantity[i],
                    }
                    ingrediantsList.push(ingrediantObj);
                }
            }
        };
        dataHandle.add(newCocktail);
        res.redirect('/cocktails/new');
    }
});

module.exports = router;
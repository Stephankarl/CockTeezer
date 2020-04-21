const express = require('express');
const router = express.Router();
const Liquor = require('../js/liquorHandle');
const dataHandle = new Liquor();

//Show all liquor
router.get('/', (req, res) => {
    let liquor = dataHandle.get();
    res.render('liquor/showLiquor', { liquor: liquor });
});

//Receiving new Liquor
router.post('/', (req, res) => {
    //Checking if Liquor exist and adding it.
    let allLiquor = dataHandle.get();
    const foundLiquor = allLiquor.find((liquor) => liquor.name == req.body.name);
    if(foundLiquor) {
        //Will put a flash in here later
        console.log(`${foundLiquor.name} already exist`);
        res.redirect('/liquor');
    } else {
        //Constructing an Obj and adding it.
        const newLiquor = {
            "id": `${Date.now()}`,
            "type": req.body.type,
            "name": req.body.name,
            "category": req.body.category,
            "country": req.body.country,
            "abv": req.body.abv,
            "quantity": req.body.quantity
        }
        dataHandle.add(newLiquor);
        res.redirect('/liquor');
    }
});

//Displaying form for new Liquor
router.get('/new', (req, res) => {
    //Display the form
    res.render('liquor/newLiquor');
});

//Edit Liquor
router.get('/:id/edit', (req, res) => {
    const allLiquor = dataHandle.get();
    const foundLiquor = allLiquor.find((liquor) => liquor.id == req.params.id);
    if(foundLiquor) {
        res.render('liquor/editLiquor', { liquor : foundLiquor });
    } else {
        console.log('Liquor not found.');
        res.redirect('/liquor');
    }
    
});

//Updating the Liquor
router.put('/:id', (req, res) => {
    let allLiquor = dataHandle.get();
    let foundLiquor = allLiquor.find((liquor) => liquor.id == req.params.id);
    foundLiquor = {
        "id": req.params.id, 
        "type": req.body.type,
        "name": req.body.name,
        "category": req.body.category,
        "country": req.body.country,
        "abv": req.body.abv,
        "quantity": req.body.quantity
    }
    dataHandle.updateLiquor(foundLiquor);
    res.redirect('/liquor');
});

//Deleting a Liquor
router.get('/:id', (req, res) => {
    const postId = req.params.id;
    dataHandle.remove(postId);
    res.redirect('/liquor');
});

module.exports = router;
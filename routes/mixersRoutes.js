const express = require('express');
const router = express.Router();
const Mixers = require('../js/mixersHandle');
const dataHandle = new Mixers();

router.get('/', (req, res) => {
    const mixers = dataHandle.get();
    res.render('mixers/showMixers', { mixers : mixers });
});


//New Mixer Form
router.get('/new', (req, res) => {
    res.render('mixers/newMixer');
});

//Adding a new Mixer
router.post('/', (req, res) => {
    const mixer = {
        "id": `${Date.now()}`,
        "type": req.body.type,
        "name": req.body.name,
        "quantity": req.body.quantity,
        "image": ""
    }
    dataHandle.add(mixer);
    res.redirect('/mixers');
});

//Edit Mixer
router.get('/:id/edit', (req, res) => {
    const allMixers = dataHandle.get();
    const foundMixer = allMixers.find((mixer) => mixer.id == req.params.id);
    if(foundMixer) {
        res.render('mixers/editMixer', { mixer: foundMixer });
    } else {
        console.log('Mixer not found.');
        res.redirect('/mixers');
    }
});

//Updating Mixer
router.put('/:id', (req, res) => {
    let allMixers = dataHandle.get();
    let foundMixer = allMixers.find((mixer) => mixer.id == req.params.id);
    if(foundMixer) {
        foundMixer = {
            "id": foundMixer.id,
            "type": req.body.type,
            "name": req.body.name,
            "quantity": req.body.quantity,
            "image": ""
        }
        dataHandle.update(foundMixer);
        res.redirect('/mixers');
    }
});

//Deleting Mixer
router.get('/:id', (req, res) => {
    const allMixers = dataHandle.get();
    const foundMixer = allMixers.find((mixer) => mixer.id == req.params.id);
    if(foundMixer) {
        dataHandle.delete(foundMixer);
        res.redirect('/mixers');
    } else {
        console.log('Mixer not found.');
        res.redirect('/mixers');
    }
});


module.exports = router;
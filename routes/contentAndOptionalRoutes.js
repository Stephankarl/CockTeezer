const express = require('express');
const router = express.Router();
const contentPath = './data/addedContent.json';
const optionalPath = './data/optional.json';
const ContentAndOptionalDataHandle = require('../js/contentAndOptionalHandle');
const dataHandle = new ContentAndOptionalDataHandle();

//Showing Content
router.get('/content', (req, res) => {
    const allContent = dataHandle.get(contentPath);
    res.render('content/showContent', { content: allContent });
});

//Showing Options
router.get('/optional', (req, res) => {
    const allOptions = dataHandle.get(optionalPath);
    res.render('optional/showOptional', { options: allOptions });
});

//Showing add Content form
router.get('/content/new', (req, res) => {
    res.render('content/addContent');
});

//Showing add Options form
router.get('/optional/new', (req, res) => {
    res.render('optional/addOptional');
});

//Add the content
router.post('/content', (req, res) => {
    const allContent = dataHandle.get(contentPath);
    const foundContent = allContent.find((content) => content.type == req.body.type);
    if(foundContent) {
        console.log('Content exist');
        res.redirect('/content');
    } else {
        const newContent = {
            "id": `${Date.now()}`,
            "type": req.body.type
        }
        dataHandle.add(newContent, contentPath);
        res.redirect('/contentoptions/content');
    }
});

//Add the Optional
router.post('/optional', (req, res) => {
    console.log(req.body.type)
    const allOptions = dataHandle.get(optionalPath);
    const foundOption = allOptions.find((option) => option.type == req.body.type);
    if(foundOption) {
        console.log('Content exist');
        res.redirect('/contentoptions/optional');
    } else {
        const newOption = {
            "id": `${Date.now()}`,
            "type": req.body.type
        }
        dataHandle.add(newOption, optionalPath);
        res.redirect('/contentoptions/optional');
    }
});

//Deleting Content
router.get('/content/:id', (req, res) => {
    const postId = req.params.id;
    dataHandle.remove(postId, contentPath);
    res.redirect('/contentoptions/content');
});

//Deleting Optional
router.get('/optional/:id', (req, res) => {
    const postId = req.params.id;
    dataHandle.remove(postId, optionalPath);
    res.redirect('/contentoptions/optional');
});

module.exports = router;
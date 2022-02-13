const express = require('express');
const maincontroller = require('../controllers/mainController')
const mainrouter = express.Router();

//GET /stories: send all stories to the user
mainrouter.get('/', maincontroller.index);


//GET /stories/new: send html form for creating a new story
mainrouter.get('/about', maincontroller.about);


//POST /stories: create a new story
mainrouter.get('/contact', maincontroller.contact);


module.exports = mainrouter;
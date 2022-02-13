const express = require('express');
const controller = require('./../controllers/eventController')
const {isLoggedIn, isAuthor} = require('../middlewares/auth');
const {isvalidateId,validateEvent, validateResults,validateStartEndTime, validateDate, unescapeConnetion} = require('../middlewares/validator');
const router = express.Router();


//GET /stories: send all stories to the user
router.get('/', controller.index);


//GET /stories/new: send html form for creating a new story
router.get('/new',isLoggedIn, controller.new);


//POST /stories: create a new story
router.post('/',isLoggedIn,validateEvent, validateResults,validateDate, validateStartEndTime, controller.create);

//GET /stories/:id : send details of story by id
router.get('/:id',isvalidateId,controller.show);

//GET /stories/:id/edit : send html form for editing an existing story
router.get('/:id/edit',isvalidateId,isLoggedIn, isAuthor, controller.edit);


//PUT /stories/:id : update the story identified by id
router.put('/:id',isvalidateId,isLoggedIn,isAuthor,validateEvent, validateResults,validateDate, validateStartEndTime,  controller.update);

//DELETE /stories/:id : delete story by id
router.delete('/:id',isvalidateId,isLoggedIn, isAuthor, controller.delete);

router.post('/:id/rsvp', isvalidateId, isLoggedIn, controller.rsvp);

// post /connections/:id/rsvp to update the status of the rsvp
router.delete('/rsvp/:id', isvalidateId, isLoggedIn, controller.rsvpDelete);



module.exports = router;
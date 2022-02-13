const {body} = require('express-validator');
const {validationResult} = require('express-validator');
const Event = require('../models/event');
const { compareSync } = require('bcrypt');
const { DateTime } = require("luxon");


exports.isvalidateId = (req, res, next) => {
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    }
    else{
        return next();
    }
}

exports.validateSignup = [   
    body('firstName', 'First Name cannot be empty').notEmpty().trim().escape(),
    body('lastName', 'Last Name cannot be empty').notEmpty().trim().escape(),
    body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(), 
    body('password', 'Password must be atleast 8 characters and atmost 64 characters').isLength({min: 8, max:64})
];

exports.validateLogin = [
    body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(), 
    body('password', 'Password must be atleast 8 characters and atmost 64 characters').isLength({min: 8, max:64})

];

exports.validateDate= (req, res, next)=>{
    let now = new Date(DateTime.now().toFormat("yyyy-LL-dd"));;
    let date = new Date(req.body.date);
    if(date.getTime() < now.getTime()){
        req.flash('error', 'Given date must be greater then today.');
        res.redirect('back');
    }
    next();
};

exports.validateStartEndTime = (req, res, next)=>{
    let date = new Date(req.body.date);
    start = new Date(date.toDateString() + ' ' + req.body.start);
    end = new Date(date.toDateString() + ' ' + req.body.end);
    if(start.getTime() < end.getTime()){
        return next();
    }
    req.flash('error', 'Given end time must be greater than start time.');
    res.redirect('back');
};

exports.validateResults = (req, res, next)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        errors.array().forEach(error=>{
            req.flash('error', error.msg);
        });
        return res.redirect('back');
    }
    else{
        return next();
    }
};

exports.validateEvent = [
    body('topic', 'Event Topic Can not be empty.').notEmpty().trim().escape(), 
    body('title', 'Event title Can not be empty.').notEmpty().trim().escape(),
    body('details', 'Details must be at least 10 characters.').isLength({min: 10}).trim().escape(),
    body('date', 'date Can not be empty and must be a valid date').notEmpty().trim().isDate().escape(),
    body('start', 'startTime Can not be empty.').notEmpty().trim().escape(),
    body('end', 'endTime Can not be empty.').notEmpty().trim().escape(),
    body('location', 'Location Can not be empty.').notEmpty().trim().escape(),
    body('imageURL', 'Image url Can not be empty.').notEmpty().trim()
]
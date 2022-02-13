const Event = require('../models/event');

//Check if user is a guest.
exports.isGuest = (req, res, next)=>{
    if(!req.session.user){
        return next();
    }
    else {
        req.flash('error','You are already logged in');
        return res.redirect('/users/profile');
    }
};

//check if user is logged in
exports.isLoggedIn = (req, res, next) => {
    if(req.session.user){
        return next();
    }
    else {
        req.flash('error','You need to log in first');
        return res.redirect('/users/login');
    }
};

//check if user is an author of the story
exports.isAuthor = (req, res, next) => {
    let id = req.params.id;
    Event.findById(id)
    .then(event=>{
        if(event){
            if(event.host == req.session.user){
                return next();
            }else{
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next(err);
            }
        } else {
            let err = new Error('Cannot find an event with id ' + req.params.id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err));

};
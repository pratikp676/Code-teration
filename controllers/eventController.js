const e = require('express');
const model = require('../models/event');
const RSVP = require('../models/rsvp');
const {body} = require('express-validator');

exports.index = (req,res,next)=>{

    groupByTopic = groupBy("topic");
    
    model.find()
    .then(events=>{
        console.log(groupByTopic(events));
        res.render('./event/connections', {events: groupByTopic(events), user: req.session.user});
        
    })
    .catch(err=>next(err));
};


exports.new = (req,res)=>{
    res.render('./event/newConnection');
};


exports.create = (req,res,next)=>{
 
    let event = new model(req.body); // create a new connection document
    event.host = req.session.user;
    event.save() // Insert a document to the database.
    .then((event)=>{
        req.flash('success', 'Event has been created successfully');
        res.redirect('/event')
    })
    .catch(err=>{
        if(err.name==='ValidationError'){
            req.flash('error', err.message);
            return res.redirect('/back');
        }
        next(err);
    });
};

exports.show = (req,res,next)=>{
    
    let id = req.params.id;
    console.log(id)
    model.findById(id).populate('host','firstName lastName')
    .then(event=>{
        if(event) {
            RSVP.countDocuments({'status':'YES', event: id})
            .then(RSVPcount=>{
            res.render('./event/connection', {event,RSVPcount});
        
        })            
        .catch(err=>next(err));   
        } else {
            let err = new Error('Cannot find an event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.edit = (req,res,next)=>{
   
    let id = req.params.id;
 
    model.findById(id)
    .then(event=>{
        if(event) {
            res.render('./event/edit', {event});
        } else {
            let err = new Error('Cannot find an event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err)); 

};


exports.update = (req,res,next)=>{
   
    let event = req.body;
    let id = req.params.id;
 
    model.findByIdAndUpdate(id, event, {useFindAndModify: false, runValidators:true})
    .then(event=>{
        if (event) {
            req.flash('success', "Event has been updated successfully.");
            res.redirect('/event/'+id);
        } 
        else {
            let err = new Error('Cannot find an event with id ' + id);
             err.status = 404;
             next(err);
        }
    })
    .catch(err=>{
        if(err.name==='ValidationError'){
            req.flash('error', err.message);
            return res.redirect('/back');
        }
        next(err)
        
    });

};

exports.delete = (req,res,next)=>{

    let id = req.params.id;

    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(event=>{
        if(event){
            req.flash('success', 'Event has been deleted successfully');
            res.redirect('/event');
        }
        else {
            let err = new Error('Cannot find an event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));

};


exports.rsvp = (req, res, next)=>{
    let event = req.params.id;
    let user = req.session.user;
    let status = req.body.rsvpstatus.toUpperCase();
    // console.log(status)
    if(!['YES', 'MAYBE', 'NO'].includes(status)){
        req.flash('error', 'status must be from Yes, No or MayBe');
        return res.redirect('back');
    }

    model.findById(event).
    then(con=>{
        if(con){
            if(con.host === user){
                let err = new Error('You are the host for this event so you cannot RSVP!');
                err.status = 401;
                return next(err);
            }
        }
        else{

            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            return next(err);
        }
    }).catch(err=>next(err));
    RSVP.updateOne({event:event, user:user},{
        $set:{
            event:event, 
            user:user, 
            status:status}
    },
    { upsert: true })
    .then(rsvp=>{
        if(rsvp){
            // console.log(rsvp);
            if(rsvp.modifiedCount === 0 && rsvp.upsertedCount === 1){
                req.flash('success', 'Successfully created an RSVP for this connection.');
            }
            else if(rsvp.modifiedCount === 1)
            {
                req.flash('success', 'Successfully updated an RSVP for this connection.');
            }
            res.redirect('/users/profile');
        }
        else{
            req.flash('error', 'There is some problem while an RSPV for this connection. Please try again later.');
        }
    })
    .catch(err=>{
        if(err.name=='ValidationError'){
            req.flash('error', err.message);
            res.redirect('back');
        }
        else{
            next(err);
        }
    });

};

exports.rsvpDelete = (req, res, next)=>{
    let id = req.params.id;
    // console.log('-------------->',id)
    RSVP.findByIdAndDelete(id, {useFindAndModify: false})
    .then(rsvp=>{
        if(rsvp){
            req.flash('success', 'RSVP for this connection has been deleted successfully');
            res.redirect('/users/profile');
        }
        else {
            let err = new Error('Cannot find an RSVP with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};





const groupBy = function groupBy(key) {
    return function group(connections) {
      return connections.reduce((dict, obj) => {
        const property = obj[key];
        dict[property] = dict[property] || [];
        dict[property].push(obj);
        return dict;
      }, {});
    };
  };


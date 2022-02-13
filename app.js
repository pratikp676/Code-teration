//require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const eventRoutes = require('./routes/eventRoutes');
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');
const {exec} = require('child_process');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');



//create app
const app = express();


//configure app
let port = 3000;
let host = 'localhost';
app.set('view engine','ejs');


// connect to database
mongoose.connect('mongodb://localhost:27017/demos', 
    {useNewUrlParser: true, useUnifiedTopology:true})
.then(() => {
        //start the server
        const child = exec('mongo < ./initialize.js');
        if(child.error){
            console.log("Error while initializing\n"+child.error);
        }
        app.listen(port, host, ()=>{
        console.log('Server is running on port', port);
    });
})
.catch(err=> console.log(err.message));


//mount middleware


app.use(session({
    secret: 'cwijhfeui8209f37233dfsiue20',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60*60*1000},
    store: new MongoStore({mongoUrl:'mongodb://localhost:27017/demos'})
}));

app.use((req,res,next)=>{
    console.log(req.session);
    next();
});

app.use(flash());

app.use((req,res,next)=>{
    console.log(req.session);
    res.locals.user = req.session.user||null;
    res.locals.username = req.session.username||null;
    res.locals.successMessages = req.flash('success');
    res.locals.errorMessages = req.flash('error');
    next();
});

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

app.use('/',mainRoutes);
app.use('/event',eventRoutes);
app.use('/users',userRoutes);

app.use((req,res,next)=>{
    let err = new Error('The server cannot locate '+ req.url);
    err.status = 404
    next(err);
})

app.use((err,req,res,next)=>{
    console.log(err.stack);
    if(!err.status) {
        err.status = 500;
        err.message = ('Internal Server Error');
    }
    
    res.status(err.status);
    res.render('error',{error:err});
});

// //start the server
// app.listen(port,host, ()=>{
//     console.log('Server is running on port',port);
// });

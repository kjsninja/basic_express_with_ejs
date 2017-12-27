const path = require('path');

//express
const express = require('express');

//session
const session = require('express-session');

//create instance
const app = express();

//middleware to process POST data
const bodyParser = require('body-parser');

//sample routes
const oauth = require('./routes/oauth');

//import settings
const settings = require('./lib/settings');

//set the template engine into ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// serve the files out of ./public as our main files
app.use(express.static(path.join(__dirname, 'public')));

//declare session middleware
app.use(session({
    secret: 'this.is.super.secret.key', //make this unique and keep it somewhere safe
    saveUninitialized: false,
    resave: false
}));


/**
 * Sample Routes
 * 
 * GET (index page)     /
 * GET                  /oauth/redirect
 */
app.get('/', function(req, res){
    //display hello world
    res.render('index', //render /views/index.ejs
        //pass data to index.ejs
        {
            title: 'Index Page',
            body: 'Hello World'
        }
    );
});

app.use('/oauth', oauth);

module.exports = app;
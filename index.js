"use strict";

const express = require('express');
const mongoose = require('mongoose');
const app = express();
var bodyParser = require('body-parser');
var passport = require('passport');
//var cookieParser = require('cookie-parser');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
//var async = require('async');
//var multer = require('multer');

const PORT = 3000;
var fs = require('fs');









var recipeListJson = { submissions: [] };
// Parses the text file containing data from r/GifRecipes - Async version
fs.readFile(__dirname+'/redditDataRAW.json', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    else{
        recipeListJson = JSON.parse(data);

        // For each recipe scraped, add to DB if doesn't exist already
        for(var i = 0; i < recipeListJson.submissions.length; i++){
            var recipe = recipeListJson.submissions[i];

            if(recipe.title != "Community Guidelines" || recipe.thumbnail == "self") {
                RecipeModel.update({title: recipe.title, created: recipe.created}, {$setOnInsert: recipe}, {upsert: true},
                    function (err, numAffected) {
                        //console.log(numAffected);
                    }
                );
            }
        }

    }
});
//console.log(recipeListJson);
// Might want to do this asynchronously instead - TODO:
//var recipeListJson = JSON.parse(fs.readFileSync(__dirname+'/public/data/redditDataRaw.json', 'utf8'));
//prettyJSON(recipeListJson);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
//app.use(multer()); // for parsing multipart/form-data
app.use(session({ secret: 'this is the secret', resave: true, saveUninitialized: true }));
//app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// Configure a public directory to host static content
//app.use(express.static('public'))
app.use(express.static(__dirname + '/public'));// GET /style.css etc
//app.listen(port, () => console.log('Server running on port 3000'))
app.listen(PORT);



//************************************************************/
// Database Functions & Schema
//************************************************************/

// Handle Mongoose's Promise library being deprecated
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/recipeApp');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("Connected to Database");
});
// Debug Mode for Mongoose
//mongoose.set('debug', true);

// Schema for site User Profile
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    favorites: [ String ]
});

// Schema for site Recipe Profile
var RecipeSchema = new mongoose.Schema({
    title: String,
    author: String,
    thumbnail: String,
    url: String,
    score: Number,
    created: String
});

// Schema for favorited Recipes
var FavoriteSchema = new mongoose.Schema({
    user_id: String,
    recipe_id: String
})

// Mongoose Model for User Data
var UserModel = mongoose.model('UserModel', UserSchema);
// Mongoose Model for Recipe Data
var RecipeModel = mongoose.model('RecipeModel', RecipeSchema);
// Mongoose Model for User Favorites
var FavoriteModel = mongoose.model('FavoriteModel', FavoriteSchema);





//************************************************************/
// Authentication Functions
//************************************************************/

passport.use(new LocalStrategy(
    function (username, password, done) {
        //CALL TO DATABASE AND VERIFY THAT USERNAME/PASSWORD MATCH A VALUE
        UserModel.findOne({username: username, password: password}, function (err, user) {
            if (user) {
                return done(null, user);
            }
            return done(null, false, { message: 'Unable to login' });
        });

    }));

// Serialize User Data
passport.serializeUser(function (user, done) {
    done(null, user);
});

// DeSerialize User Data
passport.deserializeUser(function (user, done) {
    done(null, user);
});

// Authenticates the User
var auth = function (req, res, next) {
    if (!req.isAuthenticated())
        res.send(401);
    else
        next();
};






//************************************************************/
// API Endpoints
//************************************************************/

/*
Login User REST endpoint
RecipeApp - cRud User
 */
app.post('/login', passport.authenticate('local'), function (req, res) {
    console.log("REST::LOGIN ");
    console.log(req.user);
    res.send(req.user);
});

/*
Create User REST endpoint
RecipeApp - Crud User
 */
app.post('/register', function (req, res) {
    UserModel.findOne({ username: req.body.username }, function (err, user) {
        if (user) {
            //Send Custom HTTP Status Code 209 - User found, not created
            res.status(209).send("User Found - Not Created");
        }
        else {
            var newUser = new UserModel(req.body);
            newUser.save(function (err, user) {
                req.login(user, function (err) {
                    if (err) { return next(err); }
                    res.json(user);
                });
            });
        }
    });
});

// Logs the user out of the application
app.post('/logout', function (req, res) {
    req.logOut();
    res.send(200);
});





// Recipes Endpoint
app.get('/recipes', function (req, res) {
    console.log("REST::Recipes ");
    RecipeModel.find({},function(err, recipes) {
        if(err){
            res.send(err);
        }
        else{
            for(var rec in recipes){
                //console.log(recipes[rec]);
                if(recipes[rec].thumbnail == "self"){
                    recipes.splice(rec, 1);
                }
            }
            res.json(recipes);
        }
    });
});

// Add to Favorites Endpoint
app.post('/favorite', function (req, res) {
    console.log("REST::Favorite ");
    UserModel.findOneAndUpdate({ _id: req.body._id }, req.body, { upsert:true,  new : true }, function(err, doc){
        if (err) {
            return res.send(500, { error: err });
        }
        else{
            console.log(doc);
            return res.send(doc);
        }
    });
});

// Delete from Favorites Endpoint
app.post('/deleteFavorite', function (req, res) {
    console.log("REST::Delete Favorite ");
    UserModel.findByIdAndUpdate(mongoose.mongo.ObjectID(req.body.userId),
        { '$pull': { 'favorites': req.body.favId }}, function(err, docs){
            return res.send(docs);
        });
});


// Get a User's Favorites Endpoint
app.post('/getFavorites', function (req, res) {
    console.log("REST::Get Favorites ");
    RecipeModel.find({
        '_id': { $in: req.body }
    }, function(err, docs){
        console.log(docs);
        return res.send(docs);
    });
});


// Server Running Message
console.log("REDDIT GIFRECIPES NODE APP RUNNING!!!!!!!!!!!!!!!!!");

//************************************************************/
// Utility Functions
//************************************************************/

// Prints a pretty JSObject to console
function prettyJSON(obj) {
    console.log(JSON.stringify(obj, null, 6));
}

// Gets the current date in human readable format
function getCurrentDate(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 

	today = mm+'/'+dd+'/'+yyyy;
	return today;
}

var exports = module.exports = {};
exports.AddNumber = function(a,b)
{
    return a+b;
};

// For testing Jasmine
exports.helloWorld = function() {
    return 'Hello world!';
}

var testExp1 = function () {
    return "Test Successful";
}


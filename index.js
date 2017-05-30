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
var port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
//app.use(multer()); // for parsing multipart/form-data
app.use(session({ secret: 'this is the secret' }));
//app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// Configure a public directory to host static content
//app.use(express.static('public'))
app.use(express.static(__dirname + '/public'));// GET /style.css etc
//app.listen(port, () => console.log('Server running on port 3000'))
app.listen(port);

mongoose.connect('mongodb://localhost/recipeApp');

// Schema for site User Profile
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
});

// Mongoose Model for User data
var UserModel = mongoose.model('UserModel', UserSchema);



//var MongoClient = require('mongodb').MongoClient;

// // Connect to the db
// MongoClient.connect("mongodb://localhost:27017", function (err, db) {
   
//      if(err) throw err;
//      //Write databse Insert/Update/Query code here..
// });

passport.use(new LocalStrategy(
    function (username, password, done) {
        //for (var u in users) {
        //  if (username == users[u].username && password == users[u].password) {
        //    return done(null, users[u]);
        //  }
        //}
        //return done(null, false, { message: 'Unable to login' });

        //CALL TO DATABASE AND VERIFY THAT USERNAME/PASSWORD MATCH A VALUE
        UserModel.findOne({username: username, password: password}, function (err, user) {
            //console.log(docs);
            if (user) {
                return done(null, user);
            }
            return done(null, false, { message: 'Unable to login' });
        });

    }));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

var auth = function (req, res, next) {
    if (!req.isAuthenticated())
        res.send(401);
    else
        next();
};


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
    //console.log("REST::REGISTER ");
    //console.log(req.body);
    UserModel.findOne({ username: req.body.username }, function (err, user) {
        if (user) {
            //Send Custom HTTP Status Code 209 - User found, not created
            res.status(209).send("User Found - Not Created");
        }
        else {
            var newUser = new UserModel(req.body);
            //newUser.roles = ['student'];

            newUser.save(function (err, user) {
                req.login(user, function (err) {
                    if (err) { return next(err); }
                    res.json(user);
                });
            });

        }
    });
    var newUser = req.body;
    console.log(newUser);
});


app.post('/logout', function (req, res) {
    req.logOut();
    res.send(200);
});


console.log("REDDIT GIFRECIPES NODE APP RUNNING!!!!!!!!!!!!!!!!!");


// Parses the text file containing data from r/GifRecipes
fs = require('fs')
fs.readFile('pyScraper/data/redditDataRAW.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  //console.log(data);
});



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
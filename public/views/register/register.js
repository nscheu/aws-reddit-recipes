"use strict";

/*
Controller for New User Registration
 */
recipeApp.controller('RegisterCtrl', function ($location, $scope, $http) {
    $scope.regUser = {
        username: "",
        password: "",
        passwordVal: ""
    };
    $scope.registerUser = function (userUnsan) {
        var user = sanitizeRegUserInput(userUnsan);
        //console.log(user);
        if(user.password == user.passwordVal){
            //console.log("Passwords Match");
            var cleanUser = {
                username: user.username,
                password: user.password,
                favorites: []
            }
            $http.post('/register', cleanUser)
                .success(function (response) {
                    //console.log("Database Success");
                    //console.log(cleanUser);
                    // Redirect to profile page
                    //$location.url("/profile");
                });
        }
        else{
            alert("Passwords Don't Match");
        }
   }
});

var sanitizeRegUserInput = function (user){
    var sanitizedUser = user;
    //Do Sanitization here
    return sanitizedUser;
};


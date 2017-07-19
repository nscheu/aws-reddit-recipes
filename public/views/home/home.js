"use strict";
/*
 Controller for Home View - Shows global list of recipes
 */
recipeApp.controller('HomeCtrl', function($scope, $http, $rootScope, SecurityService) {
    $scope.favorites = [];
    $http.get("/recipes")
         .then(function (response) {
             //console.log(response);
             $scope.recipes = response.data;
         });

    $scope.saveFavorite = function(recipe_id) {
        $scope.favorites.push(recipe_id);
        var favObj = {
            _id: $rootScope.currentUser._id,
            favorites: $scope.favorites
        }
        $http.post("/favorite", favObj)
            .success(function (response) {
                //console.log(response);
                $rootScope.currentUser.favorites.push(recipe_id);
            })
            .error(function(err) {
                console.log(err);
            });
    }


// For testing
    $scope.testData = {};
    $scope.populateTestData = function (){
        $scope.testData = { success: true, value: 101 };
    }

});

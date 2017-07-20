"use strict";

/*
 Controller for User Profile - Includes favoriting functions
 */
recipeApp.controller('ProfileCtrl', function($scope, $http, $rootScope, ngNotify) {
    //console.log("Profile Loaded");
    //$scope.favoriteRecipes = [];
    $http.post("/getFavorites", $rootScope.currentUser.favorites)
        .success(function (response) {
            $scope.favoriteRecipes = response;
        })
        .error(function(err) {
            console.log(err);
        });

// Deletes a Favorite from the Model and the View
    $scope.deleteFavorite = function(recipe_id){
        // Object wrapper to send to API - sends current User ID and Recipe ID to be deleted
        var favObj = {
            userId: $rootScope.currentUser._id,
            favId: recipe_id
        }
        $http.post("/deleteFavorite", favObj)
            .success(function (response) {
                // Updates the current users favorite list
                for(var i = 0; i < $scope.favoriteRecipes.length; i++){
                    if($scope.favoriteRecipes[i]._id === recipe_id){
                        $scope.favoriteRecipes.splice(i, 1);
                    }
                }
                $rootScope.currentUser.favorites.splice($rootScope.currentUser.favorites.indexOf(recipe_id), 1);
                ngNotify.set('Favorite Deleted!', { type: 'info', duration: 750 });
            })
            .error(function(err) {
                ngNotify.set('Error!', { type: 'error', duration: 750 });
            });
    }
});

recipeApp.controller('ProfileCtrl', function($scope, $http, $rootScope, $location) {
    //$scope.favoriteRecipes = $rootScope.currentUser.favorites;
    console.log("Profile Loaded");
    $http.post("/getFavorites", $rootScope.currentUser.favorites)
        .success(function (response) {
            console.log(response);
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
                $rootScope.currentUser.favorites.splice($rootScope.currentUser.favorites.indexOf(recipe_id, 1));
                // Map searches the favorites list to find the index of the given recipe
                var favIndex = $scope.favoriteRecipes.map(function(x) {return x._id; }).indexOf(recipe_id);
                // Removes the recipe from the favorites list
                $scope.favoriteRecipes.splice(favIndex, 1);
            })
            .error(function(err) {
                console.log(err);
            });
    }
});

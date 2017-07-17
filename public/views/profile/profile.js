recipeApp.controller('ProfileCtrl', function($scope, $http, $rootScope) {
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

                // Map searches the favorites list to find the index of the given recipe
                for(var i = 0; i < $scope.favoriteRecipes.length; i++){
                    if($scope.favoriteRecipes[i]._id === recipe_id){
                        console.log("Match found")
                        $rootScope.currentUser.favorites.splice($rootScope.currentUser.favorites.indexOf(recipe_id, 1));
                        $scope.favoriteRecipes.splice(i, 1);
                    }
                }
                // $scope.favoriteRecipes.forEach(function(element){
                //     console.log(element);
                //     if(element._id === recipe_id){
                //         console.log("Match found")
                //         $scope.favoriteRecipes.splice($scope.favoriteRecipes.indexOf(element), 1);
                //     }
                // });
                //var favIndex = $scope.favoriteRecipes.map(function(x) {return x._id; }).indexOf(recipe_id);
                // Removes the recipe from the favorites list
                //$scope.favoriteRecipes.splice(favIndex, 1);
            })
            .error(function(err) {
                console.log(err);
            });
    }
});

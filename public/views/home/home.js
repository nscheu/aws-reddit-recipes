recipeApp.controller('HomeCtrl', function($scope, $http, $rootScope, $location) {
     $http.get("/recipes")
         .then(function (response) {
             console.log(response);
             $scope.recipes = response.data;
         });
         // .success(function (resource) {
         //     console.log(resource);
         //     $scope.recipes = resource;
         // });

    $scope.saveFavorite = function(recipe_id) {
        //console.log(recipe_id);
        //console.log($rootScope.currentUser._id);
        $rootScope.currentUser.favorites.push(recipe_id);
        console.log($rootScope.currentUser);
        var favObj = {
            //user_id: $rootScope.currentUser._id,
            //recipe_id: recipe_id,
            //favorites:
        }
        $http.post("/favorite", $rootScope.currentUser)
            .success(function (response) {
                //console.log(response);
                $rootScope.currentUser = response;
            })
            .error(function(err) {
                alert(err);
            });
    }
});

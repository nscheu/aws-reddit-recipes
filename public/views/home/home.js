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
        var favObj = {
            user_id: $rootScope.currentUser._id,
            recipe_id: recipe_id
        }
        $http.post("/favorite", favObj)
            .success(function (response) {
                console.log(response);
                //$scope.recipes = response.data;
            })
            .error(function(err) {
                alert(err);
            });
    }
});

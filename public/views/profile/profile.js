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

});

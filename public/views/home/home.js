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
});

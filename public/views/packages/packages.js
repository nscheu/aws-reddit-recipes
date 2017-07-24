"use strict";
/*
 Controller for Packages View - Shows list of packages in project
 */
recipeApp.controller('PackCtrl', function($scope, $http) {
    $scope.packages = [];
    $http.get("/packages").then(function (response) {
            $scope.packages = Array.from(new Set(response.data[0].packages));
    });
});
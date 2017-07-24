"use strict";
/*
 Controller for Home View - Shows global list of recipes
 */
recipeApp.controller('HomeCtrl', function($scope, $http, $rootScope, SecurityService, ngNotify) {
    $scope.recipes = [];
    $scope.pagesize = 5;
    $scope.pagelist = []
    $scope.pageNumbers = [];
    $scope.pageSizeRange = [3, 4, 5, 6, 7, 8, 9, 10];


        $http.get("/recipes")
         .then(function (response) {
             //console.log(response);
             $scope.recipes = response.data;
             $scope.pageNumbers = $scope.getPageNumbers();
             $scope.selectedPage = $scope.pageNumbers[0];
             $scope.pagelist = $scope.getPageData();

         });

    $scope.saveFavorite = function(recipe_id) {
        $scope.favorites.push(recipe_id);
        var favObj = {
            _id: $rootScope.currentUser._id,
            favorites: $scope.favorites
        }
        $http.post("/favorite", favObj)
            .success(function (response) {
                console.log(response);
                if($rootScope.currentUser.favorites.indexOf(recipe_id) === -1){
                    $rootScope.currentUser.favorites.push(recipe_id);
                    ngNotify.set('Success!', { type: 'info', duration: 750 });
                }
                else{
                    ngNotify.set('Already Favorited!', { type: 'warn', duration: 750 });
                }

            })
            .error(function(err) {
                ngNotify.set('Error!', { type: 'error', duration: 750 });
                //console.log(err);
            });
    }


    /*
    Pagination Implementation
     */


    $scope.getPageData = function () {
        var hilimit = $scope.pagesize * $scope.selectedPage;
        var lolimit = hilimit - $scope.pagesize;
        $scope.getPageNumbers();
        return $scope.recipes.slice(lolimit, hilimit);
    }

    $scope.updatePageData = function () {
        $scope.pagelist = $scope.getPageData();
    }

    $scope.isLeftEnabled = function () {
        return $scope.selectedPage > 1;
    }

    $scope.isRightEnabled = function () {
        return $scope.selectedPage < Math.floor($scope.recipes.length / $scope.pagesize) + 1;
    }

    $scope.pageRight = function () {

        $scope.selectedPage = $scope.pageNumbers[$scope.selectedPage];
        $scope.leftEnabled = $scope.isLeftEnabled();
        $scope.rightEnabled = $scope.isRightEnabled();
        $scope.pagelist = $scope.getPageData();

    }

    $scope.pageLeft = function () {
        $scope.selectedPage = $scope.pageNumbers[($scope.selectedPage - 2)];
        $scope.pagelist = $scope.getPageData();
    }

    $scope.getPageNumbers = function () {
        var pn = [];
        var upperlimit = $scope.recipes.length / $scope.pagesize;
        for(var index = 1; index < upperlimit + 1; index++){
            pn.push(index);
        }
        return pn;
    }

    $scope.changePageSize = function () {
        $scope.pageNumbers = $scope.getPageNumbers();
        $scope.selectedPage = $scope.pageNumbers[0];
        $scope.updatePageData();
    }


    $scope.leftEnabled = $scope.isLeftEnabled();
    $scope.rightEnabled = $scope.isRightEnabled();





});

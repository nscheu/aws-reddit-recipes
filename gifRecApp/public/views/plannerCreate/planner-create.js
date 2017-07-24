/**
 * Created by nic on 7/21/17.
 */
/**
 * Created by nic on 7/21/17.
 */
"use strict";

/*
 Controller for Login - Moved Login functions to Security Service
 */
recipeApp.controller('PlannerCreateCtrl', function ($location, $scope, $http, $rootScope, ngNotify ) {
    // Sets the background image for the planning view
    $('body').css('background-image', 'url(' + '/img/road_bg.jpg' + ')');
    // Changes the background image back when leaving the planner view
    $scope.$on("$destroy", function () {
        $('body').css('background-image', 'url(' + '/img/kit_bg.jpg' + ')');
    });

    $rootScope.currentUser = { _id: "592cacf4ba52f70c2f830407", username: "a", password: "a" }

    $scope.tempPlan = {};
    $scope.tempComp = {};
    $scope.tempTut = {};
    //$scope.planState = [ "name", "component" ];
    $scope.planState = "name";

    $scope.togglePlanState = function (state) {
        $scope.planState = state;
        //$scope.planState = !$scope.planState;
    }


    $scope.savePlan = function() {

    }

    $scope.clearPlan = function() {
        $scope.tempPlan = {};
    }

    $scope.saveComp = function() {

    }

    $scope.clearComp = function() {
        $scope.tempComp = {};
    }

    $scope.saveTut = function() {

    }

    $scope.clearTut = function() {
        $scope.tempTut = {};
    }

});
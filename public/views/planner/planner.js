/**
 * Created by nic on 7/21/17.
 */
"use strict";

/*
 Controller for Login - Moved Login functions to Security Service
 */
recipeApp.controller('PlannerCtrl', function ($location, $scope, $http, $rootScope, ngNotify ) {
    // Sets the background image for the planning view
    $('body').css('background-image', 'url(' + '/img/road_bg.jpg' + ')');
    // Changes the background image back when leaving the planner view
    $scope.$on("$destroy", function(){
        $('body').css('background-image', 'url(' + '/img/kit_bg.jpg' + ')');
    });

    // For testing purposes
    $rootScope.currentUser = { _id: "592cacf4ba52f70c2f830407", username: "a", password: "a" }


    $http.post('/getPlans', { id: $rootScope.currentUser._id })
        .success(function (response) {
            if(response){
                console.log(response);
                ngNotify.set('Plans Found!', { type: 'info', duration: 750 });
            }
        });



var data = {
    user_id: "1999991",
    username: "handleBars",
    plans: [
        {   title: 'SampleTitle',
            components: [
                {
                    title: 'Node',
                    description: 'NodeJS for Server Tech',
                    url: "www.nodejs.org",
                    componentTutorials: [
                        {
                            title: 'How to node',
                            url: 'fakesite.fak/howtonode'
                        },
                        {
                            title: 'How to node Part 2',
                            url: 'fakesite.fak/howtonode-Part2'
                        },
                        {
                            title: 'How to node Part 3',
                            url: 'fakesite.fak/howtonode-Part3'
                        }]
                },
                {
                    title: 'Express',
                    componentDescription: 'Express Routing and Messaging',
                    url: 'expressjs.com',
                    componentTutorials: [
                        {
                            title: 'How to Express',
                            url: 'fakesite.fak/howtoexpress'
                        } ]
                }]
        } ]
}




    $scope.remove = function(scope) {
        scope.remove();
    };

    $scope.toggle = function(scope) {
        scope.toggle();
    };

    $scope.moveLastToTheBeginning = function() {
        var a = $scope.plans.pop();
        $scope.plans.splice(0, 0, a);
    };

    $scope.newSubItem = function(scope) {
        var nodeData = scope.currentPlan;
        nodeData.components.push({
            id: nodeData.id * 10 + nodeData.components.length,
            title: nodeData.title + '.' + (nodeData.components.length + 1),
            nodes: []
        });
    };

    $scope.collapseAll = function() {
        $scope.$broadcast('angular-ui-tree:collapse-all');
    };

    $scope.expandAll = function() {
        $scope.$broadcast('angular-ui-tree:expand-all');
    };




    $scope.username = "User Not Signed In";
    if($rootScope.currentUser){
        $scope.username = $rootScope.currentUser.username;
    }
    $scope.user_id = data.user_id;
    // The test data can contain multiple plans per user - can select plan in the view
    $scope.appTitle = data.plans[0].title;
    // Use the current plan to choose the plan to display in the tree
    // Must pass object into array for angular ui tree to work correctly - fixes indexOf issue
    $scope.currentPlan = data.plans[0].components ;
    //$scope.createPlanModalShown = false;
    $scope.selectedPlan = $scope.currentPlan.title;

    $scope.tempPlan = {};
    $scope.tempComponents = [];


    $scope.openCreateModal = function() {
        console.log("OpenCreateModal clicked");
        //$scope.createPlanModalShown = true;
        $("#createPlanModal").modal('show');
    }

    $scope.savePlan = function() {
        var planToSave = {
            title: $scope.tempPlan.title,

        }
    }


});
"use strict";

// /**
//  * Created by nic on 5/21/17.
//  */
var recipeApp = angular.module('recipeApp', ['ngRoute', 'ngNotify']);

// Configure the Routing for the app
recipeApp.config(function($routeProvider, $httpProvider) {
    //$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|sms|tel):/);
    $routeProvider
        .when('/', {
            templateUrl: '/views/home/home.html',
            controller: 'HomeCtrl'
        })
        .when('/login', {
            templateUrl: '/views/login/login.html',
            controller: 'LoginCtrl'
        })
        .when('/profile', {
            templateUrl: '/views/profile/profile.html',
            controller: 'ProfileCtrl'
        })
        .when('/register', {
            templateUrl: '/views/register/register.html',
            controller: 'RegisterCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

    $httpProvider
        .interceptors
        .push(function($q, $location){
            return {
                response: function(response) {
                    return response;
                },
                responseError: function(response){
                    if(response.status === 401)
                        $location.url('/login');
                    return $q.reject(response);
                }
            };
        });
});



var checkLoggedIn = function ($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();

    $http.get('/loggedin').success(function (user) {
        //console.log('checkLoggedIn');
        //console.log(user);

        $rootScope.errorMessage = null;
        //User is Authenticated
        if (user !== '0') {
            $rootScope.currentUser = user;
            deferred.resolve();
        }
        //User is Not Authenticated
        else {
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
            $location.url('/login');
        }
    });
    return deferred.promise;
}




















recipeApp.controller('createUserController', function($scope) {
    $scope.createdUsers = [{
        username: 'un',
        password: 'un09'
    }];

    $scope.createdUser = {
        username: '',
        password: ''
    };

    $scope.createUserSubmit = function (cu){
        //console.log("Create User Submit Called");
        $scope.createdUser = cu;
        $scope.createdUsers.indexOf(cu) === -1 ? $scope.createdUsers.push(cu) : console.log("This item already exists")
        //console.log($scope.createdUser);
        //console.log("resetting user");
        $scope.createdUser = {};
    }
});









/*
NavCtrl controller for Navigation Menu - Accesses Security Service for User Login/Out
 */
recipeApp.controller('NavCtrl', function ($scope, $http, $location, SecurityService, $rootScope) {

    $scope.login = function (user) {
        //console.log("NavCtrl");
        SecurityService.login(user, function(response){
            // if(err) {
            //     console.log(err);
            // }
            // else{
                //console.log(response);
                //$rootScope.currentUser = response;
                $location.url("/home");
            //}
    });
    }

    $scope.logout = function() {
        $http.post('/logout')
            .success(function(){
                $rootScope.currentUser = null;
                $location.url("/home");
            })
    }
});

/*
Security Service for User Login/Out
 */
recipeApp.factory('SecurityService', function ($http, $location, $rootScope, ngNotify) {

    var login = function (user, callback) {
        //console.log("Factory Login");
        $http.post('/login', user)
            .success(function(user){
                $rootScope.currentUser = user;
                callback(user);
            })
            .error(function(error){
                if(error == "Unauthorized"){
                    ngNotify.set('User Not Found!', { type: 'error', duration: 750 });
                }
                else{
                    ngNotify.set('Login Error!', { type: 'error', duration: 750 });
                }
                //console.log(error);
            });
    }

    var logout = function(callback) {
        $http.post('/logout')
            .success(function(){
                $rootScope.currentUser = null;
                callback();
            })
    }
    return {
        login: login,
        logout: logout
    }
});
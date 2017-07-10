recipeApp.controller('LoginCtrl', function ($location, $scope, $http, $rootScope) {
    $scope.loginUser = function (user) {
        console.log("Login User - ctrlFunc");
        console.log(user);
        $http.post('/login', user)
            .success(function (response) {
                console.log("Login Success");
                //console.log(response);
                $rootScope.currentUser = response;
                //console.log(user);
                $location.url("/profile");
            }).error(function(err) {
                alert(err);
            })
    }
});
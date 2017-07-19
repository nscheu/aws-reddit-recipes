/**
 * Created by nic on 7/18/17.
 * This is the test suite for the home controller
 */
var base_url = "http://localhost:3000/"

describe('HomeCtrl', function() {
    it("verifies karma is working", function () {
        expect(true).toEqual(true);
    })
    // beforeEach(angular.mock.modules('recipeApp'));
    //
    // var $controller;
    //
    // beforeEach(inject(function(_$controller_){
    //     // The injector unwraps the underscores (_) from around the parameter names when matching
    //     $controller = _$controller_;
    // }));
    //
    // describe('$scope.testData', function() {
    //     it('sets the test data to { success: true, value: 101 }', function() {
    //         //expect(true).toEqual(true);
    //         var $scope = {};
    //         var controller = $controller('HomeCtrl', { $scope: $scope });
    //         $scope.testData = {};
    //         $scope.populateTestData();
    //         expect($scope.testData.value).toEqual(101);
    //         expect($scope.testData.success).toEqual(true);
    //     });
    // });
});
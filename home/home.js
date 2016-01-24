var Home = angular.module('myApp');

Home.controller("homeCtrl", ['$http','$scope','$templateCache','$location','$rootScope','getService', function($http, $scope, $templateCache, $location, $rootScope, getService){



  $rootScope.home_data = [];


    // This service's function returns a promise, but we'll deal with that shortly

    getService.get('projects')
    // then() called when son gets back
    .then(function(data) {

        $rootScope.home_data = data;

        console.log(data);

        $rootScope.pageLoading = false;



    }, function(error) {
        // promise rejected, could log the error with: console.log('error', error);

    });



}]);

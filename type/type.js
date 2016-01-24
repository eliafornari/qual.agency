var Type = angular.module('myApp');

Type.controller("typeCtrl", ['$http','$scope','$templateCache','$location','$rootScope','getService','$routeParams','detailService', function($http, $scope, $templateCache, $location, $rootScope, getService, $routeParams, detailService){



    $rootScope.design_id = $routeParams.id;
    console.log("$routeParams.id: "+$routeParams.id);
    $rootScope.type_detail =[];
    $scope.typeName = "type";





    detailService.get({category: $scope.typeName, id: $routeParams.id}, function(data){

      console.log(data);
      $rootScope.type_detail = data;

    });





}]);

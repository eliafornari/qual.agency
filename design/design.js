var Design = angular.module('myApp');

Design.controller("designCtrl", ['$http','$scope','$templateCache','$location','$rootScope','getService', function($http, $scope, $templateCache, $location, $rootScope, getService){




  $rootScope.design_id = $routeParams.id;
  console.log("$routeParams.id: "+$routeParams.id);
  $rootScope.design_detail =[];
  $scope.designName = "design";





  detailService.get({category: $scope.designName, id: $routeParams.id}, function(data){

    console.log(data);
    $rootScope.design_detail = data;

  });



}]);

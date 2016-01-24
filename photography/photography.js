var Photography = angular.module('myApp');

Photography.controller("photographyCtrl", ['$http','$scope','$templateCache','$location','$rootScope','detailService','$routeParams', function($http, $scope, $templateCache, $location, $rootScope, detailService, $routeParams){


$rootScope.photgraphy_id = $routeParams.id;
console.log("$routeParams.id: "+$routeParams.id);
$rootScope.photography_detail =[];
$scope.photographyName = "photography";





detailService.get({category: $scope.photographyName, id: $routeParams.id}, function(data){

  console.log(data);
  $rootScope.photography_detail = data;

});


}]);

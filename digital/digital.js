var Digital = angular.module('myApp');

Digital.controller("digitalCtrl", ['$http','$scope','$templateCache','$location','$rootScope','detailService','$routeParams','$sce', function($http, $scope, $templateCache, $location, $rootScope, detailService, $routeParams, $sce){


  $rootScope.digital_id = $routeParams.id;
  console.log("$routeParams.id: "+$routeParams.id);
  $rootScope.digital_detail =[];
  $scope.iframeURL ="";





  detailService.get({category: "digital", id: $routeParams.id}, function(data){

    console.log(data);
    $rootScope.digital_detail = data;

    $scope.base = data.url;
    $scope.iframeURL = $sce.trustAsResourceUrl($scope.base);

    $scope.base_video = 'https://player.vimeo.com/video/'+ data.video+'?color=ffffff&title=0&portrait=0' ;
    $scope.videoURL = $sce.trustAsResourceUrl($scope.base_video);

  });


}]);

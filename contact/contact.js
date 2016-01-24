
// Declare app level module which depends on views, and components
var Contact = angular.module('myApp');


Contact.controller("contactCtrl", ['$http','$scope','$templateCache','$location','$rootScope', function($http, $scope, $templateCache, $location, $rootScope){

}])


.directive('contactDirective', function(){
  return{
    restrict: 'E',
    templateurl: 'contact/contact.html',
    link: function(){


    }
  }
});

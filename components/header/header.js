var Header = angular.module('myApp');

Header.controller("headerCtrl", ['$http','$scope','$templateCache','$location','$rootScope','getService', function($http, $scope, $templateCache, $location, $rootScope, getService){

}])

.directive('rubikDirective', function(){
	return{
		restrict: 'E',
		templateUrl: 'components/header/rubik.html',
		link: function(){

		}
	}
})

.directive('headerDirective', function(){
	return{
		restrict: 'E',
		templateUrl: 'components/header/header.html',
		link: function(){

		}
	}
});

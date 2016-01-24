'use strict';

// Declare app level module which depends on views, and components
var App = angular.module('myApp', [
    'ngRoute',
    'ngResource',
    'ngAnimate',
    'myApp.Routes',
    'myApp.Services'
]);

App.controller("appCtrl", ['$http','$scope','$templateCache','$location','$rootScope','$window', function($http, $scope, $templateCache, $location, $rootScope,$window){
    $scope.$on('$viewContentLoaded', function(){
        setTimeout(function(){

            var header = jQuery("#header"),
                header_height = header.innerHeight(),
                rubik = jQuery("#rubik"),
                rubik_logo = jQuery("#rubik-logo");

            var site_functions = function(){
                var img = jQuery('img');
                img.each(function(){
                    new RetinaImage(this);
                });
            }
            site_functions();

            $rootScope.rubik_stick= function(){
                rubik.css('margin-top',header_height + 'px');
                jQuery($window).bind('scroll.body',function(){
                    var window_scroll = jQuery($window).scrollTop();
                    if(window_scroll > header_height - 30){
                        rubik_logo.css({
                            'position':'fixed',
                            'top':'30px'
                        });
                    }else{
                        rubik_logo.css({
                            'position':'relative',
                            'top':'0'
                        })
                    }
                });
            }
            $rootScope.rubik_stick();

        },600);
    });
}])

.directive('googleAnalytics', function(){
    return{
        restrict: 'A',
        link: function(){

        }
    }
});
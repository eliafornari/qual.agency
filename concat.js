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
    // $scope.$on('$viewContentLoaded', function(){
    //     setTimeout(function(){
    //
    //         var header = jQuery("#header"),
    //             header_height = header.innerHeight(),
    //             rubik = jQuery("#rubik"),
    //             rubik_logo = jQuery("#rubik-logo");
    //
    //         var site_functions = function(){
    //             var img = jQuery('img');
    //             img.each(function(){
    //                 new RetinaImage(this);
    //             });
    //         }
    //         site_functions();
    //
    //         $rootScope.rubik_stick= function(){
    //             rubik.css('margin-top',header_height + 'px');
    //             jQuery($window).bind('scroll.body',function(){
    //                 var window_scroll = jQuery($window).scrollTop();
    //                 if(window_scroll > header_height - 30){
    //                     rubik_logo.css({
    //                         'position':'fixed',
    //                         'top':'30px'
    //                     });
    //                 }else{
    //                     rubik_logo.css({
    //                         'position':'relative',
    //                         'top':'0'
    //                     })
    //                 }
    //             });
    //         }
    //         $rootScope.rubik_stick();
    //
    //     },600);
    // });
}])

.directive('googleAnalytics', function(){
    return{
        restrict: 'A',
        link: function(){

        }
    }
});

/*
  Configure routes used with ngRoute. We chose not to use $locationProvider.html5Mode(true);
  because using HTML5 pushstate requires that server routes are setup to mirror the routes
  in this file. Since this isn't a node course we're going to skip it. For all intensive
  purposes, html5 mode and url hash mode perform the same when within an angular app.
*/
angular.module('myApp.Routes', ['ngRoute', 'ngAnimate', 'ngResource'])

.config(['$routeProvider', '$locationProvider' , function($routeProvider, $locationProvider) {


  // use the HTML5 History API
  $locationProvider.html5Mode(true);

  $routeProvider


  // $locationChangeStart

    .when('/design/:id', {
      templateUrl: 'design/design.html',
      controller: 'designCtrl'
    })

    .when('/digital/:id', {
      templateUrl: 'digital/digital.html',
      controller: 'digitalCtrl'
    })

    .when('/type/:id', {
      templateUrl: 'type/type.html',
      controller: 'typeCtrl'
    })

    // .when('/type', {
    //   templateUrl: 'type/type.html',
    //   controller: 'typeCtrl'
    // })

    .when('/photography/:id', {
      templateUrl: 'photography/photography.html',
      controller: 'photographyCtrl'
    })




    /*............................. Take-all routing ........................*/


    .when('/', {
      // redirectTo: 'matthew30matthew30matthew'
      templateUrl: 'home/home.html',
      controller: 'homeCtrl',
      resolve: {
             function($q, $timeout) {
                var deferred = $q.defer();
                $timeout(function(){
                    return deferred.resolve();
                }, 200);
                return deferred.promise;
            }
        }

    })


    // put your least specific route at the bottom
    .otherwise({redirectTo: '/'})






}])

.controller('routeController', function($scope, $location, $rootScope, $routeParams, $timeout){

  $rootScope.location = $location.path();
  // console.log($rootScope.location)


  $scope.isRouteLoading = false;

  $rootScope.$on('$routeChangeStart', function() {
    $rootScope.location = $location.path();
    $rootScope.hash = $location.hash();
    // console.log($rootScope.location)
    $rootScope.rootCollection = $routeParams.collection;
    $rootScope.rootSeason = $routeParams.season;


  });//routeChangeStart























//..............................................................................mobile


//....this is the function that checks the header of the browser and sees what device it is

$rootScope.checkDevice = {
      Android: function() {
          return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function() {
          return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function() {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function() {
          return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
          return navigator.userAgent.match(/IEMobile/i);
      },
      any: function() {
          return ($rootScope.checkDevice.Android() || $rootScope.checkDevice.BlackBerry() || $rootScope.checkDevice.iOS() || $rootScope.checkDevice.Opera() || $rootScope.checkDevice.Windows());
      }
  };

//........checks the width

  $scope.mobileQuery=window.matchMedia( "(max-width: 767px)" );
  $rootScope.isMobile=$scope.mobileQuery.matches;


//.........returning true if device

  if ($scope.checkDevice.any()){
    $rootScope.isDevice= true;

  }else{
      $rootScope.isDevice=false;
  }

  if (($rootScope.isDevice==true)&&($scope.isMobile==true)){
    $rootScope.isMobileDevice= true;
  }else{
      $rootScope.isMobileDevice=false;
  }




    if ($rootScope.isDevice){

        $rootScope.mobileLocation = function(url){
          $location.path(url).search();
        }

        $rootScope.mobileExternalLocation = function(url){
          $window.open(url, '_blank');
        }


    } else if (!$rootScope.isDevice){


        $rootScope.mobileLocation = function(url){
          return false;
        }

        $rootScope.mobileExternalLocation = function(url){
          return false;
        }
    }








})//......end of the route controller


.directive('pageLoadingSpinner', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'A',
    // templateUrl: 'components/loader.html',
    replace: true,
    link: function(scope, elem, attrs) {


      $rootScope.$on('$routeChangeStart', function() {

          $rootScope.pageLoading = true;
          scope.logoHide = true;

      });


      $rootScope.$on('$routeChangeSuccess', function() {

        // $timeout(function () {
          scope.logoHide = false;
          $rootScope.pageLoading = false;
        // }, 1000);




      });
    }
  };
});



/* Services */
var Service = angular.module('myApp.Services', ['ngResource']);

//
Service.factory('detailService', function($resource, $routeParams, $q, $cacheFactory){
//
// // var canceler = $q.defer();

return $resource('/data/:category/:id.json', {category:'@category', id: '@id'}, {get:{method:'GET', isArray:false}})

// return $resource('/data/:category/:name.json',{},{get:{method:'GET'}})
  // canceler.resolve();  // Aborts the $http request if it isn't finished.

});







Service.factory('getService', function($http, $q, $timeout){

    return {
              get: function(url) {


              // var dfd = $q.defer();
              // $timeout(function(){

                  // the $http API is based on the deferred/promise APIs exposed by the $q service
                  // so it returns a promise for us by default
                  return $http.get('/data/'+url+'.json')
                      .then(function(response) {


                          if (typeof response.data === 'object') {
                              return response.data;
                          } else {
                              // invalid response
                              console.log('rejected');
                              return $q.reject(response.data);
                          }

                          // dfd.resolve(response);

                      }, function(response) {
                          // something went wrong
                          return $q.reject(response.data);
                      });



                    // },2000);
                    // return dfd.promise;



              }
          };

    // return $resource('/data/'+url+'.json',{},{get:{method:'GET'}})


});




Service.factory('homeService', function($http, $q){

    return {
              get: function() {
                  // the $http API is based on the deferred/promise APIs exposed by the $q service
                  // so it returns a promise for us by default
                  return $http.get('/data/home.json')
                      .then(function(response) {



                          if (typeof response.data === 'object') {
                              return response.data;
                          } else {
                              // invalid response
                              console.log('rejected');
                              return $q.reject(response.data);
                          }

                      }, function(response) {
                          // something went wrong
                          return $q.reject(response.data);
                      });
              }
          };


});







//.................................................google SEO


Service.service('PageTitle', function() {
      var title = 'Angel Sanchez';
      return {
        title: function() { return title; },
        setTitle: function(newTitle) { title = newTitle; }
      };
    });



Service.service('MetaInformation', function() {
      var metaDescription = '';
      var metaKeywords = '';
      return {
        metaDescription: function() { return metaDescription; },
        metaKeywords: function() { return metaKeywords; },
        reset: function() {
          metaDescription = '';
          metaKeywords = '';
        },
        setMetaDescription: function(newMetaDescription) {
          metaDescription = newMetaDescription;
        },
        appendMetaKeywords: function(newKeywords) {
          for (var key in newKeywords) {
            if (metaKeywords === '') {
              metaKeywords += newKeywords[key].name;
            } else {
              metaKeywords += ', ' + newKeywords[key].name;
            }
          }
        }
      };
    });

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

  });


}]);

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

var Design = angular.module('myApp');

Design.controller("designCtrl", ['$http','$scope','$templateCache','$location','$rootScope','getService','$routeParams','detailService', function($http, $scope, $templateCache, $location, $rootScope, getService, $routeParams, detailService){




  $rootScope.design_id = $routeParams.id;
  console.log("$routeParams.id: "+$routeParams.id);
  $rootScope.design_detail =[];
  $scope.designName = "design";





  detailService.get({category: $scope.designName, id: $routeParams.id}, function(data){

    console.log(data);
    $rootScope.design_detail = data;

  });



}]);

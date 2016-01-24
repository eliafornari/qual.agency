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

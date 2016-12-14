// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'WxService'])

.run(['$ionicPlatform', 'WeixinService', function ($ionicPlatform, WeixinService) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true)

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault()
    }
    WeixinService.config()
  })
}])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.news', {
    url: '/news/:newsId',
    views: {
      'News': {
        templateUrl: 'templates/news.html',
        controller: 'NewsCtrl'
      }
    }
  })

  .state('tab.project', {
    url: '/project/:projectId',
    views: {
      'Project': {
        templateUrl: 'templates/project.html',
        controller: 'ProjectCtrl'
      }
    }
  })

  .state('tab.special', {
    url: '/special/:specialId',
    views: {
      'Special': {
        templateUrl: 'templates/special.html',
        controller: 'SpecialCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/news/0')
}])

//控制页面下方tab的显示和隐藏
.directive('hideTabs', ['$rootScope', function ($rootScope) {
  return {
    restrict: 'A',
    link: function (scope, element, attributes) {
      scope.$on('$ionicView.beforeEnter', function () {
        scope.$watch(attributes.hideTabs, function (value){
          $rootScope.hideTabs = value
        })
      })
      scope.$on('$ionicView.beforeLeave', function () {
        $rootScope.hideTabs = false
      })
    }
  }
}])

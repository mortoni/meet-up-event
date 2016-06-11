(function(){
    'use strict';
    angular.module('meetUp').config(function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/home', {
                controller: 'HomeCtrl',
                templateUrl: 'pages/home.html'
            })
            .when('/add', {
                controller: 'EventAddCtrl',
                templateUrl: 'pages/eventAdd.html'
            })
            .when('/login', {
                controller: 'LoginCtrl',
                templateUrl: 'pages/login.html'
            })
            .when('/search', {
                controller: 'SearchCtrl',
                templateUrl: 'pages/search.html'
            })
            .otherwise({
                controller: 'LoginCtrl',
                redirectTo: '/login',
                templateUrl: 'pages/login.html'
            });
    });
})();

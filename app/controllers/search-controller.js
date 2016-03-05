(function () {
    'use strict';
    angular.module('meetUp').controller('SearchCtrl', SearchCtrl);

    SearchCtrl.$inject = ['$scope', 'APP_SETTINGS','$firebaseArray', '$rootScope'];

    function SearchCtrl($scope, APP_SETTINGS, $firebaseArray, $rootScope) {

    }
})();

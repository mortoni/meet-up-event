(function () {
    'use strict';
    angular.module('insta').controller('EventAddCtrl', EventAddCtrl);

    EventAddCtrl.$inject = ['$scope', 'APP_SETTINGS', '$firebaseArray', '$rootScope', '$location'];

    function EventAddCtrl($scope, APP_SETTINGS, $firebaseArray, $rootScope, $location) {
        var ref = new Firebase(APP_SETTINGS.FIREBASE_URL + '/events');
        $scope.event = {};

        $scope.doCreate = function(){

            if(typeof $scope.event.info === 'undefined')
                $scope.event.info = '';

        	var event = {
        		id: $rootScope.user.password.email,
	        	name: $scope.event.name,
	        	type: $scope.event.type,
	        	host: $scope.event.host,
	        	start_date: getFormattedDate($scope.event.startDate),
	        	end_date: getFormattedDate($scope.event.endDate),
	        	guest_list: $scope.event.guest,
	        	location: $scope.event.location,
	        	aditional_info: $scope.event.info
	        };

	        //validar data start precisa ser menor que a data end.

        	ref.push(event);

            $location.path('/home');

        }

        function getFormattedDate(date) {
            var str = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " +  date.getHours() + ":" + date.getMinutes();
            return str;
        }
    }
})();
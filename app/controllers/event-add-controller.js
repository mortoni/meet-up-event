(function () {
  'use strict';
  angular.module('meetUp').controller('EventAddCtrl', EventAddCtrl);

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

      ref.push(event);
      $rootScope.event_qdt++;

      $location.path('/home');

    }
    Number.prototype.padLeft = function(base,chr){
      var  len = (String(base || 10).length - String(this).length)+1;
      return len > 0? new Array(len).join(chr || '0')+this : this;
    }

    function getFormattedDate(date) {
      var str = date.getDate().padLeft() + "/" + ((date.getMonth() +1 ).padLeft()) + "/" + date.getFullYear() + " " +  date.getHours() + ":" + date.getMinutes();
      return str;
    }

    $scope.checkDate = function(){
      if(!(typeof $scope.event.startDate === 'undefined') || !(typeof $scope.event.endDate === 'undefined'))
      if(new Date($scope.event.startDate) > new Date($scope.event.endDate))
      return false;

      return true;
    }

    $scope.DateChanged = function(){
      if(!(typeof $scope.event.startDate === 'undefined') || !(typeof $scope.event.endDate === 'undefined'))
      if(new Date($scope.event.startDate) > new Date($scope.event.endDate)){
        $scope.eventError =  true;
        $scope.addEvent.startDate.$invalid = true;
        $scope.addEvent.endDate.$invalid = true;
        $scope.eventErrorMessage = 'End Date must be higher than Start Date!'
      }else{
        $scope.eventError =  false;
        $scope.addEvent.startDate.$invalid = false;
        $scope.addEvent.endDate.$invalid = false;
      }
    }

    $("#event_name").focus();

  }
})();

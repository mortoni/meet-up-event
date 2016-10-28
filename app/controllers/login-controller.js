(function() {
  'use strict';
  angular.module('meetUp').controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', '$rootScope', '$location', 'APP_SETTINGS', '$firebaseAuth'];

  function LoginCtrl($scope, $rootScope, $location, APP_SETTINGS, $firebaseAuth) {
    var ref = new Firebase(APP_SETTINGS.FIREBASE_URL);
    var ref2 = new Firebase(APP_SETTINGS.FIREBASE_URL + '/users');
    var auth = $firebaseAuth(ref);



    $rootScope.user = null;
    $scope.createdUser = false;

    $scope.logout = function(){
      $rootScope.user = null;
      $location.path('/login');
    }

    $scope.doLogin = function(){
      var user = [{
        name: '',
        email: $scope.user.email,
        password: $scope.user.password
      }];

      auth.$authWithPassword({
        email: $scope.user.email,
        password: $scope.user.password
      }).then(function(user) {
        //Success callback
        $rootScope.event_qdt = 0;
        $rootScope.user = user;

        $rootScope.events.forEach(function(event) {
          if(event.id == $scope.user.email)
          $rootScope.event_qdt++;
        });

        $location.path('/home');
        console.log('Authentication successful');
      }, function(error) {
        //Failure callback
        $scope.signError = true;
        $scope.signErrorMessage = error.message;
        console.log('Authentication failure');

      });
    }

    $scope.doRegister = function(){
      var user = {
        name: $scope.guest.name,
        job_title: $scope.guest.job_title,
        email: $scope.guest.email,
        password: $scope.guest.password
      };

      if ($scope.guest.email && $scope.guest.password) {
        auth.$createUser({
          email: $scope.guest.email,
          password: $scope.guest.password
        }).then(function(userData) {
          $scope.createdUser = true;
          $scope.guest = null;
          document.getElementById("flipper__checkbox").checked = false;
          ref2.push(user);
          console.log("Successfully created user account with uid:", userData.uid);
        }).catch(function(error) {
          console.log("Error creating user:", error);
        });
      }
    };

    $scope.change = function() {
      if($scope.guest.password != $scope.guest.password_confirm){
        $scope.regForm.password_confirm.$invalid = true;
        $scope.regErrorMessage = 'passwords do not match';
        $scope.regError = true;
      }else{
        $scope.regForm.password_confirm.$invalid = false;
        $scope.regError = false;
      }
    };

    $scope.changePassword = function() {
      if(!(typeof $scope.guest.password_confirm === 'undefined'))
      $scope.change();

    };

    $scope.logFocus = function(){
      $('input[name=email]').focus();
    }

    $scope.regFocus = function(){
      $('input[name=name]').focus();
    }

    $('.nav a').on('click', function(){
      $('.navbar-toggle').click()
    });

    //$("#log_email").focus();
    $('input[name=email]').focus();
  }
})();

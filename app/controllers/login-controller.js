(function() {
    'use strict';
    angular.module('insta').controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$rootScope', '$location', 'APP_SETTINGS', '$firebaseAuth', '$firebaseArray'];

    function LoginCtrl($scope, $rootScope, $location, APP_SETTINGS, $firebaseAuth, $firebaseArray) {
        var ref = new Firebase(APP_SETTINGS.FIREBASE_URL);
        var ref2 = new Firebase(APP_SETTINGS.FIREBASE_URL + '/users');
        var auth = $firebaseAuth(ref);

        $scope.createdUser = false;

        var teste = $rootScope.event_qdt;

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
                email: $scope.guest.email,
                password: $scope.guest.password
            };

            if ($scope.guest.email && $scope.guest.password) {

                ref.createUser({
                  email    : $scope.guest.email,
                  password : $scope.guest.password
                }, function(error, userData) {
                  if (error) {
                    console.log("Error creating user:", error);
                  } else {
                    ref2.push(user);
                    document.getElementById("flipper__checkbox").checked = false;
                    console.log("Successfully created user account with uid:", userData.uid);
                  }
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

        $('.nav a').on('click', function(){
            $('.navbar-toggle').click() //bootstrap 3.x by Richard
        });


    }
})();

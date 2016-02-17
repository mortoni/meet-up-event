(function () {
    angular.module('insta').constant('APP_SETTINGS', {
        "FIREBASE_URL": "https://udacityone.firebaseio.com/"
    });

    angular.module('insta').run(function ($rootScope, $location, APP_SETTINGS) {
        var ref_users = new Firebase(APP_SETTINGS.FIREBASE_URL + '/users');
        var ref_events = new Firebase(APP_SETTINGS.FIREBASE_URL + '/events');

        $rootScope.users = [];
        $rootScope.events = [];

        getUsers();
        getEvents();
        
        function getUsers(){
            ref_users.on("value", function(snapshot) {
                $rootScope.users = [];
                snapshot.forEach(function(childSnapshot) {
                    $rootScope.users.push(childSnapshot.val());
                });
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        }

        function getEvents(){
            ref_events.on("value", function(snapshot) {
                $rootScope.events = [];
                $rootScope.event_qdt = 0;
                snapshot.forEach(function(childSnapshot) {
                    $rootScope.events.push(childSnapshot.val());
                });
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });


        }

        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            if (!$rootScope.user) {
                $location.path("/login");
            }
        });

    });
})();

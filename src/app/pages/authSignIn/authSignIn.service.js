(function () {
    'use strict';

    angular
        .module('BlurAdmin.pages.authSignIn')
        .factory('authservice', authservice);

        authservice.$inject = ['$http', '$q'];

    function authservice($http, $q) {
        var service = {
            authenticate: authenticate,
            logout: signOut
        };
        return service;

        function authenticate(username, password) {
            var defer = $q.defer();
            // $http({
            //     method: 'POST',
            //     url: 'http://10.14.151.91:3006/authenticate',
            //     data: JSON.stringify({username : username, password:password}),
            // }).success(function (data, status, headers) {
            //     defer.resolve(data);
            // }).error(function (err) {
            //     defer.reject(err);
            // });
            setTimeout(function() {
                defer.resolve(true);
            }, 0);     
            return defer.promise;
        }

        function signOut() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
              console.log('User signed out.');
            });
            
        }
    }
})();
(function() {
  'use strict';

  angular.module('BlurAdmin.pages.authSignIn')
    .controller('authSignInCtrl', authSignInCtrl);

    authSignInCtrl.$inject = ['$scope','$rootScope', 'localStorage', '$state','authservice'];
  /** @ngInject */
  function authSignInCtrl($scope,$rootScope, localStorage, $state, authservice, $q) {
      var vm = this;
      vm.onSignIn = login;
      vm.onLoad = onLoad;
      vm.isSignedIn = false;
      init();
      function init() {
        localStorage.clear();
      }

      function login(googleUser) {
        var profile = googleUser.getBasicProfile();

        if(localStorage.getObject('loggedOut') == true)
          localStorage.clear();
        if(profile){
          console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
          console.log('Name: ' + profile.getName());
          console.log('Image URL: ' + profile.getImageUrl());
          console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
          localStorage.setObject('userName', profile.getId());
          localStorage.setObject('id', profile.getName());
          localStorage.setObject('email', profile.getEmail());
          localStorage.setObject('loggedOut', false);
          
          if(profile.getEmail() == "jainpradeep.iitm@gmail.com" || profile.getEmail() == "aish.misha@gmail.com"){
            localStorage.setObject('admin', true);
            $rootScope.admin = true;
          }
          else{
            $rootScope.admin = false;
            localStorage.setObject('admin', true);
          }
          $state.go('main.dashboard');
        }
        else{
          $state.go('404');
        }
      }

      gapi.signin2.render("gmail", {
          "scope": "profile email openid",
          "width": 200,
          "height": 40,
          "longtitle": true,
          "theme": "dark",
          "onsuccess": function (googleUser) {
            vm.onLoad();
          },
          "onfailure": function (e) {
              console.warn("Google Sign-In failure: " + e.error);
          }
      });

      function onLoad() {
        gapi.load('auth2,signin2', function() {
          var auth2 = gapi.auth2.init();
          auth2.then(function() {
            // Current values
            vm.isSignedIn = auth2.isSignedIn.get();
            vm.currentUser = auth2.currentUser.get();
            onSignIn(vm.currentUser)
          });
        });
      }
      window.onSignIn = vm.onSignIn;
      vm.onLoad()
    }
  })();
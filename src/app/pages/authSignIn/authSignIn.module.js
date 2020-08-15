(function() {
  'use strict';

  angular.module('BlurAdmin.pages.authSignIn', [])
    .config(routeConfig)
    .value('GoogleApp', {
      apiKey: 'pKXjopaXfcRPKOft9DotEMHE',
      clientId: '679151358353-kv4l3sem6cuka4p5kv09s4514ejj42uq.apps.googleusercontent.com',
      scopes: [
        // whatever scopes you need for your app, for example:
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/youtube',
        'https://www.googleapis.com/auth/userinfo.profile'
        // ...
      ]
    })

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('authSignIn', {
        url: '/authSignIn',
        templateUrl: 'app/pages/authSignIn/authSignIn.html',
        title: 'Home',
        controller: 'authSignInCtrl',
        sidebarMeta: {
          order: 800,
        },
        authenticate: false
      });
  }

})();
(function() {
  'use strict';

  angular.module('BlurAdmin.pages.config')
    .run(stateChangeStart);

  /** @ngInject */
  function stateChangeStart($rootScope, $state, localStorage) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
      var login = localStorage.getObject('id');
      if (toState.authenticate == false || typeof login != "string" || localStorage.getObject('loggedOut') == true) {
        $state.transitionTo("authSignIn");
        event.preventDefault();
      }
    });
  }

})();
/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .directive('pageTop', pageTop);
      pageTop.$inject = ['$state', '$stateParams', '$compile', 'authservice'];

  /** @ngInject */
  function pageTop($state, $stateParams, $compile, authservice) {
    return {
      restrict: 'E',
      scope:{
        send:"&"
      },
      templateUrl: 'app/theme/components/pageTop/pageTop.html',
      link: function($scope, element, attrs) {
        $scope.logout = function(){
          localStorage.clear();
          localStorage.setItem("loggedOut", true)
          //authservice.logout();
          $state.go('authSignIn')
        }
      }
    };
  }

})();
(function() {
  'use strict';

  angular.module('BlurAdmin.pages.patient.daily-reports', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.patient.daily-reports', {
        url: '/patient/daily-reports',
        templateUrl: 'app/pages/patient/daily-reports/daily-reports.html',
        title: 'daily-reports',
        sidebarMeta: {
          icon: '',
          order: 0,
        },
        authenticate: true
      });
  }

})();
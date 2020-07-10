(function() {
  'use strict';

  angular.module('BlurAdmin.pages.patient.daily-reports', ['BlurAdmin.pages.patient.daily-reports.delivery-del'])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.patient.daily-reports', {
        url: '/daily-reports',
        templateUrl: 'app/pages/patient/daily-reports/daily-reports.html',
        title: 'daily-reports',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 0,
        },
        authenticate: true
      });
  }

})();
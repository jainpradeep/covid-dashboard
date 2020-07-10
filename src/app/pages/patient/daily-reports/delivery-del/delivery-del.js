(function() {
  'use strict';

  angular.module('BlurAdmin.pages.patient.daily-reports.delivery-del', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.patient.daily-reports.delivery-del', {
        url: '/delivery-del',
        templateUrl: 'app/pages/patient/daily-reports/delivery-del/delivery-del.html',
        title: 'delivery-del',
        sidebarMeta: {
          icon: '',
          order: 10,
        },
        authenticate: true
      });
  }

})();
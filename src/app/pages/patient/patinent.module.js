(function() {
  'use strict';

  angular.module('BlurAdmin.pages.patient', ['BlurAdmin.pages.patient.timely-report','BlurAdmin.pages.patient.sko-lbt-pumping','BlurAdmin.pages.patient.daily-reports' ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.patient', {
        url: '/patient',
        templateUrl: 'app/pages/patient/patient.html',
        title: 'Patient Report',
        sidebarMeta: {
          icon: 'ion-android-home',
          order: 0,
        },
        authenticate: true
      });
  }

})();
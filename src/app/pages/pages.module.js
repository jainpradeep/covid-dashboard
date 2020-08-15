/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
  'use strict';

  angular.module('BlurAdmin.pages', [
      'ui.router',
      'BlurAdmin.pages.services',
      'BlurAdmin.pages.config',
      'BlurAdmin.pages.main',
      'BlurAdmin.pages.dashboard',
      'BlurAdmin.pages.states',
      'BlurAdmin.pages.district',
      'BlurAdmin.pages.pass',
      'BlurAdmin.pages.profile',
      'BlurAdmin.pages.authSignIn',
    ])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
    $urlRouterProvider.otherwise('/authSignIn');
    // baSidebarServiceProvider.addStaticItem({
    //   title: 'patient',
    //   icon: 'ion-ios-more',
    //   subMenu: [{
    //     title: 'Delhi (EX-MR)',
    //     disabled: true
    //   },{
    //     title: 'SKO LBT-Pumping',
    //     disabled: true
    //   },{
    //     title: 'Delhi (EX-PR)',
    //     disabled: true
    //   }, {
    //     title: 'Daily Report',
    //     subMenu: [{
    //       title: 'Rev-pumping Pnp-Del',
    //       disabled: true
    //     },{
    //       title: 'Delivery Del',
    //       disabled: true
    //     },{
    //       title: 'Rev-Delivery Del',
    //       disabled: true
    //     },{
    //       title: 'Pumping Del-Pnp',
    //       disabled: true
    //     },{
    //       title: 'Deliery Pnp (PDPL 14")',
    //       disabled: true
    //     }]
    //   },{
    //     title: 'Equipment running hours of Bijwasan',
    //     disabled: true
    //   },{
    //     title: 'Product in Station Linefill',
    //     disabled: true
    //   },{
    //     title: 'Product Planning',
    //     disabled: true
    //   }]
    // });
  }

})();
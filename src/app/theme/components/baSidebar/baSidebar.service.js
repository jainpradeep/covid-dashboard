(function() {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .provider('baSidebarService', baSidebarServiceProvider);

  /** @ngInject */
  function baSidebarServiceProvider() {
    var staticMenuItems = [];

    this.addStaticItem = function() {
      staticMenuItems.push.apply(staticMenuItems, arguments);
    };

    /** @ngInject */
    this.$get = function($state, layoutSizes) {
      return new _factory();

      function _factory() {
        var isMenuCollapsed = shouldMenuBeCollapsed();

        this.getMenuItems = function () {
          var states = defineMenuItemStates();
          var children0 = states.filter(function (child0) {
              return child0.level == 0;
          });

          //Menu level 1
          children0.forEach(function (item1) {
              var children1 = states.filter(function (child1) {
                  return child1.level == 1 && child1.name.indexOf(item1.name) === 0;
              });

              //Menu level 2
              children1.forEach(function (item2) {
                  var children2 = states.filter(function (child2) {
                      return child2.level == 2 && child2.name.indexOf(item2.name) === 0;

                  });

                  //Menu level 3
                  children2.forEach(function (item3) {
                      var children3 = states.filter(function (child3) {
                          return child3.level == 3 && child3.name.indexOf(item3.name) === 0;
                      });

                      item3.subMenu = children3.length ? children3 : null;
                  });

                  item2.subMenu = children2.length ? children2 : null;
              });

              item1.subMenu = children1.length ? children1 : null;
          });

          return children0.concat(staticMenuItems);
      };

        this.shouldMenuBeCollapsed = shouldMenuBeCollapsed;
        this.canSidebarBeHidden = canSidebarBeHidden;

        this.setMenuCollapsed = function(isCollapsed) {
          isMenuCollapsed = isCollapsed;
        };

        this.isMenuCollapsed = function() {
          return isMenuCollapsed;
        };

        this.toggleMenuCollapsed = function() {
          isMenuCollapsed = !isMenuCollapsed;
        };

        this.getAllStateRefsRecursive = function(item) {
          var result = [];
          _iterateSubItems(item);
          return result;

          function _iterateSubItems(currentItem) {
            currentItem.subMenu && currentItem.subMenu.forEach(function(subItem) {
              subItem.stateRef && result.push(subItem.stateRef);
              _iterateSubItems(subItem);
            });
          }
        };

        function defineMenuItemStates() {
          return $state.get()
            .filter(function(s) {
              return s.sidebarMeta;
            })
            .map(function(s) {
              var meta = s.sidebarMeta;
              return {
                name: s.name,
                title: s.title,
                level: ((s.name.match(/\./g) || []).length - 1),
                order: meta.order,
                icon: meta.icon,
                stateRef: s.name,
              };
            })
            .sort(function(a, b) {
              return (a.level - b.level) * 100 + a.order - b.order;
            });
        }

        function shouldMenuBeCollapsed() {
          return window.innerWidth <= layoutSizes.resWidthCollapseSidebar;
        }

        function canSidebarBeHidden() {
          return window.innerWidth <= layoutSizes.resWidthHideSidebar;
        }
      }

    };

  }
})();
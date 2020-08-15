(function() {
  'use strict';

  angular.module('BlurAdmin.pages.states', [])
    .config(routeConfig).config(chartJsConfig)
    .controller('StatesCtrl', StatesCtrl) 
    .service('statesService', StatesServ)

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.states', {
        url: '/states',
        templateUrl: 'app/pages/states/states.html',
        title: 'States dashboard',
        sidebarMeta: {
          icon: 'ion-search',
          order: 0,
        },
        authenticate: true
      });
  }

function StatesCtrl($scope, baConfig, $element, layoutPaths, statesService,$timeout) {
  
 $scope.getStatesData= function(){
          statesService.getStatesData().then(
            function(data) { 
              $scope.statesData = data.data;
              


            $scope.statesLabelUnchuncked = Object.keys($scope.statesData).reduce(function (accumalator , state) {
                accumalator.push(state)
                return accumalator
            }, []);


            $scope.statesDataCounts = Object.keys($scope.statesData).reduce(function (accumalator , state) {
               var stateDateData = Object.keys($scope.statesData[state])
               if($scope.statesData[state][stateDateData[stateDateData.length-1]].total && $scope.statesData[state][stateDateData[stateDateData.length-1]].total.confirmed)
               accumalator[0].push($scope.statesData[state][stateDateData[stateDateData.length-1]].total.confirmed)
               if($scope.statesData[state][stateDateData[stateDateData.length-1]].total && $scope.statesData[state][stateDateData[stateDateData.length-1]].total.recovered)
               accumalator[1].push($scope.statesData[state][stateDateData[stateDateData.length-1]].total.recovered)
               if($scope.statesData[state][stateDateData[stateDateData.length-1]].total && $scope.statesData[state][stateDateData[stateDateData.length-1]].total.tested)
               accumalator[2].push($scope.statesData[state][stateDateData[stateDateData.length-1]].total.tested)
               return accumalator
            }, [
            [],[],[]
            ]);


            if(!Array.prototype.chunk_inefficient){
                Object.defineProperty(Array.prototype, 'chunk_inefficient', {
                  value: function(chunkSize) {
                    var array = this;
                    return [].concat.apply([],
                      array.map(function(elem, i) {
                        return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
                      })
                    );
                  }
                });
            }

            $scope.statesDataConfirmedCounts =  $scope.statesDataCounts[0].chunk_inefficient(12)
            
            $scope.statesDataRecoveredCounts =  $scope.statesDataCounts[1].chunk_inefficient(12)


            $scope.statesDataDeathCounts =  $scope.statesDataCounts[2].chunk_inefficient(12)


            $scope.statesLabel = $scope.statesLabelUnchuncked.chunk_inefficient(12)




            $scope.stackedBarData = [{
              labels:  $scope.statesLabel[0],
              series: [$scope.statesDataConfirmedCounts[0], $scope.statesDataRecoveredCounts[0], $scope.statesDataDeathCounts[0]]
            }, {
              labels:  $scope.statesLabel[1],
              series: [$scope.statesDataConfirmedCounts[1], $scope.statesDataRecoveredCounts[1], $scope.statesDataDeathCounts[1]]
            }, {
              labels:  $scope.statesLabel[2],
              series: [$scope.statesDataConfirmedCounts[2], $scope.statesDataRecoveredCounts[2], $scope.statesDataDeathCounts[2]]
            }]

             $scope.stackedBarOptions = {
              fullWidth: true,
              height: "300px",
              stackBars: true,

              axisY: {
                labelInterpolationFnc: function (value) {
                  return (value / 1000) + 'k';
                }
              }
            };
              $timeout(function(){
                 new Chartist.Bar('#stacked-bar-1', $scope.stackedBarData[0], $scope.stackedBarOptions);
                 new Chartist.Bar('#stacked-bar-2', $scope.stackedBarData[1], $scope.stackedBarOptions);
                 new Chartist.Bar('#stacked-bar-3', $scope.stackedBarData[2], $scope.stackedBarOptions);
              });
           },
            function(msg) {
              $scope.networkError = "Error"
            });
    
 }



  $scope.getStatesData();
}

function StatesServ($http,$q) {
        this.message = '';
        this.getStatesData  = function(reqJSON){
            var deferred = $q.defer();

            $http.get('https://api.covid19india.org/v3/timeseries.json',{
                headers : {
                    'Content-Type' : 'application/json; charset=utf-8'
                        }
                }).
                success(function (data, status) {
                    deferred.resolve({
                        data: data});
                }).
                error(function (msg, status) {
                    deferred.reject("error");
                });
            

                return deferred.promise;
      }
}   



  function chartJsConfig(ChartJsProvider, baConfigProvider) {
        var layoutColors = baConfigProvider.colors;
        // Configure all charts
        ChartJsProvider.setOptions({
            chartColors: [
                layoutColors.primary, layoutColors.danger, layoutColors.warning, layoutColors.success, layoutColors.info, layoutColors.default, layoutColors.primaryDark, layoutColors.successDark, layoutColors.warningLight, layoutColors.successLight, layoutColors.primaryLight],
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2500
            },
            scale: {
                gridLines: {
                    color: layoutColors.border
                },
                scaleLabel: {
                    fontColor: layoutColors.defaultText
                },
                ticks: {
                    fontColor: layoutColors.defaultText,
                    showLabelBackdrop: false
                }
            }
        });
        // Configure all line charts
        ChartJsProvider.setOptions('Line', {
            datasetFill: false
        });
        // Configure all radar charts
        ChartJsProvider.setOptions('radar', {
            scale: {
                pointLabels: {
                    fontColor: layoutColors.defaultText
                },
                ticks: {
                    maxTicksLimit: 5,
                    display: false
                }
            }
        });
        // Configure all bar charts
      ChartJsProvider.setOptions('bar', {
            tooltips: {
                enabled: false
            }
        });
  }

})();

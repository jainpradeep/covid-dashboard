(function() {
  'use strict';

  angular.module('BlurAdmin.pages.district', [])
    .config(routeConfig).config(chartJsConfig)
    .controller('DistrictCtrl', DistrictCtrl) 
    .service('districtsService', DistrictsServ)

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.district', {
        url: '/district',
        templateUrl: 'app/pages/district/district.html',
        title: 'Districts dashboard',
        sidebarMeta: {
          icon: 'ion-search',
          order: 0,
        },
        authenticate: true
      });
  }

function DistrictCtrl($scope, baConfig, $element, layoutPaths, districtsService,$timeout) {
  
 $scope.getStatedata= function(){
          districtsService.getStatedata().then(
            function(data) { 
              $scope.statedata = data.data;
              


            $scope.statelabeLunchUncked = Object.keys($scope.statedata).reduce(function (accumalator , district) {
                accumalator.push(district)
                return accumalator
            }, []);

            $scope.selectedState = $scope.statelabeLunchUncked[1]

            $scope.setDistrictsData();
           },
            function(msg) {
              $scope.networkError = "Eror"
             });
    }


$scope.checgeState = function(selectedState){
   $scope.selectedState = selectedState
  $scope.setDistrictsData()
}

$scope.setDistrictsData = function(){
            $scope.districtlabeLunchUncked = Object.keys($scope.statedata[$scope.selectedState].districtData)
            $scope.districtDataCount = Object.keys($scope.statedata[$scope.selectedState].districtData).reduce(function(accumalator , district){
              accumalator[0].push($scope.statedata[$scope.selectedState].districtData[district].confirmed)
              accumalator[1].push($scope.statedata[$scope.selectedState].districtData[district].recovered)
              accumalator[2].push($scope.statedata[$scope.selectedState].districtData[district].deceased)
              return accumalator
            },[[],[],[]])




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

            $scope.statesDataConfirmedCounts =  $scope.districtDataCount[0].chunk_inefficient(12)
            
            $scope.statesDataRecoveredCounts =  $scope.districtDataCount[1].chunk_inefficient(12)


            $scope.statesDataDeathCounts =  $scope.districtDataCount[2].chunk_inefficient(12)


            $scope.statesLabel = $scope.districtlabeLunchUncked.chunk_inefficient(12)
$scope.stackedBarData= []
            if($scope.statesDataConfirmedCounts.length>= 2);
            $scope.stackedBarData.push({
              labels:  $scope.statesLabel[0],
              series: [$scope.statesDataConfirmedCounts[0], $scope.statesDataRecoveredCounts[0], $scope.statesDataDeathCounts[0]]
            })
                 if($scope.statesDataConfirmedCounts.length>= 2);
                       $scope.stackedBarData.push({
              labels:  $scope.statesLabel[1],
              series: [$scope.statesDataConfirmedCounts[1], $scope.statesDataRecoveredCounts[1], $scope.statesDataDeathCounts[1]]
            })
                 if($scope.statesDataConfirmedCounts.length>=3);
                       $scope.stackedBarData.push({
              labels:  $scope.statesLabel[2],
              series: [$scope.statesDataConfirmedCounts[2], $scope.statesDataRecoveredCounts[2], $scope.statesDataDeathCounts[2]]
            })
                  if($scope.statesDataConfirmedCounts.length>= 4);
                       $scope.stackedBarData.push({
              labels:  $scope.statesLabel[4],
              series: [$scope.statesDataConfirmedCounts[4], $scope.statesDataRecoveredCounts[4], $scope.statesDataDeathCounts[4]]
            })
                  if($scope.statesDataConfirmedCounts.length>= 5);
                       $scope.stackedBarData.push({
              labels:  $scope.statesLabel[5],
              series: [$scope.statesDataConfirmedCounts[5], $scope.statesDataRecoveredCounts[5], $scope.statesDataDeathCounts[5]]
            })
                 if($scope.statesDataConfirmedCounts.length >= 6);
                       $scope.stackedBarData.push({
              labels:  $scope.statesLabel[6],
              series: [$scope.statesDataConfirmedCounts[6], $scope.statesDataRecoveredCounts[6], $scope.statesDataDeathCounts[6]]
            })


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
                 if($scope.stackedBarData.length>= 2);
                 new Chartist.Bar('#stacked-bar-2', $scope.stackedBarData[1], $scope.stackedBarOptions);
                 if($scope.stackedBarData.length>=3);
                 new Chartist.Bar('#stacked-bar-3', $scope.stackedBarData[2], $scope.stackedBarOptions);
                  if($scope.stackedBarData.length>= 4);
                 new Chartist.Bar('#stacked-bar-4', $scope.stackedBarData[3], $scope.stackedBarOptions);
                  if($scope.stackedBarData.length>= 5);
                 new Chartist.Bar('#stacked-bar-5', $scope.stackedBarData[4], $scope.stackedBarOptions);
                 if($scope.stackedBarData.length >= 6);
                 new Chartist.Bar('#stacked-bar-5', $scope.stackedBarData[5], $scope.stackedBarOptions);
        
              });
}

  $scope.getStatedata();
}


function DistrictsServ($http,$q) {
        this.message = '';
        this.getStatedata  = function(reqJSON){
            var deferred = $q.defer();

            $http.get('https://api.covid19india.org/state_district_wise.json',{
                headers : {
                    'Content-Type' : 'application/json; charset=utf-8'
                        }
                }).
                success(function (data, status) {
                    deferred.resolve({
                        data: data});
                }).
                error(function (msg, status) {
                    deferred.reject("eror");
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

/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard', ['ui.bootstrap'])
        .controller('DashboardCtrl', DashboardCtrl)
        .service('dashboardService', DashboardServ)
        .config(routeConfig)

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('main.dashboard', {
                url: '/dashboard',
                templateUrl: 'app/pages/dashboard/dashboard.html',
                title: 'Dashboard',
                sidebarMeta: {
                    icon: 'ion-search',
                    order: 0,
                },
                authenticate: true
            });
    }

    /** @ngInject */
    function DashboardCtrl($scope, $rootScope, baConfig, baUtil, $element, layoutPaths, dashboardService, $timeout, $uibModal) {
        var layoutColors = baConfig.colors;
        var id = $element[0].getAttribute('id');
        var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);


        var limitDate = new Date();
        var dd = String(limitDate.getDate()).padStart(2, '0');
        var mm = String(limitDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = limitDate.getFullYear();
        limitDate = mm  + dd + yyyy;
        $scope.initLimitDate = limitDate;

        var config = {
            "type": "serial",
            "theme": "light",
            "marginRight": 40,
            "marginLeft": 40,
            "autoMarginOffset": 20,
            "mouseWheelZoomEnabled": true,
            "dataDateFormat": "YYYY-MM-DD",
            "valueAxes": [{
                "id": "v1",
                "axisAlpha": 0,
                "position": "left",
                "ignoreAxisWidth": true
            }],
            "balloon": {
                "borderThickness": 1,
                "shadowAlpha": 0
            },
            "graphs": [{
                "id": "g1",
                "balloon": {
                    "drop": true,
                    "adjustBorderColor": false,
                    "color": "#ffffff"
                },
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletColor": "#FFFFFF",
                "bulletSize": 5,
                "hideBulletsCount": 50,
                "lineThickness": 2,
                "title": "red line",
                "useLineColorForBulletBorder": true,
                "valueField": "value",
                "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
            }],
            "chartScrollbar": {
                "graph": "g1",
                "oppositeAxis": false,
                "offset": 30,
                "scrollbarHeight": 80,
                "backgroundAlpha": 0,
                "selectedBackgroundAlpha": 0.1,
                "selectedBackgroundColor": "#888888",
                "graphFillAlpha": 0,
                "graphLineAlpha": 0.5,
                "selectedGraphFillAlpha": 0,
                "selectedGraphLineAlpha": 1,
                "autoGridCount": true,
                "color": "#AAAAAA"
            },
            "chartCursor": {
                "pan": true,
                "valueLineEnabled": true,
                "valueLineBalloonEnabled": true,
                "cursorAlpha": 1,
                "cursorColor": "#258cbb",
                "limitToGraph": "g1",
                "valueLineAlpha": 0.2,
                "valueZoomable": true
            },
            "valueScrollbar": {
                "oppositeAxis": false,
                "offset": 50,
                "scrollbarHeight": 10
            },
            "categoryField": "date",
            "categoryAxis": {
                "parseDates": true,
                "dashLength": 1,
                "minorGridEnabled": true
            },
            "export": {
                "enabled": true
            },
            "dataProvider": [],
        }



        var config2 = {
            "type": "serial",
            "theme": "none",
            "pathToImages": "http://www.amcharts.com/lib/3/images/",
            "dataDateFormat": "YYYY-MM-DD",
            "valueAxes": [{
                "id": "v1",
                "axisAlpha": 0,
                "position": "left"
            }],
            "graphs": [{
                "id": "g1",
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletColor": "#FFFFFF",
                "bulletSize": 5,
                "hideBulletsCount": 50,
                "lineThickness": 2,
                "title": "red line",
                "useLineColorForBulletBorder": true,
                "valueField": "value"
            },
            {
                "id": "g2",
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletColor": "#00FF00",
                "bulletSize": 5,
                "hideBulletsCount": 50,
                "lineThickness": 2,
                "title": "green line",
                "useLineColorForBulletBorder": true,
                "valueField": "value2"
            }, {
                "id": "g3",
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletColor": "#00FF00",
                "bulletSize": 5,
                "hideBulletsCount": 50,
                "lineThickness": 2,
                "title": "green line",
                "useLineColorForBulletBorder": true,
                "valueField": "value3"
            }],
            "chartScrollbar": {
                "graph": "g1",
                "scrollbarHeight": 30
            },
            "chartCursor": {
                "cursorPosition": "mouse",
                "pan": true,
                "valueLineEnabled": true,
                "valueLineBalloonEnabled": true
            },
            "categoryField": "date",
            "categoryAxis": {
                "parseDates": true,
                "dashLength": 1,
                "minorGridEnabled": true,
                "position": "top"
            },
            exportConfig: {
                menuRight: '20px',
                menuBottom: '50px',
                menuItems: [{
                    icon: 'http://www.amcharts.com/lib/3/images/export.png',
                    format: 'png'
                }]
            },
            "dataProvider": []
        }

        $scope.citiesList = ["Mumbai ", "Delhi ", "Bangalore ", "Hyderabad ", "Ahmedabad ", "Chennai ", "Kolkata ", "Surat", "Pune", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Pimpri & Chinchwad", "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan & Dombivali", "Vasai Virar", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad", "Ranchi", "Haora", "Coimbatore", "Jabalpur", "Gwalior", "Vijayawada", "Jodhpur", "Madurai", "Raipur", "Kota", "Guwahati", "Chandigarh", "Solapur", "Hubli and Dharwad", "Bareilly", "Moradabad", "Mysore", "Gurgaon", "Aligarh", "Jalandhar", "Tiruchirappalli", "Bhubaneswar", "Salem", "Mira and Bhayander", "Thiruvananthapuram", "Bhiwandi", "Saharanpur", "Gorakhpur", "Guntur", "Bikaner", "Amravati", "Noida", "Jamshedpur", "Bhilai Nagar", "Warangal", "Cuttack", "Firozabad", "Kochi", "Bhavnagar", "Dehradun", "Durgapur", "Asansol", "Nanded Waghala", "Kolapur", "Ajmer", "Gulbarga", "Jamnagar", "Ujjain", "Loni", "Siliguri", "Jhansi", "Ulhasnagar", "Nellore", "Jammu", "Sangli Miraj Kupwad", "Belgaum", "Mangalore", "Ambattur", "Tirunelveli", "Malegoan", "Gaya", "Jalgaon", "Udaipur", "Maheshtala"]
        $scope.state = ["Andhra Pradesh",
            "Arunachal Pradesh",
            "Assam",
            "Bihar",
            "Chhattisgarh",
            "Goa",
            "Gujarat",
            "Haryana",
            "Himachal Pradesh",
            "Jammu and Kashmir",
            "Jharkhand",
            "Karnataka",
            "Kerala",
            "Madhya Pradesh",
            "Maharashtra",
            "Manipur",
            "Meghalaya",
            "Mizoram",
            "Nagaland",
            "Odisha",
            "Punjab",
            "Rajasthan",
            "Sikkim",
            "Tamil Nadu",
            "Telangana",
            "Tripura",
            "Uttarakhand",
            "Uttar Pradesh",
            "West Bengal",
            "Andaman and Nicobar Islands",
            "Chandigarh",
            "Dadra and Nagar Haveli",
            "Daman and Diu",
            "Delhi",
            "Lakshadweep",
            "Puducherry"]

        $scope.months = [
            "January", "Feburary", "March",
            "April", "May", "June", "July",
            "Aug", "Sep", "Oct",
            "Nov", "Dec"
        ];

        $scope.cancel = function () {
            $scope.$modalInstance.dismiss('cancel');
        };

        $scope.selectedState = ""
        $scope.selectedCity = ""
        $scope.selectedCityLimit = ""

        $scope.saveLimit = function () {

            var limitDate = new Date($scope.customDate);
            var dd = String(limitDate.getDate()).padStart(2, '0');
            var mm = String(limitDate.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = limitDate.getFullYear();

            limitDate = mm  + dd + yyyy;
        
            dashboardService.setDailyLimit({
                "stateName": $scope.selectedState,
                "cityName": $scope.selectedCity,
                "dailyLimit": $scope.selectedCityLimit,
                "limitDate": limitDate
            }).then(
                function (data) {
                    $scope.getCitiesLimit();
                    $scope.cancel()
                },
                function (msg) {
                    $scope.networkError = "Eror"
                });
        }

        $scope.open = function (data) {
            $scope.$modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: "/app/pages/dashboard/adminModal.html",
                size: 'xl',
            })
        };


        $scope.openNewPass = function (data) {
            $scope.$modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: "/app/pages/dashboard/newPasslimit.html",
                size: 'xl',
            })
        };


        $scope.getDashboardData = function () {
            $rootScope.admin = localStorage.getItem("admin")
            dashboardService.getDashboardData().then(
                function (data) {
                    $scope.dashboardData = data.data;

                    $scope.lineChart.dataProvider = $scope.dashboardData.cases_time_series.reduce(function (accumalator, dayData) {
                        var dateStringArr = dayData.date.split(" ");
                        var month = $scope.months.indexOf(dateStringArr[1]) + 1;
                        if (month < 10) {
                            month = "0" + month;
                        }

                        //var dateObj = new Date(2020, month, dateStringArr[0])

                        accumalator.push({
                            "date": [2020, month, dateStringArr[0]].join('-'),
                            "value": dayData.totalconfirmed,
                            "value2": dayData.totaldeceased,
                            "value3": dayData.totalrecovered
                        })
                        return accumalator;
                    }, [])

                    
                    $scope.lineChart.dataProvider = $scope.lineChart.dataProvider.map(function(log) {
                        var dateArr = log.date.split('-');
                        var month = parseInt(dateArr[1], 10)  + 1

                        if (month < 10)
                        month = '0' + month;
                        log.date = dateArr[0] + "-" + month  + "-" + dateArr[2];
                        return log;
                    });


                    $scope.lineChart.dataProvider  = $scope.lineChart.dataProvider .sort(function(a, b){
                        return new Date(a.date) - new Date(b.date)});

                        $scope.lineChart.dataProvider =   $scope.lineChart.dataProvider.filter( function(item, index) {
                            return index > 15
                        })                        

                    $scope.tileData = Object.keys($scope.dashboardData.cases_time_series[$scope.dashboardData.cases_time_series.length - 1]).reduce(function (accumalator, key) {
                        accumalator.push({
                            color: pieColor,
                            description: key,
                            stats: $scope.dashboardData.cases_time_series[$scope.dashboardData.cases_time_series.length - 1][key],
                            icon: 'person'
                        })
                        return accumalator
                    }, []);

                    // date: "30 January "
                    // totalconfirmed: "1"
                    // totaldeceased: "0"
                    // totalrecovered: "0"

                    console.log("")
                    $scope.lineChart.validateData();
                },
                function (msg) {
                    $scope.networkError = "Eror"
                });

        }

        $scope.lineChart = AmCharts.makeChart(id, config2);

        $scope.lineChart.addListener('rendered', zoomChart);
        if ($scope.lineChart.zoomChart) {
            $scope.lineChart.zoomChart();
        }

        function zoomChart() {
            $scope.lineChart.zoomToIndexes(Math.round($scope.lineChart.dataProvider.length * 0.4), Math.round(lineChart.dataProvider.length * 0.55));
        }

        $scope.getCitiesLimit = function () {
            var limitDate =$scope.initLimitDate;
            if($scope.customDate){
                limitDate = new Date($scope.customDate);
                var dd = String(limitDate.getDate()).padStart(2, '0');
                var mm = String(limitDate.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = limitDate.getFullYear();
                limitDate = mm  + dd + yyyy;
            }
            dashboardService.getCityData().then(
                function (data) {
                    $scope.cities = data.data;
                    $scope.cities=  $scope.cities.filter(function(item){
                        return item.limitDate == limitDate
                    })

                },
                function (msg) {
                    $scope.networkError = "Eror"
                });
        }
        $scope.getCitiesLimit();
        $scope.getDashboardData();

        $scope.today = function () {
            $scope.customDate = $scope.customDate;
        };
        $scope.today();

        $scope.customDate = new Date()

        $scope.clear = function () {
            $scope.customDate = null;
        };
        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.maxdate = new Date();
        $scope.maxdate.setDate($scope.maxdate.getDate() + 7);


        $scope.dateOptions = {
            formatYear: 'yy',
            minDate: new Date(),
            maxDate: $scope.maxdate,
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        $scope.$watch('customDate', function (value) {
            $scope.customDate = value
            $scope.getCitiesLimit();
        });



        $scope.$watch('selectedState', function (value) {
            $scope.selectedState = value
        });



        $scope.$watch('selectedCity', function (value) {
            $scope.cityName = value
        });

        $scope.$watch('dailyLimit', function (value) {
            $scope.dailyLimit = value
        });

        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };


        $scope.popup1 = {
            opened: false
        };

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }
    }

    function DashboardServ($http, $q) {
        this.message = '';
        this.getDashboardData = function (reqJSON) {
            var deferred = $q.defer();

            $http.get('https://api.covid19india.org/data.json', {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).
                success(function (data, status) {
                    deferred.resolve({
                        data: data
                    });
                }).
                error(function (msg, status) {
                    deferred.reject("eror");
                });


            return deferred.promise;
        }

        this.getCityData = function (reqJSON) {
            var deferred = $q.defer();

            $http.get('http://localhost:8080/api/v1/dailyLimits', {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).
                success(function (data, status) {
                    deferred.resolve({
                        data: data
                    });
                }).
                error(function (msg, status) {
                    deferred.reject("eror");
                });


            return deferred.promise;
        }

        this.setDailyLimit = function (reqJSON) {
            var deferred = $q.defer();
            $http.post('http://localhost:8080/api/v1/dailyLimits', reqJSON, {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).
                success(function (data, status) {
                    deferred.resolve({
                        data: data
                    });
                }).
                error(function (msg, status) {
                    deferred.reject("eror");
                });


            return deferred.promise;
        }
    }
})();
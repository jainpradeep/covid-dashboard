(function() {
  'use strict';

  angular.module('BlurAdmin.pages.pass', [])
    .config(routeConfig)
    .controller('PassCtrl', PassCtrl) 
    .service('passsServ', passsServ)

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.pass', {
        url: '/pass',
        templateUrl: 'app/pages/pass/pass.html',
        title: 'Pass dashboard',
        sidebarMeta: {
          icon: 'ion-clipboard',
          order: 0,
        },
        authenticate: true
      });
  }

  function PassCtrl($scope, baConfig, $element, layoutPaths, passsServ,$timeout,$uibModal) {

    $scope.printPassHide = true;
    $scope.openPrintPass = function (data) {
        $scope.$modalInstance = $uibModal.open({
            scope: $scope,
            templateUrl: "/app/pages/Pass/newPassLimit.html",
            size: 'xl',
        })
    };
  
    $scope.countryDailyLimit = true;
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

  $scope.getCitiesLimit = function () {
    var limitDate =$scope.initLimitDate;
    if($scope.customDate){
        limitDate = new Date($scope.customDate);
        var dd = String(limitDate.getDate()).padStart(2, '0');
        var mm = String(limitDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = limitDate.getFullYear();
        limitDate = mm  + dd + yyyy;
    }
    passsServ.getCityData().then(
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

$scope.applyForPass = function(){
    passsServ.applyForPass($scope.filteredCityInfo[0]).then(
        function (data) {
            $scope.printPassConfirm = true;
            $scope.printPassHide = false;
            setTimeout(function(){
                $scope.printPassHide = true;
            }, 3000)
        },
        function (msg) {
            $scope.printPassConfirm = false;
            $scope.printPassHide = false;
        });
}

$scope.getCitiesLimit();

$scope.$watch('customDate', function (value) {
    $scope.customDate = value
    $scope.getCitiesLimit();
});




  $scope.$watch('selectedState', function (value) {
      $scope.selectedState = value
  });



  $scope.$watch('selectedCity', function (value) {
      $scope.cityName = value
      $scope.filteredCityInfo = $scope.cities.filter(function(item){
        return item.cityName == $scope.cityName
      })
      if($scope.filteredCityInfo.length > 0 && $scope.filteredCityInfo[0].dailyLimit > 0){
          $scope.countryDailyLimit = true;
      }
      else{
          $scope.countryDailyLimit = false;
      }
      

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

  $scope.printPass = function () {
    var divName = "passID";
    var printContents = document.getElementById(divName).innerHTML;
   
    document.body.innerHTML = printContents;

    window.print();

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
   
   
   function passsServ($http,$q) {
           this.message = '';
           this.getCityData  = function (reqJSON) {
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

        this.applyForPass  = function (reqJSON) {
            var deferred = $q.defer();

            $http.put('http://localhost:8080/api/v1/dailyLimits/' + reqJSON.id,reqJSON, {"Content-Type": "application/json"}
            ).
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
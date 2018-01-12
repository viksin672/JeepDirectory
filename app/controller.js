var jeep = angular.module('jeep',['ngRoute','ngAnimate']);

jeep.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){



  $routeProvider
  .when('/home',{
    templateUrl: 'view/home.html',
    controller:'jeepController'
  })
  .when('/contact',{
    templateUrl: 'view/contact.html',
    controller: 'contactController'
  })
  .when('/contact-success',{
    templateUrl: 'view/contact-success.html',
    controller: 'contactController'
  })
  .when('/directory',{
    templateUrl: 'view/directory.html',
    controller: 'jeepController'
  }).otherwise({
    redirectTo: '/home'
  });
}]);

jeep.directive('randomJeep',[function(){

  return{
    restrict: 'E',
    scope: {
      names: '=',
      title: '='
    },
    templateUrl: 'view/random.html',
    transclude: true,
    replace:true,
    controller: function($scope){
      $scope.random = Math.floor(Math.random() * 3);
    }
  };
}]);

jeep.controller('jeepController',['$scope','$http',function($scope, $http){

$scope.removeJeep = function(name){
  var removedJeep = $scope.names.indexOf(name);
  $scope.names.splice(removedJeep , 1 );
}

$scope.addjeep = function(){
$scope.names.push({
  name:$scope.newjeep.name,
  rank:parseInt($scope.newjeep.rank),
  color: $scope.newjeep.color,
  available: true
});
$scope.newjeep.name="";
$scope.newjeep.rank="";
$scope.newjeep.color="";
};

$scope.removeAll = function(){
  $scope.names =[];
};

$http.get('data/jeep.json').then(function(response){
  $scope.names = response.data;
  console.log(data);
});

}]);

jeep.controller('contactController',['$scope','$location',function($scope, $location){

  $scope.sendMessage = function(){
    $location.path('/contact-success');
  };
}]);

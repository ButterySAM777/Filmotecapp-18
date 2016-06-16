// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('ControladorLista', ['$scope', '$http', function($scope, $http) {

    $http.get('js/data.json').success(function(data){
        $scope.peliculas = data;

        $scope.toggleStar = function(item) {
            item.star = !item.star;
        }

        // Función que se encarga de re-cargar de nuevo la entrada de nuestro JSON
        // cuando el evento on-refresh es lanzado, en el código HTML. 
        $scope.doRefresh = function() {
          $http.get('js/data.json').success(function(data){
            $scope.peliculas = data;
            $scope.$broadcast('scroll.refreshComplete');
          });
        }


        $scope.onItemDelete = function(item) {
          $scope.peliculas.splice($scope.peliculas.indexOf(item), 1);
        };

        $scope.moveItem = function(item, fromIndex, toIndex) {
          $scope.peliculas.splice(fromIndex, 1);
          $scope.peliculas.splice(toIndex, 0, item);
        };
    });
}]);


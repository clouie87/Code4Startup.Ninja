'use strict';

app.controller('NavController', function($scope, $location, Auth){
  $scope.signedIn = Auth.signedIn;

  $scope.logout = function(){
    Auth.logout();
    console.log("Logging out");
    $location.path('/');
  };

});

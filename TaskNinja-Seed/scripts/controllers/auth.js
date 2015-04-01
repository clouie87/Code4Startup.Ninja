
'use strict';

app.controller('AuthController', function($scope, $location, Auth) {
  $scope.register = function(user) {
    Auth.register(user).then(function () {
      console.log("Register succesfully!");
      $location.path('/');

    }, function (err) {
      console.log('Error...');
    })
  };
  $scope.login = function(user) {
    Auth.login(user).then(function () {
      console.log("Logged in succesfully!");
      $location.path('/');

    }, function (err) {
      console.log('Error...');
    })
  };
  $scope.changePassword = function(user) {
    Auth.login(user).then(function () {
      $scope.user.email ='';
      $scope.user.oldPass ='';
      $scope.user.newPass ='';

      console.log("Password is succesfully changed!");

    }, function (err) {
      console.log('Error...');
    })
  }
});

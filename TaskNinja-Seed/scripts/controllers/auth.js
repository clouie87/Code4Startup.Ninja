
'use strict';

app.controller('AuthController', function($scope, $location, Auth, toaster) {
  if(Auth.signedIn()){
    $location.path('/');
  }
  $scope.register = function(user) {
    Auth.register(user).then(function () {
      toaster.pop('success', "Registered successfully!");
      console.log("Register succesfully!");
      $location.path('/');

    }, function (err) {
      console.log('Error...');
      toaster.pop('error', "Oops there was an error!");
    })
  };
  $scope.login = function(user) {
    Auth.login(user).then(function () {
      toaster.pop('success', "Logged in successfully!");
      console.log("Logged in succesfully!");
      $location.path('/');

    }, function (err) {
      console.log('Error...');
      toaster.pop('error', "Oops there was an error!");
    })
  };
  $scope.changePassword = function(user) {
    Auth.login(user).then(function () {
      $scope.user.email ='';
      $scope.user.oldPass ='';
      $scope.user.newPass ='';
      toaster.pop('success', "Password is succesfully changed!");
      console.log("Password is succesfully changed!");

    }, function (err) {
      console.log('Error...');
      toaster.pop('error', "Oops there was an error!");
    })
  }
});

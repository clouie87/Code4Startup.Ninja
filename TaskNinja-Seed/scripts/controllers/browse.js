
'use strict';

app.controller('BrowseController', function($scope, $routeParams, toaster, Task, Auth) {

  $scope.searchTask= '';
  $scope.tasks = Task.all;
  //console.log(Task.all);
  $scope.signedIn = Auth.signedIn;
  $scope.listMode = true;

  if($routeParams.taskId){
    var task = Task.getTask($routeParams.taskId).$asObject();
    $scope.listMode = false;
    setSelectedTask(task); // create a function which we define below and pass it the task

  }
  function setSelectedTask(task){
    $scope.selectedTask = task;
    //console.log('the selected task is ' + task);
    //get the task that is selected and make it the variable selectedTask

    if($scope.signedIn()){
      $scope.isTaskCreator = Task.isCreator; //checks if user is the task creator
      $scope.isOpen = Task.isOpen; //checks if the task is open
    }
  };

  $scope.cancelTask = function(taskId){
    Task.cancelTask(taskId).then(function() {
      toaster.pop('success', 'Your task was canceled!');
    });
  };


});

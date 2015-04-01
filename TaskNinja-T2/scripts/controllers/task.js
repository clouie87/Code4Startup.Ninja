'use strict';

app.controller('TaskController', function($scope, $firebase, FURL, $location, $routeParams) {
  console.log('why doesnt this print???');


  var ref = new Firebase(FURL);
	var fbTasks = $firebase(ref.child('tasks')).$asArray();
	var taskId = $routeParams.taskId;
  //$scope.tasks = fbTasks;
  console.log("length = " + fbTasks.length);




  if(taskId) {
		$scope.selectedTask = getTask(taskId);
	}

	function getTask(taskId) {
		return $firebase(ref.child('tasks').child(taskId)).$asObject();
	}

	$scope.postTask = function(task) {
		$scope.tasks.$add(task);
		toaster.pop('success', 'Task created successfully.');
		$location.path('/');
	};

	$scope.updateTask = function(task) {
		$scope.selectedTask.$save(task);
		toaster.pop('success', "Task is updated.");
		$location.path('/');
	};

});

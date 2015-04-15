
'use strict';

app.controller('BrowseController', function($scope, $routeParams, toaster, Task, Auth, Comment, Offer) {

  $scope.searchTask= '';
  $scope.tasks = Task.all;
  //console.log(Task.all);
  $scope.signedIn = Auth.signedIn;
  $scope.listMode = true;

  $scope.user = Auth.user;



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

      //Check if the current signed in user has already made an offer on this specific task
      Offer.isOffered(task.$id).then(function(data){
        $scope.alreadyOffered = data;
      });

      $scope.isTaskCreator = Task.isCreator; //checks if user is the task creator
      $scope.isOpen = Task.isOpen; //checks if the task is open

      $scope.isAssignee = Task.isAssignee;
      $scope.isCompleted = Task.isCompleted;

    }

    $scope.comments = Comment.comments(task.$id);
    $scope.offers = Offer.offers(task.$id);
    $scope.isOfferMaker = Offer.isMaker;


  };

  $scope.cancelTask = function(taskId){
    Task.cancelTask(taskId).then(function() {
      toaster.pop('success', 'Your task was canceled!');
    });
  };

  $scope.addComment = function() {
    var comment = {
      content: $scope.content,
      name: $scope.user.profile.name,
      gravatar: $scope.user.profile.gravatar
    };
    Comment.addComment($scope.selectedTask.$id, comment).then(function(){
      $scope.content='';
    });
  };

  $scope.makeOffer = function() {
    var offer = {
      total: $scope.total,
      uid: $scope.user.uid,
      name: $scope.user.profile.name,
      gravatar: $scope.user.profile.gravatar
    };

    Offer.makeOffer($scope.selectedTask.$id, offer).then(function(){
      toaster.pop('success', "Your offer has been placed!");
      $scope.total='';
      $scope.block=true;
      $scope.alreadyOffered=true;
    });

    };
  $scope.cancelOffer = function(offerId){
    console.log('cancel offer');
    Offer.cancelOffer($scope.selectedTask.$id, offerId).then(function(){
      toaster.pop('success', 'Your offer has been cancelled!');

      $scope.alreadyOffered = false; //unblocks the disable
      $scope.block = false; //unblocks the disabled condition
    });
  };

  $scope.acceptOffer = function(offerId, runnerId){
    Offer.acceptOffer($scope.selectedTask.$id, offerId, runnerId).then(function(){
      toaster.pop('success', 'Your offer has been accepted');

      Offer.notifyRunner($scope.selectedTask.$id, runnerId);
    });
  };

  $scope.completeTask = function(taskId) {
    Task.completeTask(taskId).then(function(){
      toaster.pop('success', 'Congratulations! You have completed the task!');
    });
  }


});

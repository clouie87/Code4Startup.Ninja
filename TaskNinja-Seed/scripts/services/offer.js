'use strict';

app.factory('Offer', function(FURL, $firebase, $q, Auth, Task){

  var ref = new Firebase(FURL);

  var user = Auth.user;


  var Offer = {
    offers: function(taskId) {
      return $firebase(ref.child('offers').child(taskId)).$asArray();
    },
    makeOffer: function(taskId, offer) {
      var task_offers = this.offers(taskId);

      if(task_offers) {
        return task_offers.$add(offer);
      }
    },

    isOffered: function(taskId){

      if(user && user.provider){
        var d = $q.defer();

        $firebase(ref.child('offers').child(taskId).orderByChild("uid")
          .equalTo(user.uid))
          .$asArray()
          .$loaded().then(function(data) {
            d.resolve(data.length > 0);
          }, function() {
            d.reject(false);
          });

        return d.promise;
      }
    },

    isMaker: function(offer){
      return(user && user.provider && user.uid === offer.uid);
    },

    getOffer: function(taskId, offerId){
      return $firebase(ref.child('offers').child(taskId).child(offerId));
    },

    cancelOffer: function(taskId, offerId) {
      return this.getOffer(taskId, offerId).$remove();
    },

    acceptOffer: function(taskId, offerId, runnerId) {
      var o = this.getOffer(taskId, offerId); //gets offer object by taskId and offerID
      return o.$update({accepted: true})
        .then(function(){ //updates with new accepted property then...

        var t = Task.getTask(taskId); // then get the task by taskId
        return t.$update({status: "assigned", runner: runnerId}); //and update its status to assigned and add property of runnerId

      })
        .then(function(){
        return Task.createUserTasks(taskId);
      });


    },
    notifyRunner: function(taskId, runnerId) {
      Auth.getProfile(runnerId).$loaded().then(function(runner){
        //create an object with only the info we need
        var n = {
          taskId: taskId,
          email: runner.email,
          name: runner.name
        };
        var notifications = $firebase(ref.child('notifications')).$asArray();
        return notifications.$add(n);
      });
    }
  };

  return Offer;
});

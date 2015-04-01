'use strict';

app.factory('Auth', function(FURL, $firebaseAuth, $firebase){
  var ref = new Firebase(FURL);
  var auth = $firebaseAuth(ref);

  var Auth = {

    user: {},

    login: function(user) {
      console.log('logging in');
      return auth.$authWithPassword(
        {email: user.email, password: user.password}
      );
    },

    register: function(user) {
      return auth.$createUser(
        {email: user.email, password: user.password}
      ).then(function () {
          return Auth.login(user);
        });
    },
    logout: function () {
      auth.$unauth();
    },
    changePassword: function (user) {
      return auth.$changePassword(
        {email: user.email, oldPassword: user.oldPass, newPassword: user.newPass}
      );
    },
    signedIn: function(){
      return !!Auth.user.provider;
      //same as Auth.user && Auth.user.provider just shorter
    }
  };

  auth.$onAuth(function(authData){ //when is someone staying logged listens for when someones auth changes
    if(authData) {
      angular.copy(authData, Auth.user); //check to see if data
    }else{
      angular.copy({}, Auth.user); //when log out we release the user
    }
  });

  return Auth;

});

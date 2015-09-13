Template.signIn.events({
  'click [data-action=sign-in]': function (event, template) {
    Meteor.loginWithMeteorDeveloperAccount({}, function (error) {
      if (error) {
        alert(error);
      } else {
        IonModal.close();
      }
    });
  },

  'click [data-action=sign-in-facebook]': function(event) {
    Meteor.loginWithFacebook({}, function(error){
      if(error){
        alert(error);
        throw new Meteor.Error("Facebook login failed");
      }else{
        IonModal.close();
      }
    });
  }

});

Template.favorites.created = function () {
  this.autorun(function () {
    if(Meteor.user() || Meteor.loggingIn()){
      this.subscription = Meteor.subscribe('productListComposite',Meteor.user().profile.favoriteProductIds);
    }
  }.bind(this));
};

Template.favorites.rendered = function () {

  if (!Meteor.loggingIn() && !Meteor.user()) {
    IonModal.open('signIn');
  }

  if(this.subscription){
    this.autorun(function () {
      if (!this.subscription.ready()) {
        IonLoading.show();
      } else {
        IonLoading.hide();
      }
    }.bind(this));
  }

};

Template.favorites.helpers({
  products: function () {
    if(Meteor.user()){
      return Meteor.user().favortiteProducts();   //function provided by users.helpers
    }
  }
});

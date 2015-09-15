Template.favorites.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('productListComposite',Meteor.user().profile.favoriteProductIds);
    //this.subscription = Meteor.subscribe('products');
  }.bind(this));
};

Template.favorites.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.favorites.helpers({
  products: function () {
    return Meteor.user().favortiteProducts();   //function provided by users.helpers
  }
});

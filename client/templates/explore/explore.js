Template.explore.created = function () {
  this.autorun(function () {
    //this.subscription = Meteor.subscribe('products');
    this.subscription = Meteor.subscribe('productCategories');
  }.bind(this));
};

Template.explore.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.explore.helpers({
  //products: function () {
  //  return Products.find({}, {sort: {numberOfVotes: -1, name: -1}});
  //},
  productCategories: function(){
    return ProductCategories.find({});
  }
});

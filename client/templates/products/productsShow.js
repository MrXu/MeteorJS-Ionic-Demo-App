Template.productsShow.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('product', Router.current().params._id);
  }.bind(this));
};

Template.productsShow.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.productsShow.helpers({
  product: function () {
    return Products.findOne({_id: Router.current().params._id});
  },

  pictures: function (){
    if(this.pictures != null) {
      if (this.pictures.length > 0) {
        return UploadedImages.find({_id: {$in: this.pictures}}).fetch();
      }
    }
  },

  host: function (){
    return Meteor.users.findOne({_id: this.userId});          //under with product tag, 'this' refers to product
  },

  notMyProduct: function(){
    if(!Meteor.user()){
      return true;
    }
    return (Meteor.user()._id != this.userId);
  },

  comments: function () {
    return Comments.find({productId: Router.current().params._id}, {sort: {createdAt: -1}});
  }
});

Template.productsShow.events({
  'click [data-action=new-comment]': function (event, template) {
    if (Meteor.user()) {
      IonModal.open('newComment', {productId: this._id});
    } else {
      IonModal.open('signIn');
    }
  },

  'click [data-action=initiate-chat]': function(event,template) {
    if (Meteor.user()) {
      Meteor.call("Chat.init", this._id, function(error, result){
        if(error){
          console.log('initiate chat fail');
        }
        console.log(result);
        var chatId = result;
        Router.go('chat',{_id:chatId});
      });

    } else {
      IonModal.open('signIn');
    }
  }
});

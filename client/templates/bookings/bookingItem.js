/**
 * Created by xuwei on 15/9/15.
 */

Template.bookingItem.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('product',this.productId);
        this.subscription = Meteor.subscribe('user',this.hostId);
        this.subscription = Meteor.subscribe('user',this.buyerId);
    }.bind(this));
};

Template.bookingItem.rendered = function () {
    this.autorun(function () {
        if (!this.subscription.ready()) {
            IonLoading.show();
        } else {
            IonLoading.hide();
        }
    }.bind(this));
};

Template.bookingItem.helpers({

    oppositeUser: function() {
        if(this.buyerId == Meteor.user()._id){
            return Meteor.users.findOne({_id:this.hostId});
        }
        if(this.hostId == Meteor.user()._id){
            return Meteor.users.findOne({_id:this.buyerId});
        }
    },
    product: function(){
        return Products.findOne({_id: this.productId});
    }

});
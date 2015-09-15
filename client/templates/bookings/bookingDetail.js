/**
 * Created by xuwei on 15/9/15.
 */

Template.bookingDetail.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('bookingDetail', Router.current().params._id);
    }.bind(this));
};

Template.bookingDetail.rendered = function () {
    this.autorun(function () {
        if (!this.subscription.ready()) {
            IonLoading.show();
        } else {
            IonLoading.hide();
        }
    }.bind(this));
};

Template.bookingDetail.helpers({

    booking: function(){
      return Bookings.findOne({_id: Router.current().params._id});
    },
    product: function(){
        var booking = Bookings.findOne({_id: Router.current().params._id});
        return Products.findOne({_id:booking.productId});
    },

    iamSeller: function () {
        var booking = Bookings.findOne({_id: Router.current().params._id});
        return (booking.hostId === Meteor.user()._id);
    },

    iamBuyer: function(){
        var booking = Bookings.findOne({_id: Router.current().params._id});
        return (booking.buyerId === Meteor.user()._id);
    },

    buyer: function(){
        var booking = Bookings.findOne({_id: Router.current().params._id});
        return Meteor.users.findOne({_id:booking.buyerId});
    },

    host: function(){
        var booking = Bookings.findOne({_id: Router.current().params._id});
        return Meteor.users.findOne({_id:booking.hostId});
    }

});
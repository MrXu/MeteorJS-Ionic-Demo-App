/**
 * Created by xuwei on 5/9/15.
 */
Template.bookings.rendered = function () {
    if (!Meteor.loggingIn() && !Meteor.user()) {
        IonModal.open('signIn');
    }
};

Template.bookings.helpers({

    bookingListAsBuyer: function(){
        return Bookings.find({buyerId: Meteor.user()._id});
    },

    bookingListAsSeller: function(){
        return Bookings.find({hostId: Meteor.user()._id});
    },

    isEmpty: function(){
        var buyerBooking = Bookings.findOne({buyerId: Meteor.user()._id});
        var sellerBooking = Bookings.find({hostId: Meteor.user()._id});
        return (!buyerBooking && !sellerBooking);
    }

});
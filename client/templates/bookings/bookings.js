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
        if(Meteor.user()){
            return Bookings.find({buyerId: Meteor.user()._id});
        }else{
            return null;
        }
    },

    bookingListAsSeller: function(){
        if(Meteor.user()) {
            return Bookings.find({hostId: Meteor.user()._id});
        }else{
            return null;
        }
    },

    isEmpty: function(){
        if(Meteor.user()) {
            var buyerBooking = Bookings.findOne({buyerId: Meteor.user()._id});
            var sellerBooking = Bookings.findOne({hostId: Meteor.user()._id});
            return (!buyerBooking && !sellerBooking);
        }else{
            return true;
        }
    }

});
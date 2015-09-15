/**
 * Created by xuwei on 14/9/15.
 */
Bookings = new Mongo.Collection('bookings');

Bookings.helpers({
    productSeller: function () {
            return Meteor.users.findOne({_id: this.hostId});
    },
    productBuyer: function () {
        return Meteor.users.findOne({_id: this.buyerId});
    }
});

Bookings.attachSchema(new SimpleSchema({
    buyerId: {
        type: String,
        autoValue: function () {
            if (this.isInsert) {
                return Meteor.userId();
            } else {
                this.unset();
            }
        }
    },
    productId: {
        type: String
    },
    hostId: {
        type: String
    },
    appointmentDateTime: {
        type: Date
    },
    price: {
        type: Number
    },
    createdAt: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date();
            } else {
                this.unset();
            }
        }
    }
}));
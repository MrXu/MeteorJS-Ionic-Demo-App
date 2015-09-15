/**
 * Created by xuwei on 11/9/15.
 */
Chats = new Mongo.Collection('chats');

Chats.helpers({
    productSeller: function (productId) {
       var host = Products.findOne({_id: productId});
        if(host!=null){
            console.log("return seller");
            return Meteor.users.findOne({_id: host.userId});
        }
    },
    productBuyer: function (userId) {
        console.log("return buyer");
        return Meteor.users.findOne({_id: userId});
    }
});

Chats.attachSchema(new SimpleSchema({
    userId: {
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
    sellerId: {
        type: String
    },
    chatBody: {
        type: Array,
        optional: true,
        minCount: 0
    },
    "chatBody.$": {
        type: Object,
        optional: true
    },
    "chatBody.$.fromUserId": {
        type: String
    },
    "chatBody.$.content": {
        type: String
    },
    "chatBody.$.createAt": {
        type: Date
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
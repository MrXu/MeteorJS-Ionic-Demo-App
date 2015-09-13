/**
 * Created by xuwei on 13/9/15.
 */
Template.chatMessage.helpers({

    isMe: function(){
        return (Meteor.user()._id == this.fromUserId);
    }

});
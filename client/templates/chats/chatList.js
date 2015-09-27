/**
 * Created by xuwei on 13/9/15.
 */

Template.chatList.created = function () {
    this.autorun(function () {

        if (Meteor.loggingIn() || Meteor.user()) {
            var buyerChats = Meteor.user().profile.chatIdsAsBuyer;
            var sellerChats = Meteor.user().profile.chatIdsAsSeller;
            var allChats = buyerChats.concat(sellerChats);

            if(allChats.length>0){
                this.subscription = Meteor.subscribe('chatList',allChats);
                console.log("app level subscription");
            }
        }

    }.bind(this));
};

Template.chatList.rendered = function () {

    if (!Meteor.loggingIn() && !Meteor.user()) {
        IonModal.open('signIn');
    }

    if(this.subscription){
        this.autorun(function () {
            if (!this.subscription.ready()) {
                IonLoading.show();
                console.log("not ready");
            } else {
                IonLoading.hide();
                console.log("ready");
            }
        }.bind(this));
    }

};

Template.chatList.helpers({
    allChatsList: function(){
        return Chats.find().fetch();
    }
});
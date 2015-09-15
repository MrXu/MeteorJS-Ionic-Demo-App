
Template.chat.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('chatComposite',Router.current().params._id);
    }.bind(this));
};

Template.chat.rendered = function () {
    this.autorun(function () {
        if (!this.subscription.ready()) {
            IonLoading.show();
            console.log("not ready");
        } else {
            IonLoading.hide();
            console.log("ready");
        }
    }.bind(this));
};

Template.chat.helpers({
    chatObject: function () {
        return Chats.findOne({_id: Router.current().params._id});
    },
    chatTarget: function(){
        var theChat = Chats.findOne({_id: Router.current().params._id});
        if(theChat!=null){
            if(theChat.userId == Meteor.user()._id){
                console.log('get seller'+theChat.productId);
                return theChat.productSeller(theChat.productId);
            }else{
                console.log('get buyer');
                return theChat.productBuyer(theChat.userId);
            }
        }else{
            console.log('loading user');
            return null;
        }
    }
});

Template.chat.events({

    "submit .new-message": function(event){
        event.preventDefault();

        //get value
        var message = event.target.newMessage.value;
        console.log(message);

        //validation
        if(message==="") return;

        //call function
        Meteor.call("Chat.newMessage",Router.current().params._id,message);

        event.target.newMessage.value = "";
    },

    'click [data-action=new-booking]': function (event, template) {
        if (Meteor.user()) {
            IonModal.open('newBooking', {productId: this.productId});
        } else {
            IonModal.open('signIn');
        }
    }

});

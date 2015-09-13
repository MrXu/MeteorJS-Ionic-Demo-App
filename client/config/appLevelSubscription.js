/**
 * Created by xuwei on 13/9/15.
 */
// VERY IMPORTANT FUNCTION
Tracker.autorun(function(){

    var buyerChats = Meteor.user().profile.chatIdsAsBuyer;
    var sellerChats = Meteor.user().profile.chatIdsAsSeller;
    var allChats = buyerChats.concat(sellerChats);

    if(allChats.length>0){
        Meteor.subscribe('chatsOfUser',allChats);
        console.log("app level subscription");
    }

});
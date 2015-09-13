/**
 * Created by xuwei on 5/9/15.
 */
Template.notifications.rendered = function () {
    if (!Meteor.loggingIn() && !Meteor.user()) {
        IonModal.open('signIn');
    }
};

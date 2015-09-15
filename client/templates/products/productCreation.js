/**
 * Created by xuwei on 6/9/15.
 */
Template.productCreation.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('productCategories');
        this.subscription = Meteor.subscribe('images');
    }.bind(this));
};

Template.productCreation.rendered = function () {
    this.autorun(function () {
        if (!this.subscription.ready()) {
            IonLoading.show();
        } else {
            IonLoading.hide();
        }
    }.bind(this));
};

Template.productCreation.helpers({

});

Template.productCreation.events({

});

//after success post
AutoForm.hooks({
    'insertProductForm': {
        onSuccess: function (operation, result, template) {
            console.log(result);
            IonModal.close();
            Router.go('productDetail', {_id: result});
        }
    }
});
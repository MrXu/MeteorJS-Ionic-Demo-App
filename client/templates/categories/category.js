/**
 * Created by xuwei on 5/9/15.
 */
Template.categoryPage.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('categoryComposite', Router.current().params._id);
    }.bind(this));
};

Template.categoryPage.rendered = function () {
    this.autorun(function () {
        if (!this.subscription.ready()) {
            IonLoading.show();
        } else {
            IonLoading.hide();
            console.log('render function');
        }
    }.bind(this));
};

Template.categoryPage.helpers({

    category: function() {
        console.log('helper function');
        return ProductCategories.findOne({_id: Router.current().params._id});
    },

    products: function () {
        return Products.find({categoryId: Router.current().params._id}, {sort: {createdAt: -1}});
    }

});

Template.categoryPage.events({
    'click [data-action=new-comment]': function (event, template) {
        if (Meteor.user()) {
            IonModal.open('newComment', {productId: this._id});
        } else {
            IonModal.open('signIn');
        }
    }
});

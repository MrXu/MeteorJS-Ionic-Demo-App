Meteor.users.before.insert(function (userId, doc) {
  doc.profile.votedProductIds = [];
  doc.profile.favoriteProductIds = [];
  doc.profile.hostedProductIds = [];
  doc.profile.chatIdsAsBuyer = [];
  doc.profile.chatIdsAsSeller = [];
});

Meteor.users.helpers({
    votedProducts: function () {
        return Products.find({_id: {$in: this.profile.votedProductIds}});
    },
    favortiteProducts: function (){
        return Products.find({_id: {$in: this.profile.favoriteProductIds}});
    }
});

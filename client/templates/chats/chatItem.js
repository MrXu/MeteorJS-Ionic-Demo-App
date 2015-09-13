/**
 * Created by xuwei on 13/9/15.
 */
//subscription done in chatList.js
Template.chatItem.helpers({

    chatTarget: function() {
        if (this.userId == Meteor.user()._id) {
            console.log('get seller' + this.productId);
            var product = Products.findOne({_id:this.productId});
            if(product){
                return product.author();
            }
            //return this.productSeller(this.productId);
        } else {
            console.log('get buyer');
            return this.productBuyer(this.userId);
        }
    },
    product: function(){
        return Products.findOne({_id: this.productId});
    }
});
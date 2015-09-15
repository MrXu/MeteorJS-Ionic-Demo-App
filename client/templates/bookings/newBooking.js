/**
 * Created by xuwei on 14/9/15.
 */
Template.newBooking.created = function () {
    this.autorun(function () {
        var productId = this.data.productId;
        this.subscription = Meteor.subscribe('product',productId);
    }.bind(this));
};

Template.newBooking.rendered = function () {
    this.autorun(function () {
        if (!this.subscription.ready()) {
            IonLoading.show();
        } else {
            IonLoading.hide();
        }
    }.bind(this));
};

Template.newBooking.helpers({

    product: function(){
        console.log(this);
        return Products.findOne({_id:this.productId});
    },
    coverPic: function(){
        if(this.pictures != null){
            if(this.pictures.length>0){
                return UploadedImages.find({_id: {$in: this.pictures}}).fetch()[0];
            }
        }
        return null;
    },
    author: function(){
        return this.author();
    }

});

Template.newBooking.events({

    "submit #bookings-new-form": function(event){
        event.preventDefault();

        //get value
        var dateTime = event.target.appointmentDateTime.value;
        var productId = event.target.productId.value;
        console.log(dateTime);

        //validation
        if(dateTime==="" || productId==="") return;

        //call function
        console.log(productId);
        Meteor.call("Booking.new",productId,dateTime, function(err,data){
            if(err){
                console.log("Booking failed");
            }
            console.log("Booking success "+data);
        });

    }

});
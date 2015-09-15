Meteor.methods({
  'Products.vote': function (_id) {
    if (!Meteor.user()) {
      return;
    }

    if (_(Meteor.user().profile.votedProductIds).include(_id)) {
      return;
    }

    Products.update({_id: _id}, {$inc: {numberOfVotes: 1}, $addToSet: {voterIds: this.userId}});
    Meteor.users.update({_id: this.userId}, {$addToSet: {'profile.votedProductIds': _id}});
  },

  'Product.like': function (_id) {
    if (!Meteor.user()) {
      return;
    }
    if (_(Meteor.user().profile.favoriteProductIds).include(_id)) {
      Meteor.users.update({_id: Meteor.user()._id},{$pull: {'profile.favoriteProductIds': _id}});
    }else{
      Meteor.users.update({_id: Meteor.user()._id},{$addToSet: {'profile.favoriteProductIds': _id}});
    }
  },


  // create a chat if not existed yet
  'Chat.init': function(productId){
    if(!Meteor.user()){
      return null;
    }

    if(productId===''){
      return null;
    }

    if(Products.find({_id: productId}).count()<1){
      return null;
    }
    var product = Products.findOne({_id: productId});
    var sellerId = product.userId;

    //forbid user initiate chat with self
    if(sellerId == Meteor.user()._id){
      return null;
    }

    var previousChat = Chats.findOne({userId:Meteor.user()._id,productId:productId});
    if(previousChat != null){
      return previousChat._id;//chat for this usr and product already exist, return
    }

    var chatId = Chats.insert({
      userId:  Meteor.user()._id,
      productId: productId,
      sellerId: sellerId
    });

    //add chat id to BOTH sides
    Meteor.users.update({_id: Meteor.user()._id},{$addToSet: {'profile.chatIdsAsBuyer': chatId}});
    Meteor.users.update({_id: Products.find({_id:productId}).userId},{$addToSet: {'profile.chatIdsAsSeller': chatId}});

    return chatId;
  },


  //chat insert record
  'Chat.newMessage': function (chatId,message) {
    if(!Meteor.user()){
      return 'error user';
    }
    if(chatId==""){
      return 'error id';
    }
    if(Chats.find({_id: chatId}).count()<1){
      return 'null'
    }
    var buyerChats = Meteor.user().profile.chatIdsAsBuyer;
    var sellerChats = Meteor.user().profile.chatIdsAsSeller;
    var allChats = buyerChats.concat(sellerChats);
    if(allChats.indexOf(chatId) > -1){

      var newRecord = {
        "fromUserId": Meteor.user()._id,
        "content": message,
        "createAt": new Date()
      }


      Chats.update({_id:chatId},{$push: {"chatBody":newRecord}});


    }

  },

  //new bookings methods
  'Booking.new': function (productId, dateTime) {
    if(!Meteor.user()){
      return 'error user';
    }
    if(productId==="" || dateTime ===""){
      return 'error id';
    }
    var appointmentDate = new Date(dateTime);
    var product = Products.findOne({_id:productId});
    if(!product){
      return null;
    }

    if(product.userId == Meteor.user()._id){
      return "cannot booking owned product";
    }

    var newBooking = {
      buyerId: Meteor.user()._id,
      productId: productId,
      hostId: product.userId,
      appointmentDateTime: appointmentDate,
      price: product.price
    }

    var bookingId = Bookings.insert(newBooking);

    return bookingId;

  }

});

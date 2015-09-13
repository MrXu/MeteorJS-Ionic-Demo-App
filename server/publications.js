Meteor.publish('products', function() {
  return Products.find();
});

Meteor.publish('productCategories', function(){
  return ProductCategories.find();
});

Meteor.publish('images', function(){
  return UploadedImages.find();
});

Meteor.publish('productsSearch', function(query) {
  check(query, String);

  if (_.isEmpty(query)) {
    return this.ready();
  }

  return Products.search(query);
});

Meteor.publishComposite('product', function(_id) {
  return {
    find: function() {
      return Products.find({_id: _id});
    },
    children: [
      {
        find: function(product) {
          return Meteor.users.find({_id: product.userId});
        }
      },
      {
        find: function (product) {
          if(product.pictures!=null){
            if(product.pictures.length>0){
              return UploadedImages.find({_id: {$in: product.pictures}});
            }
          }
        }
      },
      {
        find: function(product) {
          return Meteor.users.find({_id: product.voterIds});
        }
      },
      {
        find: function(product) {
          return Comments.find({productId: product._id});
        },
        children: [
          {
            find: function(comment) {
              return Meteor.users.find({_id: comment.userId});
            }
          }
        ]
      }
    ]
  };
});

Meteor.publishComposite('user', function(_id) {
  return {
    find: function() {
      return Meteor.users.find({_id: _id});
    },
    children: [
      {
        find: function(user) {
          return Products.find({_id: {$in: user.profile.votedProductIds}});
        }
      }
    ]
  };
});


/**
 * Publish category and products under the category
 */
Meteor.publishComposite('categoryComposite', function(_id){

  return {

    find: function () {
      return ProductCategories.find({_id: _id});
    },
    children: [
      {
        find: function (category) {
          return Products.find({categoryId: category._id});
        },
        children: [
          {
            find: function (product) {
              return Meteor.users.find({_id: product.userId});
            }
          },
          {
            find: function (product) {
              if(product.pictures!=null){
                if(product.pictures.length>0) {
                  return UploadedImages.find({_id: {$in: product.pictures}});
                }
              }
            }
          }
        ]
      }
    ]

  }

});


/**
 *  Publish chats and users
 */
Meteor.publishComposite('chatComposite', function(_id){

  return {
    find: function() {
      return Chats.find({_id: _id});
    },
    children: [
      {
        find: function(chat){
          return Meteor.users.find({_id: chat.userId});
        }
      },
      {
        find: function(chat){
          return Products.find({_id: chat.productId});
        },
        children: [
          {
            find:function(product){
              return Meteor.users.find({_id:product.userId});
            }
          }
        ]
      }
    ]
  }

});

Meteor.publish('chatsOfUser',function(allChats){
          return Chats.find({_id: {$in: allChats}});
});

Meteor.publishComposite('chatList', function(allChats){
  return {
    find: function(){
      return Chats.find({_id: {$in: allChats}});
    },
    children:[
      {
        find: function(chat){
          return Meteor.users.find({_id: chat.userId});
        }
      },
      {
        find: function(chat){
          return Products.find({_id: chat.productId});
        },
        children: [
          {
            find:function(product){
              return Meteor.users.find({_id:product.userId});
            }
          }
        ]
      }
    ]
  }
});
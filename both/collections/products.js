Products = new Mongo.Collection('products');

Products.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
});

Products.helpers({
  datePosted: function () {
    return moment(this.createdAt).format('M/D');
  },
  author: function () {
    return Meteor.users.findOne({_id: this.userId});
  },
  voters: function () {
    return Meteor.users.find({_id: {$in: this.voterIds}});
  }
});

RegExp.escape = function(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

Products.search = function(query) {
  if (!query) {
    return;
  }
  return Products.find({
    name: { $regex: RegExp.escape(query), $options: 'i' }
  }, {
    limit: 20
  });
};

Products.attachSchema(new SimpleSchema({
  name: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: 'Title'
    },
    max: 50
  },
  description: {
    type: String,
    autoform: {
      'label-type': 'placeholder',
      placeholder: 'Description'
    },
    max: 200
  },
  price: {
    type: Number,
    autoform: {
      'label-type': 'placeholder',
      placeholder: 'Price'
    }
  },
  duration: {
    type: Number,
    autoform: {
      'label-type': 'placeholder',
      placeholder: 'Duration (in hour)'
    }
  },
  userId: {
    type: String,
    autoValue: function () {
      if (this.isSet) {
        return;
      }
      if (this.isInsert) {
        return Meteor.userId();
      } else {
        this.unset();
      }
    }
  },
  voterIds: {
    type: [String],
    optional: true,
    defaultValue: []
  },
  numberOfVotes: {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  numberOfComments: {
    type: Number,
    optional: true,
    defaultValue: 0
  },
  categoryId: {
    type: String,
    autoform: {
      type: 'select',
      label: 'Category',
      options: function(){
        return ProductCategories.find().map(function(c){
          return {label: c.name, value: c._id};
        });
      }
    },
    max: 200
  },
  createdAt: {
    type: Date
  },
  pictures: {
    type: [String],
    label: 'Choose pictures',
    optional: true
  },
  "pictures.$": {
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'UploadedImages',
        accept: 'image/*'
      }
    }
  }
}));

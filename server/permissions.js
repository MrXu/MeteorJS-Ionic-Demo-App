Products.allow({
  'insert': function(userId, doc) {
    return userId;
  },
  'update': function(userId, doc, fields, modifier) {
    return userId === doc.userId;
  },
  'remove': function(userId, doc) {
    return false;
  }
});

Comments.allow({
  'insert': function(userId, doc) {
    return userId;
  },
  'update': function(userId, doc, fields, modifier) {
    return userId === doc.userId;
  },
  'remove': function(userId, doc) {
    return false;
  }
});

UploadedImages.allow({
  'insert': function(userId, doc){
    return userId;
  },
  'download': function(userId){
    return true;
  },
  'update': function(userId, doc){
    return userId === doc.userId;
  }
});
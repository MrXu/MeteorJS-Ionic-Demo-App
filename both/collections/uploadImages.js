/**
 * Created by xuwei on 7/9/15.
 */

//var imagePath = process.env.PWD + '/public/images/uploaded';

UploadedImages = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", {path: "~/Meteor/passion/public/images/uploaded"})],
    filter: {
        maxSize: 1048576, // in bytes
        allow: {
            contentTypes: ['image/*']
        },
        onInvalid: function (message) {
            if (Meteor.isClient) {
                alert(message);
            } else {
                console.log(message);
            }
        }
    }
});
/**
 * Created by xuwei on 2/9/15.
 */
ProductCategories = new Mongo.Collection("productCategories");

ProductCategories.attachSchema(new SimpleSchema({
    imageName: {
        type: String,
        max: 200
    },
    name: {
        type: String,
        max: 200
    },
    description: {
        type: String,
        max: 200
    }
}));

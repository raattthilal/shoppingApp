const mongoose = require('mongoose');

function transform(doc, ret) {
    var id = doc._id;
    delete ret._id;
    ret.id = id;
}
var params = {
    toObject: {
        transform: transform
    },
    toJSON: {
        transform: transform
    }
};
// Categories Schema
const CategoriesSchema = mongoose.Schema({

    name: String,

    created_at : {
        type: Date,
        default:Date.now()
      },

    status: {
        type : Number,
        default : 1
            }

}, params);


const Categories = module.exports = mongoose.model('Categories', CategoriesSchema);




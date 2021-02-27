const mongoose = require('mongoose');
require('./categories');
function transform(doc, ret) {
    var id = doc._id;
    delete ret._id;
    ret.id = id;

  if(ret.category_id){
    ret.categories= ret.category_id;
    delete ret.category_id;
  }
  
}
var params = {
    toObject: {
        transform: transform
    },
    toJSON: {
        transform: transform
    }
};
// Post Schema
const ProductSchema = mongoose.Schema({
    
    title:String,

    description:String,

    image:String,

    category_id: {
       ref:'Categories',
       type :mongoose.Schema.Types.ObjectId
      },

    price:Number
      ,

    modified_at: {
        type: Date,
        default:Date.now()
      },

    created_at : {
        type: Date,
        default:Date.now()
      },

    status: {
        type : Number,
        default : 1
            }

}, params);


const Product = module.exports = mongoose.model('Products', ProductSchema);


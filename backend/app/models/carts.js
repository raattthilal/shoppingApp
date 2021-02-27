const mongoose = require('mongoose');
require('./products');
require('./users');
function transform(doc, ret) {
    var id = doc._id;
    delete ret._id;
    ret.id = id;

if(ret.product_id){
    ret.products= ret.product_id;
    delete ret.product_id
  }
  
  
  if(ret.user_id){
    ret.users= ret.user_id;
    delete ret.user_id;
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
// View Schema
const CartSchema = mongoose.Schema({

    product_id:{
        ref:'Products',
       type :mongoose.Schema.Types.ObjectId
      },
      
    user_id: {
        ref:'Users',
       type :mongoose.Schema.Types.ObjectId
      },
    quantity:{
      type:Number,
      default:1
    },
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


const Carts = module.exports = mongoose.model('Carts', CartSchema);




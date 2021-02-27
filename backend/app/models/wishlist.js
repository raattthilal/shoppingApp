const mongoose = require('mongoose');
require('./products');
require('./users');
function transform(doc, ret) {
    var id = doc._id;
    delete ret._id;
    ret.id = id;

if(ret.user_id){
    ret.users= ret.user_id;
    delete ret.user_id;
  }
if(ret.product_id){
    ret.products= ret.product_id;
    delete ret.product_id;
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
// Wishlist Schema
const WishlistSchema = mongoose.Schema({

     user_id: {
        ref:'Users',
        type :mongoose.Schema.Types.ObjectId
      },
     product_id: {
        ref:'Products',
        type :mongoose.Schema.Types.ObjectId
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


const Wishlist = module.exports = mongoose.model('Wishlists', WishlistSchema);




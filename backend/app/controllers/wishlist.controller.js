const Wishlist = require('../models/wishlist');

module.exports = {

    // Get All Tagss
    listWishlist: async (req, res, next) => {
        let findObj={
            status: 1 
        }
        if(req.identity.id){
            findObj.user_id = req.identity.id;
        }
        await Wishlist.find(findObj).populate(['product_id']).exec( (err, data) => {

            if (err || data.length == 0) {
                return res.send({
                    success: false,
                    message: "No Wishlist founded..!",
                    error: err ? err : "No active wishlist data in db"
                })
            }

            let result = {
                data: data,
                success: true
            }
            res.send(result);
        })
    },
    countWishlist:async (req,res,next)=>{
        let findObj={
            status: 1 
        }
        if(req.identity.id){
            findObj.user_id = req.identity.id;
        }
        const count = await Wishlist.count(findObj); 
        let result = {
            count:count?count:0,
            success: true
        }
        return res.send(result);
    },

    //Update Tags
    addWishlist: async (req, res, next) => {
        let product_id = req.body.product_id;
        let user_id= req.identity.id;

        const wishlist = new Wishlist({
            user_id: user_id,
            product_id:product_id,
            status: 1
        }) 
        
        
      let dataCheck = await Wishlist.findOne({ "user_id": user_id, "product_id":product_id,"status": "1" });
         if (dataCheck || dataCheck!=null ) {
                return res.send({
                    success: false,
                    message: "product Already founded in this Wishlist "
                })
        }
       
        console.log("Not found, so adding as new");
        await Wishlist.create(wishlist, (err, data) => {
            if (err) {
                return res.send({
                    success: false,
                    error: err,
                    message: 'Failed to add new wishlist'
                });
            } else {
                return res.send({
                    success: true,
                    id: data.id,
                    message: 'New Wishlist added successfully'
                });
            }
        })     
        
    },
    //Delete wishlist
    deleteWishlist: async (req, res, next) => {
        let id = req.params.id;
        let update = {
            status: 0
        }
        await Wishlist.find({ "_id": id, "status": "1" },async (err, data) => {
            if (err || data.length == 0) {
                return res.send({
                    success: false,
                    message: "Wishlist Not founded with this Wishlist id"
                })
            }
            await Wishlist.findByIdAndUpdate(id,
                {
                    $set: update
                }, { new: true },
                (err, data) => {
                    if (err || !data) {
                        return res.send({
                            success: false,
                            message: "Wishlist Deletion failed..!"
                        })
                    }
                    return res.send({
                        success: true,
                        message: "Wishlist Deleted successfully"
                    })
                });
        })
    }

}
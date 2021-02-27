const Carts = require('../models/carts');
const Wishlist = require('../models/wishlist');
module.exports = {

    // Get All Tagss
    listCarts: async (req, res, next) => {
        let findObj={
            status: 1 
        }
        if(req.identity.id){
            findObj.user_id = req.identity.id;
        }
        await Carts.find(findObj).populate(['product_id']).exec( (err, data) => {

            if (err || data.length == 0) {
                return res.send({
                    success: false,
                    message: "No Products founded..!",
                    error: err ? err : "No active products data in cart"
                })
            }
            let totalCost=0
            for(let i=0;i<data.length;i++){
              totalCost += data[i].product_id.price * data[i].quantity
            }
            let result = {
                data: data,
                totalcost:totalCost,
                success: true
            }
            res.send(result);
        })
    },
    countCarts: async (req,res,next)=>{
        let findObj={
            status: 1 
        }
        if(req.identity.id){
            findObj.user_id = req.identity.id;
        }
        const count = await Carts.count(findObj); 
        let result = {
            count:count?count:0,
            success: true
        }
        return res.send(result);
    },

    //Update Tags
    addCarts: async (req, res, next) => {

        let user_id= req.identity.id;
        const carts = new Carts({
            user_id: user_id,
            product_id:req.body.product_id,
            status: 1
        }) 
        //from wishlist
        if(req.body.wishlist_id){
            
            let id = req.body.wishlist_id;
            let update = {
                status: 0
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
                    console.log("Deleted wishlist");
                    });
           
        }
        let obj={
            user_id: user_id,
            product_id:req.body.product_id,
            status: 1
        }
        let CartCheck = await Carts.findOne(obj);
        if(CartCheck && CartCheck!=null){
            return res.send({
                success: false,
                message: 'Product already in cart'
            });
        }
         Carts.create(carts, (err, data) => {
            if (err) {
                return res.send({
                    success: false,
                    error: err,
                    message: 'Failed to add new product'
                });
            } else {
                return res.send({
                    success: true,
                    id: data.id,
                    message: 'New product added successfully'
                });
            }
        })     
        
    },
    //update Carts
    updateCarts: async (req, res, next) => {
        let id = req.params.id;
        let update = {
            quantity:req.body.quantity
        }
        await Carts.find({ "_id": id, "status": "1" },async (err, data) => {
            if (err || data.length == 0) {
                return res.send({
                    success: false,
                    message: "product Not founded with this Carts id"
                })
            }
            await Carts.findByIdAndUpdate(id,
                {
                    $set: update
                }, { new: true },
                (err, data) => {
                    if (err || !data) {
                        return res.send({
                            success: false,
                            message: "Cartsitem updation failed..!"
                        })
                    }
                    return res.send({
                        success: true,
                        message: "Cartsitem updated successfully"
                    })
                });
        })
    },
     //Delete Carts
     clearAll: async (req, res, next) => {
        let user_id= req.identity.id;
        let update = {
            status: 0
        }
    
            await Carts.updateMany({ "user_id": user_id, "status": "1" },
                {
                    $set: update
                }, { new: true },
                (err, data) => {
                    if (err || !data) {
                        return res.send({
                            success: false,
                            message: "Cartsitem Deletion failed..!"
                        })
                    }
                    return res.send({
                        success: true,
                        message: "Cartsitem Deleted successfully"
                    })
                });
    },
    //Delete Carts
    deleteCarts: async (req, res, next) => {
        let id = req.params.id;
        let update = {
            status: 0
        }
        await Carts.find({ "_id": id, "status": "1" },async (err, data) => {
            if (err || data.length == 0) {
                return res.send({
                    success: false,
                    message: "product Not founded with this Carts id"
                })
            }
            await Carts.findByIdAndUpdate(id,
                {
                    $set: update
                }, { new: true },
                (err, data) => {
                    if (err || !data) {
                        return res.send({
                            success: false,
                            message: "Cartsitem Deletion failed..!"
                        })
                    }
                    return res.send({
                        success: true,
                        message: "Cartsitem Deleted successfully"
                    })
                });
        })
    }

}
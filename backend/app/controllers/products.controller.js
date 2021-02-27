const Post = require('../models/products');


module.exports = {
    //Create new Post
    createPost: (req, res, next) => {
        const newPost = new Post({
            title: req.body.title,
            description: req.body.description,
            category_id: req.body.category_id,
            image: req.body.image,
            price:req.body.price,
            status: 1
        })
        Post.create(newPost, (err, data) => {
            if (err) {
                return res.send({
                    success: false,
                    error: err,
                    message: 'Failed to create new Post'
                });
            } else {
                return res.send({
                    success: true,
                    id: data.id,
                    message: 'New Post created successfully'
                });
            }
        })
    },

    //View Single Post
    getPost: async (req, res, next) => {
        let id = req.params.id;
        await Post.findOne({ "_id": id, "status": "1" }).populate(['category_id']).exec((err, data) => {
            if (err || data.length == 0) {
                return res.send({
                    success: false,
                    message: "Post Not founded..!",
                    error: err ? err : "No active Posts data in db"
                })
            }
           
            let result = {
                data: data,
                success: true
            }
           
            return res.send(result);
        })
    },
    // Get All Posts
    listPost: async (req, res, next) => {
        let sortObj = {
            category_id:1
        }
        let findObj={
            status: 1 
        }
        if(req.query.category_id){
            findObj.category_id =  req.query.category_id
        }
        if(req.query.title){
            findObj.title = { $regex: req.query.title }
        }
        await Post.find(findObj).sort(sortObj).populate(['category_id']).exec( (err, data) => {

            if (err || data.length == 0) {
                return res.send({
                    success: false,
                    message: "No Posts founded..!",
                    error: err ? err : "No active Posts data in db"
                })
            }

            let result = {
                data: data,
                success: true
            }
            res.send(result);
        })
    },

    
    //Delete Post
    deletePost: async (req, res, next) => {
        let id = req.params.id;
        let update = {
            status: 0
        }
        await Post.find({ "_id": id, "status": "1" },async (err, data) => {
            if (err || data.length == 0) {
                return res.send({
                    success: false,
                    message: "Post Not founded with this PostId"
                })
            }
            await Post.findByIdAndUpdate(id,
                {
                    $set: update
                }, { new: true },
                (err, data) => {
                    if (err || !data) {
                        return res.send({
                            success: false,
                            message: "Post Deletion failed..!"
                        })
                    }
                    return res.send({
                        success: true,
                        message: "Post Deleted successfully"
                    })
                });
        })
    }

}
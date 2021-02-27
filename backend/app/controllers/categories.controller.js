const Categories = require('../models/categories');
module.exports = {
    //Create new Categories
    createCategories: (req, res, next) => {
        const newCategories = new Categories({
            name: req.body.name,
            status: 1
        })
        Categories.create(newCategories, (err, data) => {
            if (err) {
                return res.send({
                    success: false,
                    error: err,
                    message: 'Failed to create new Categories'
                });
            } else {
                return res.send({
                    success: true,
                    id: data.id,
                    message: 'New Categories created successfully'
                });
            }
        })
    },

    // Get All Categoriess
    listCategories: async (req, res, next) => {
        let findObj={
            status: 1 
        }
        console.log(JSON.stringify(req.identity));
        if(req.query.name){
            findObj.name = { $regex: req.query.name }
        }
        await Categories.find(findObj).exec( (err, data) => {

            if (err || data.length == 0) {
                return res.send({
                    success: false,
                    message: "No Categoriess founded..!",
                    error: err ? err : "No active Categoriess data in db"
                })
            }

            let result = {
                data: data,
                success: true
            }
            res.send(result);
        })
    },

    //Delete Categories
    deleteCategories: async (req, res, next) => {
        let id = req.params.id;
        let update = {
            status: 0
        }
        await Categories.find({ "_id": id, "status": "1" },async (err, data) => {
            if (err || data.length == 0) {
                return res.send({
                    success: false,
                    message: "Categories Not founded with this CategoriesId"
                })
            }
            await Categories.findByIdAndUpdate(id,
                {
                    $set: update
                }, { new: true },
                (err, data) => {
                    if (err || !data) {
                        return res.send({
                            success: false,
                            message: "Categories Deletion failed..!"
                        })
                    }
                    return res.send({
                        success: true,
                        message: "Categories Deleted successfully"
                    })
                });
        })
    }

}
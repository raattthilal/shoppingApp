const Products = require('../models/products');

module.exports = {
    fileUpload : function (req, res) {
       if(req.files['images'])
       {
                async function update() {
                    try {
                        await Products.updateOne({ _id: req.identity.id },
                            {
                                $set: { "image": req.files['images'][0].path}
                            });
                        res.json({ 'message': 'Images uploaded successfully' });
                    } catch (e) { }
                } update();
            }
            
           
    // check for file
    if (req.files['images']) {
        console.log(req.files['images']);
        //store file in body
        req.body.images = req.files['images'][0].filename;
    }
    console.log(req.body.images);
    
    
}
};







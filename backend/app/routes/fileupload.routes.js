var crypto = require('crypto');
var multer = require('multer');
var mime=require('mime-types');

var storage = multer.diskStorage({
    destination: function (req, file, cb) { 
            cb(null, '../ui/src/assets/'); 
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err)
                return cb(err)
            cb(null, raw.toString('hex') + "." + mime.extension(file.mimetype))
        })
    }
});
var upload = multer({ storage: storage });
module.exports = (app,methods) => {
    console.log(methods,'methods')
    const fileupload = methods.loadController('fileupload'); 
    var flUpload = upload.fields([{ name: 'images', maxCount: 10 }, { name: 'documents', maxCount: 10 }, { name: 'video', maxCount: 1 }]);
    fileupload.methods.post('fileupload',fileupload.fileUpload,{auth:true },flUpload);
}
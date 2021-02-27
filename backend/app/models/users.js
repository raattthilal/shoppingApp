const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
//User Schema
const UserSchema = mongoose.Schema({
    username: {
        type : String,
        unique: true
    },
    phone: {
        type : Number,
        unique: true
    },
    password: String,
    status : Number,

    created_at:{
        type: Date,
        default:Date.now()
    }
}, params);


const Users = module.exports = mongoose.model('Users', UserSchema);


module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.getUserByUsername = function (username, callback) {
    const query = { username: username }
    Users.findOne(query, callback);
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
};

module.exports.getUserById = function (id, callback) {
    Users.findById(id, callback);
};

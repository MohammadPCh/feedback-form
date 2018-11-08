let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    fname: {type: String},
    lname: {type: String, required:true},
    username: {type: String, required:true, unique:true},
    email: {type: String, required:true, unique:true},
    password: {type: String, required:true},
    createDate: Date
});

UserSchema.methods.validPassword = function (pwd) {
    return (this.password === pwd)
};

module.exports = mongoose.model('User', UserSchema);
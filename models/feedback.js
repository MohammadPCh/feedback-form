const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let FeedbackSchema = new Schema({
    lname: {type:String,required:true},
    tel: {type:String},
    email: {type:String},
    file_url: {type : String},
    desc: {type:String}
});

// Export model.
module.exports = mongoose.model('FeedBack', FeedbackSchema);
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let FeedbackSchema = new Schema({
    lname: {type:String,required:true},
    tel: {type:String},
    email: {type:String},
    file_url: {type : String},
    desc: {type:String},
    date: Date
});

// Export model.
module.exports = mongoose.model('Feedback', FeedbackSchema);
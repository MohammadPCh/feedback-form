let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let FeedbackSchema = new Schema({
    lname: {
        type: String,
        required: true
    },
    tel: {
        type: String
    },
    email: {
        type: String
    },
    desc: {
        type: String
    },
    img: {
        type: String
    },
    date: Date
});

FeedbackSchema.virtual('img_url').get(function () {
    return '/feedbacks/images/' + this.img;
});

// Export model.
module.exports = mongoose.model('Feedback', FeedbackSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title : {type: String, required: [true, "Title is required."]},
    topic: {type: String, required: [true, "Topic is required."]},
    details: {type: String, required: [true, "Details are required."], minLength: [10, "The content should have at least 10 characters"]},
    date: {type:Date, required:[true, "You need to provide the event date."]},
    start : {type: String, required: [true, "Event start time is required."]},
    end: {type: String, required: [true, "Event end time is required."]},
    host: {type: Schema.Types.ObjectId, ref: 'User'},
    location: {type: String, required: [true, "Location is required."]},
    imageURL:{type: String, required: [true, "Please type proper url format."]}
}, 
{timestamps: true} // extra
);


eventSchema.path('imageURL').validate((val) => {
    urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    return urlRegex.test(val);
    }
    , 'Invalid URL.'
);

module.exports = mongoose.model('Event', eventSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RSVPSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    event: {type: Schema.Types.ObjectId, ref: 'Event'},
    status: {type: String, required: [true, 'Status is the mandatory field']},
},
{timestamps: true}
);

module.exports = mongoose.model('RSVP', RSVPSchema);



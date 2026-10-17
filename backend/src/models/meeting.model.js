const Schema = require('mongoose').Schema;
const meetingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    participants: {
        type: [String],
        default: []
    }
}, { timestamps: true });

const Meeting = mongoose.model('Meeting', meetingSchema);
module.exports = Meeting;
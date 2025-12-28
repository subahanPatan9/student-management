const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);

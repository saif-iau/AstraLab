// models/workplace.model.js
const mongoose = require('mongoose');

const workplaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    collaborators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    collections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection'
    }]
}, { timestamps: true });

const Workplace = mongoose.model('Workplace', workplaceSchema);
module.exports = Workplace;

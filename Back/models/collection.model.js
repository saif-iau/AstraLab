// models/collection.model.js
const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    workplace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workplace',
        required: true
    },
    requests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request'
    }],
    environments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Environment'
    }]
}, { timestamps: true });

const Collection = mongoose.model('Collection', collectionSchema);
module.exports = Collection;

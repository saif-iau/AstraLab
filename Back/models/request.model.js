const mongoose = require('mongoose');


const requestSchema = mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    pageUrl: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true,
        enum: ["GET", "POST", "PUT", "PATCH", "OPTIONS", "DELETE"]
    },
    headers: [{
        key: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        }
    }],
    queryParams: {
        type: Map,
        of: String // Stores query parameters as key-value pairs
    },
    body: {
        type: mongoose.Schema.Types.Mixed // Mixed allows any type (object, array, string, etc.)
    },
    responseData: {
        type: mongoose.Schema.Types.Mixed // Store the response from the API
    },
    statusCode: {
        type: Number, // Stores the response status code
        default: null
    },
    responseTime: {
        type: Number, // Store response time in milliseconds
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically sets the creation date
    },
    description: {
        type: String // Optional description for easier identification
    }
});

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;

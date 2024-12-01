const environmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    collection: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection',
        required: true
    },
    variables: [{
        key: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Environment = mongoose.model('Environment', environmentSchema);
module.exports = Environment;

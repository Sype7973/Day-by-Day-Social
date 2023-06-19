const {Schema, Types, model} = require('mongoose');
const dayjs = require('dayjs');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        // uses dayjs to format the date on query
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dayjs(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        // uses dayjs to format the date on query
        updatedAt: {
            type: Date,
            default: Date.now,
            get: (updatedAtVal) => dayjs(updatedAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        username: {
            type: String,
            required: true
        },
        // Array of nested documents created with the reactionSchema
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
);

// get total count of reactions on retrieval
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
}
);

// create the Thought model using the thoughtSchema
const Thought = model('Thought', thoughtSchema);

// export the Thought model
module.exports = Thought;



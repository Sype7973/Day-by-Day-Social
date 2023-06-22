const {Schema, Types} = require('mongoose');
const dayjs = require('dayjs');

const reactionSchema = new Schema(
    {
        // set custom id to avoid confusion with parent thought's _id field
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
            _id: false
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        // uses dayjs to format the date on query
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dayjs(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

module.exports = reactionSchema;
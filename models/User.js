const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // must match a valid email address (look into Mongoose's matching validation)
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        // Array of _id values referencing the Thought model
        thoughts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        // Array of _id values referencing the User model (self-reference)
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
}
);

// create the User model using the UserSchema
const User = mongoose.model('User', UserSchema);

// export the User model
module.exports = User;

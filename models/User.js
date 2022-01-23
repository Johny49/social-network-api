const { Schema, model } = require('mongoose');
const validateEmail = require('../utils/emailValidate');

//Schema to create User model
const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true, trim: true },
        email: {
            type: String, required: true, unique: true, 
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, `{VALUE} is not a valid email!`]
        },
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
        friends: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual property called 'friendCount' to return the number of friends in the user's friends array
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Initialize user model
const User = model('user', userSchema);

module.exports = User;
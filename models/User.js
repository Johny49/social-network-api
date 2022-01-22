const { Schema, model } = require('mongoose');

//Schema to create Thought model
const userSchema = new Schema (
    {
        username: [{ type: String, required: true, unique: true, trim: true }]
    },
    {

    }
);

module.exports = User;
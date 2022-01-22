const { Schema, model } = require('mongoose');

//Schema to create Thought model
const thoughtSchema = new Schema (
    {
        thoughtText: [{ type: String, required: true }]
    },
    {

    }
);

module.exports = Thought;
const { ObjectId } = require('bson');
const { Schema, model } = require('mongoose');

//Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
        createdAt: { 
            type: Date, 
            default: Date.now,
            get: createdAtVal => (createdAtVal.toLocaleString('en-US', { timeZone: 'UTC' }))
         },
        username: { type: String, required: true },
        reactions: [{
            reactionId: { type: ObjectId, default: new ObjectId },
            reactionBody: { type: String, required: true, maxlength: 280 },
            username: { type: Schema.Types.ObjectId, ref: 'user', required: true },
            createdAt: { 
                type: Date, 
                default: Date.now,
                get: createdAtVal => (createdAtVal.toLocaleString('en-US')),
            }
        }],
    },
    {
        toObject: { getters: true },
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual property called 'reactionCount' to return the number of reactions in the thought's reactions array
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

// Initialize thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
const { Thought, User } = require('../models');

module.exports = {
    // GET all thoughts
    getThoughts(req, res) {
        Thought.find({})
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // GET a single thought by _id
    getSingleThought(req, res) {
        Thought.findById({ _id: req.params.thoughtId })
            .select(-'__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with that ID.' })
                    : res.json(thought)
            )
    },
    // POST a new thought and push to the user's thoughts array
    createThought(req, res) {
        Thought.create(req.body)
        // push to user's [thoughts]
        userId = req.body.userId
            .then((thought) => {
                User.updateOne(
                    { _id: userId },
                    { $set: user.thoughts.push(thought._id) })
            })
            .then((user) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    // PUT to update a thought by _id
    updateThought(req, res) {
        Thought.updateOne(
            { _id: req.params.thoughtId },
            { $set: req.body })
        // push to user's [thoughts]
        let userId = req.body.userId
            .then((thought) => {
                User.updateOne(
                    { _id: userId },
                    { $push: req.body._id.thoughts })
            })
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    // DELETE a thought by _id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No user found with that ID.' })
                    : User.updateOne({
                        //  _id: req.body.userId,
                        // $pull: { _id: user.thoughts._id }
                        // TODO: Update this
                    })
                )
            .then(() => res.json({ message: `Deleted thought ${thought._id} and updated user ${thought.username}` }))
            .catch((err) => res.status(500).json(err));
    },
    // Reactions
    // POST a new reaction that is stored in a thought's reactions array
    addReaction(req, res) {
        // TODO: finish this
        // Thought.findOneAndUpdate(
            // { _id: req.params.thoughtId },
            // { $push: req.body })
        // .catch((err) => res.status(500).json(err));
    },
    // Delete a reaction by reactionId
    deleteReaction(req, res) {
        //TODO finish this
    }
};

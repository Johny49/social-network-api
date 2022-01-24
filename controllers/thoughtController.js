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
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: thought._id } },
                    { new: true });
            })
            // if user does not exist
            .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'Post created, but no user with that ID was found' })
              : res.json('New thought created.')
          )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // PUT to update a thought by _id
    updateThought(req, res) {
        Thought.updateOne(
            { _id: req.params.thoughtId },
            { $set: req.body })
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    // DELETE a thought by _id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        // pull from user's [thoughts]
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with that ID.' })
                    : User.findOneAndUpdate(
                        { username: thought.username },
                        { $pull: { thoughts: req.params.thoughtId } })
                )
            .then(() => res.json({ message: `Deleted thought ${req.params.thoughtId}` }))
            .catch((err) => res.status(500).json(err));
    },
    // Reactions
    // POST a new reaction that is stored in a thought's reactions array
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true })
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    // Delete a reaction by reactionId
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true })
        .then(() => res.json({ message: 'Deleted reaction' }))
        .catch((err) => res.status(500).json(err));
    }
};

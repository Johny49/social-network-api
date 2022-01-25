const { User, Thought } = require('../models');

module.exports = {
    // GET all users
    getUsers(req, res) {
        User.find({})
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // GET a single user by _id
    getSingleUser(req, res) {
        User.findById({ _id: req.params.userId })
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with that ID.' })
                    : res.json(user)
            )
    },
    // POST to create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    //PUT to update a user by _id
    updateUser(req, res) {
        User.updateOne(
            { _id: req.params.userId },
            { $set: req.body })
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    // DELETE a user by _id
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => {
                // if (!user) return res.status(404).json({ message: 'No user found with that ID.' })
                // delete references to user in friend lists
                User.updateMany({ _id: { $in: user.friends } },
                    { $pull: { friends: req.params.userId } })
                    .then(() => {
                        // delete corresponding thoughts
                        Thought.deleteMany({ username: user.username })
                    })
            })
            .then(() => res.json({ message: `Deleted user ${req.params.userId} and associated thoughts.` }))
            .catch((err) => res.status(500).json(err));
    },

    // Friends
    // POST to add a new friend to user's friend list
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } },
            { new: true })
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    // DELETE to remove a friend from user's friend list
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true })
            .then(() => res.json({ message: `Removed friend ${req.params.friendId}.` }))
            .catch((err) => res.status(500).json(err));
    },
};

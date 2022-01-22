const { User, Thought } = require('../models');

module.exports = {
// GET all users
getUsers(req, res) {
    User.find({})
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
},
// GET a single user by _id
getSingleUser(req,res) {
    User.findById({ _id: req.params.userId })
    .select('-__v')
    .then((user) => 
    !user 
    ? res.status(404).json({ message: 'No user found with that ID' })
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
    .then((user) =>
    !user
    ? res.status(404).json({ message: 'No user found with that ID' })
    : Thought.deleteMany({ _id: {  $in: user.thoughts } })
    )
    .then(() => res.json({ message: `Deleted user ${user.name} and associated thoughts.` }))
    .catch((err) => res.status(500).json(err));
},

// Friends
// POST to add a new friend to user's friend list
addFriend(req, res) {
    // TODO: finish this
    // User.create(req.body)
    // .then((user) => res.json(user))
    // .catch((err) => res.status(500).json(err));
},

// DELETE to remove a friend from user's friend list
removeFriend(req, res) {
    // TODO: finish this
    // User.findOneAndDelete({ _id: req.params.userId })

    // .then(() => res.json({ message: `Deleted user ${user.name} and associated thoughts.` }))
    // .catch((err) => res.status(500).json(err));
},
};
// objectId() method for converting user id to object id for querying database
const {ObjectId} = require('mongoose').Types;
const {User, Thought} = require('../models');

module.exports = {
// get all users
async getAllUsers(req, res) {
 try {
   const users = await User.find({});
   res.json(users);
 }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},


// get one user by id
async getUserById(req, res) {
 try {
    const user = await User.findOne({
      _id: req.params.id
    });
    if (!user) {
      res.status(404).json({
         message: 'No user found with this id!'
      });
      return;
    }
    res.json(user);
 }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},

// create user
async createUser(req, res) {
    try {
        const user = await User.create(req.body);
        console.log('You have created a user!')
        res.json(user)
    }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
},

// update user by id
async updateUser(req, res) {
 try {
    const user = await User.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true}
    );
    if (!user) {
        res.status(404).json({
            message: 'No user found with this id!'
        });
        return;
    }
    res.json(user);
    }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
},

// delete user and thoughts associated with user - currently deletes user and all thoughts, but not thoughts associated with user
async deleteUser(req, res) {
  try {

    const userData = await User.findOne({ _id: req.params.userId });
    console.log(userData.thoughts)

    const user = await User.findOneAndRemove({ _id: req.params.userId });

    if (!user) {
      return res.status(404).json({ message: 'No such user exists' });
    }

    await Thought.deleteMany({ _id: { $in: userData.thoughts } });

    await User.updateMany(
      { friends: { $in: req.params.userId } },
      { $pull: { friends: req.params.userId } }
    );

    res.json({ message: 'User and associated thoughts successfully deleted'})
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},
// add friend - currently does not add friend or push friend ID to friends array
async addFriend (req, res) {
 console.log('You are adding a friend!')
 console.log(req.body)

 try {
  const addaFriend = await User.findOneAndUpdate(
    { _id: req.params.id },
    { $addToSet: { friends: req.params.friendId } },
    { new: true }
  );
    res.json(addaFriend)
    } catch (err) {
        res.status(500).json(err)
 }
},

// remove friend
async removeFriend (req, res) {
        try {
            const removeaFriend = await User.findOneAndUpdate(
                {_id: req.params.friendId},
                {$pull: {friends: req.params.friendId}},
                {new: true}
            )
            res.json(removeaFriend)
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
};

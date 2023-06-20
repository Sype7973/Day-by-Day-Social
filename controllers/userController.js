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
        res.json(user);
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

// delete user and thoughts associated with user
async deleteUser(req, res) {
 try {
    const user = await User.findOneAndDelete({
        _id: req.params.id
    });
    if (!user) {
        res.status(404).json({
            message: 'No user found with this id!'
        });
        return;
    }
    await Thought.deleteMany({
        users: req.params.id
    });
    res.json(user);
    }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
},

// add friend
async addFriend (req, res) {
 console.log('You are adding a friend!')
 console.log(req.body)

 try {
    const addaFriend = await User.findOneAndUpdate(
        {_id: req.params.id},
        // pushes the friend ID; check validation of ID first before pushing
        {$addToSet: {friends: req.params.friendId}},
        {new: true}
    )
    res.json(addaFriend)
    } catch (err) {
        res.status(500).json(err)
 }
},

// remove friend
async removeFriend (req, res) {
        try {
            const removeaFriend = await User.findOneAndUpdate(
                {_id: req.params.id},
                {$pull: {friends: Req.params.friendId}},
                {new: true}
            )
            res.json(removeaFriend)
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
};

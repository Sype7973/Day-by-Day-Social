const {User} = require('../models');

module.exports = {
    // get all thoughts
    async getAllThoughts(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .sort({
                _id: -1
            })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            }
            );
    },

    // get one thought by id
    async getThoughtById(req, res) {
        User.findOne({
                _id: req.params.id
            })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                // If no user is found, send 404
                if (!dbUserData) {
                    res.status(404).json({
                        message: 'No user found with this id!'
                    });
                    return;
                }
                res.json(dbUserData);
            }
            )
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            }
            );
    },

    // create thought
    async createThought(req, res) {
        User.create(req.body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            }
            );
    },

    // update thought by id
    async updateThought(req, res) {
        User.findOneAndUpdate({
                _id: req.params.id
            }, {
                $set: req.body
            }, {
                runValidators: true,
                new: true
            }
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({
                        message: 'No user found with this id!'
                    });
                    return;
                }
                res.json(dbUserData);
            }
            )
            .catch(err => res.json(err));
    },

    // delete thought
    async deleteThought(req, res) {
        User.findOneAndDelete({
                _id: req.params.id
            }
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({
                        message: 'No user found with this id!'
                    });
                    return;
                }
                res.json(dbUserData);
            }
            )
            .catch(err => res.status(400).json(err));
    },

    // add reaction
    async addReaction(req, res) {
        User.findOneAndUpdate({
                _id: req.params.id
            }, {
                $addToSet: {
                    reactions: req.body
                }
            }, {
                runValidators: true,
                new: true
            }
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({
                        message: 'No user found with this id!'
                    });
                    return;
                }
                res.json(dbUserData);
            }
            )
            .catch(err => res.json(err));
    },
    
    // remove reaction
    async removeReaction(req, res) {
        User.findOneAndUpdate({
                _id: req.params.id
            }, {
                $pull: {
                    reactions: {
                        reactionId: req.params.reactionId
                    }
                }
            }, {
                runValidators: true,
                new: true
            }
            )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }
};



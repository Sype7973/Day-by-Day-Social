const {Thought, User } = require('../models');

module.exports = {
    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            res.json(thoughts);

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // get one thought by id
    async getThoughtById(req, res) {
    try {
        const thought = await Thought.findOne({
            _id: req.params.id
        });
        if (!thought) {
            res.status(404).json({
                message: 'No Thought found with this id!'
            });
            return;
        }
        res.json(thought);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    },

    // create thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            // find user by id, add to set for thought: 
            const user = await User.findOneAndUpdate({
                _id: req.body.userId
            }, {
                $addToSet: {
                    thoughts: thought._id
                }
            }, {
                new: true
            });
            // if no user found, return 404
            if (!user) {
                res.status(404).json({
                    message: 'No user found with this id!'
                });
                return;
            }
            res.json(thought);
            console.log(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // update thought by id
    async updateThought(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate({
            _id: req.params.id
        }, req.body, {
            new: true,
            runValidators: true
        });
        if (!thought) {
            res.status(404).json({
                message: 'No user found with this id!'
            });
            return;
        }
        res.json(thought);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    },

    // delete thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({
                _id: req.params.id
            });
            if (!thought) {
                res.status(404).json({
                    message: 'No user found with this id!'
                });
                return;
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // add reaction
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({
                _id: req.params.id
            }, {
                $addToSet: {
                    reactions: req.body
                }
            }, {
                runValidators: true,
                new: true
            });
            if (!thought) {
                res.status(404).json({
                    message: 'No user found with this id!'
                });
                return;
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    
    // remove reaction
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({
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
            });
            if (!thought) {
                res.status(404).json({
                    message: 'No user found with this id!'
                });
                return;
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};



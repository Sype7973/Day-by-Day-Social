const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
 } = require('../../controllers/thoughtController');

//  to get to this route, use: localhost:8080/api/thoughts
router.route('/').get(getAllThoughts).post(createThought);
//  to get to this route, use: localhost:8080/api/thoughts/:id
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);
//  to get to this route, use: localhost:8080/api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);
//  to get to this route, use: localhost:8080/api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;

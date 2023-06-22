const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// to get to this route, use: localhost:8080/api/users
router.route('/').get(getAllUsers).post(createUser);
// to get to this route, use: localhost:8080/api/users/:id
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);
// use a user id, add a friend using the friend id
// to get to this route, use: localhost:8080/api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
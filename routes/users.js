const express = require('express')
const {createUser, getAllUsers, getOneUser, updateUser, deleteUser} = require('../controllers/users')
//const {validateCreateUser} = require('../middlewares/validate')
const router = express.Router({mergeParams:true});


router.route('/:id').get(getOneUser).patch(updateUser).delete(deleteUser)
router.route('/').get(getAllUsers).post(createUser)

module.exports = router
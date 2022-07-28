const express = require('express')
const {createPost, getAllPosts, getOnePost, updatePost, deletePost} = require('../controllers/posts')
//const {validateCreateUser} = require('../middlewares/validate')
const router = express.Router({mergeParams:true});


router.route('/:id').get(getOnePost).patch(updatePost).delete(deletePost)
router.route('/').get(getAllPosts).post(createPost)

module.exports = router
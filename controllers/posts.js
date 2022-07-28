const router = require("express").Router();
const bcrypt = require("bcrypt");
const Post = require("../models/Post");
const asyncHandler = require('../middlewares/async')

//Creating User
const createPost = asyncHandler(async (req, res, next) => {
    const post = new Post(req.body)
    const newPost = await post.save()
    res.status(201).json({
        success:true, 
        data: newPost
    })
})

const getAllPosts = asyncHandler(async (req, res, next) => {
    const post = await Post.find({})
        res.status(200).json({
            success:true,
            data: post,
            count: post.length
        })

})

const getOnePost = asyncHandler(async (req, res, next) =>  {
        if(!req.params.id) {
            throw new BadRequest('no id provided')
        }
        await Post.findOne({_id:req.params.id})
        const post = await Post.findById(req.params.id)
        if (!post){
            throw new NotFound('no user with id found')
        }
        res.status(200).json({
            success: true, 
            data:post
        })
})

const updatePost = asyncHandler(async (req, res, next) => {
        if(!req.params.id) {
            throw new BadRequest('id must be provided!')
        }
       const existingPost = await Post.findById(req.params.id)
       if(!existingPost) {
        throw new NotFound('no user with id exist')
       }
       const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true
       })
       res.status(200).json({
           success:true,
           data: post
       })

    })

const deletePost = asyncHandler(async (req, res, next) => {
    await Post.findByIdAndDelete(req.params.id)
       res.status(200).json({
           success:true,
           data: {}
       })
})

module.exports = {
    createPost,
    getAllPosts,
    getOnePost,
    updatePost,
    deletePost
}

const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const asyncHandler = require('../middlewares/async')

//Creating User
const createUser = asyncHandler(async (req, res, next) => {
    const user = new User(req.body)
    const newUser = await user.save()
    res.status(201).json({
        success:true, 
        data: newUser
    })
})

const getAllUsers = asyncHandler(async (req, res, next) => {
    const user = await User.find({})
        res.status(200).json({
            success:true,
            data: user,
            count: user.length
        })

})

const getOneUser = asyncHandler(async (req, res, next) =>  {
        if(!req.params.id) {
            throw new BadRequest('no id provided')
        }
        await User.findOne({_id:req.params.id})
        const user = await User.findById(req.params.id)
        if (!user){
            throw new NotFound('no user with id found')
        }
        res.status(200).json({
            success: true, 
            data: user
        })
})

const updateUser = asyncHandler(async (req, res, next) => {
        if(!req.params.id) {
            throw new BadRequest('id must be provided!')
        }
       const existingUser = await User.findById(req.params.id)
       if(!existingUser) {
        throw new NotFound('no user with id exist')
       }
       const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
       })
       res.status(200).json({
           success:true,
           data: user
       })

    })

const deleteUser = asyncHandler(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id)
       res.status(200).json({
           success:true,
           data: {}
       })
})

module.exports = {
    createUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser
}

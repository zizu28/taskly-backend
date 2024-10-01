import { Usermodel } from "../models/Usermodel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const registerUser = async (req, res) => {
    const {username, email, password, avatar} = req.body

    if(!username || !email || !password){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const userWithEmailExists = await Usermodel.findOne({email})
    const userWithUsernameExists = await Usermodel.findOne({username})
    if(userWithEmailExists || userWithUsernameExists){
        res.status(422)
        throw new Error("User exists already in database")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await Usermodel.create({
        username, 
        email, 
        password: hashedPassword
    })
    if(user){
        res
        .status(201)
        .json({_id: user._id, username: user.username, 
            email: user.email,
            avatar: user.avatar, 
            token: generateJWTToken(user._id)})
    }
    else{
        res.status(500)
        throw new Error("Server error")
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await Usermodel.findOne({email})
        if(!user){
            res.status(404)
            throw new Error("User not found.")
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            res.status(401)
            throw new Error("Invalid password.")
        }
        if(user && validPassword){
            res
            .status(200)
            .json({_id: user._id, 
                username: user.username, 
                email: user.email,
                avatar: user.avatar, 
                token: generateJWTToken(user._id)})
        }
    } catch (error) {
        res.status(400)
        throw new Error(`Error: ${error.message}`)
    }
}


const getCurrentUser = async (req, res) => {
    try {
        const user = await Usermodel.findById(req.user._id)
        res
        .status(200)
        .json({_id: user._id, 
            username: user.username, 
            email: user.email,
            avatar: user.avatar, 
            token: generateJWTToken(user._id)})
    } catch (error) {
        res.status(400)
        throw new Error(`Error: ${error.message}`)
    }
}

const deleteUser = async (req, res) => {
    try {
        await Usermodel.findByIdAndDelete(req.user._id)
        res
        .status(200)
        .json({message: `User with id ${req.user._id} deleted`})
    } catch (error) {
        res.status(400)
        throw new Error(`Error: ${error.message}`)
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await Usermodel.findById(req.user._id)
        if(!user){
            res.status(404)
            throw new Error("User not found.")
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        user.password = hashedPassword
        user.username = req.body.username
        user.email = req.body.email
        user.avatar = req.body.avatar

        await user.save()
        res
        .status(200)
        .json({_id: user._id, 
            username: user.username, 
            email: user.email,
            avatar: user.avatar, 
            token: generateJWTToken(user._id)})
    } catch (error) {
        res.status(400)
        throw new Error(`Error: ${error.message}`)
    }
}

const generateJWTToken = id => jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '5d'})

export const UserController = {registerUser, loginUser, updateUser, getCurrentUser, deleteUser}


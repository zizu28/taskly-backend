import express from 'express'
import auth from '../middlewares/authMiddleware.js'

const cloudinaryRouter = express.Router()

cloudinaryRouter.post('/upload', auth.protect, auth.AddImage)

export default cloudinaryRouter

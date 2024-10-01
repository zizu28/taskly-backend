import express from 'express'
import { UserController } from '../controllers/UserController.js'
import auth from '../middlewares/authMiddleware.js'

const userRouter = express.Router()

userRouter.get('/current', auth.protect, UserController.getCurrentUser)
userRouter.post('/register', UserController.registerUser)
userRouter.post('/login', UserController.loginUser)
userRouter.patch('/update/:id', auth.protect, UserController.updateUser)
userRouter.delete('/delete/:id', auth.protect, UserController.deleteUser)

export default userRouter
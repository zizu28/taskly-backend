import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import userRouter from './routes/UserRoutes.js'
import taskRouter from './routes/TaskRoutes.js'
import cloudinaryRouter from './routes/CloudinaryRoutes.js'
import { errorHandler } from './middlewares/errorMiddleware.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import fileupload from 'express-fileupload'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8000
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(fileupload())
app.use('/api/users', userRouter)
app.use('/api/tasks', taskRouter)
app.use('/api/image', cloudinaryRouter)
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`Listening to server on port ${PORT}`)
    connectDB()
})
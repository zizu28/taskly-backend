import { TaskController } from '../controllers/TaskController.js';
import express from 'express'
import auth from '../middlewares/authMiddleware.js'

const taskRouter = express.Router()

taskRouter.get('/', auth.protect, TaskController.getTasks)
taskRouter.get('/:id', auth.protect, TaskController.getTaskById)
taskRouter.post('/create', auth.protect, TaskController.createTask)
taskRouter.patch('/update/:id', auth.protect, TaskController.updateTask)
taskRouter.delete('/delete/:id', auth.protect, TaskController.deleteTask)

export default taskRouter
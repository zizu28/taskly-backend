import { Taskmodel } from "../models/Taskmodel.js";

const getTasks = async (req, res) => {
    try {
        const user = req.user
        const tasks = await Taskmodel.find({user: user._id})
        res.status(200).json({tasks})
    } catch (error) {
        res.status(500)
        throw new Error("Server error. Unale to recover tasks")
    }
}

const getTaskById = async (req, res) => {
    console.log(req.params.id);
    try {
      const task = await Taskmodel.findById(req.params.id)
      if (!task) {
        res.status(404).json({ error: `Task with ID ${req.params.id} not found` })
      } else {
        res.status(200).json(task)
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
}

const createTask = async (req, res) => {
    try {
      const { name, description, priority, status, due } = req.body;
      if (!name || !description || !priority || !status) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }
  
      const user = req.user._id;
      const task = await Taskmodel.create({ user, name, description, priority, due, status });
      if (task) {
        res.status(201).json(task);
      } else {
        res.status(400).json({ error: 'Unable to create new task' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Taskmodel.findById(id);
      if (!task) {
        res.status(404).json({ error: `No task of id ${id} found` });
        return;
      }
  
      const updatedTask = await Taskmodel.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const deleteTask = async (req, res) => {
    const task = await Taskmodel.findById(req.params.id)
    if(!task){
        res.status(404)
        throw new Error(`No task of id ${req.params.id} found`)
    }
    await Taskmodel.findByIdAndDelete(req.params.id)
    res.status(200).json({message: `Task with id ${req.params.id} deleted`})
}

export const TaskController = {getTasks, getTaskById, createTask, updateTask, deleteTask}
import { globalAgent } from 'http';
import Task from '../models/taskModel.js';

// @desc get tasks
// @route GET /api/tasks
// @access Private
export const getTasks = async (req, res) => { 
  const tasks = await Task.find();

  try {
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

// @desc create task
// @route POST /api/tasks
// @access Private
export const createTask = async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  try {
    const task = await Task.create({
      text: req.body.text,
    });

    res.status(200).json(task);

  } catch (error) {
    res.status(400).json({ error: error });
  }
};

// @desc edit task by id
// @route PUT /api/tasks
// @access Private
export const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error });   
  }
};

// @desc delete task by id
// @route DELETE /api/tasks
// @access Private
export const deleteTask = async (req, res) => {
  try {
    await Task.deleteOne({ id: req.params.id });

    res.status(200).json({'message': `Deleted task ${req.params.id}`});
    
  } catch (error) {
    res.status(400).json({ error: error });   
  }
};
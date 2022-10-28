import { globalAgent } from 'http';
import Task from '../models/taskModel.js';
import User from '../models/userModel.js';

// @desc get tasks
// @route GET /api/tasks
// @access Private
export const getTasks = async (req, res) => { 
  const tasks = await Task.find({ user: req.user.id });

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
      user: req.user.id,
      date: req.body.date,
      category: req.body.category,
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

  // check for task
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).send('Task not found');
  }

  if (!req.user) {
    return res.status(401).send('User not found');
  }

  // check if task matches logged in user
  if (task.user.toString() !== req.user.id) {
    return res.status(401).send('User not authorized');
  }

  // DO THE ACTUAL THING
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
  // check for task
  const task = await Task.findById(req.params.id);

  if (!task) {
    console.log("Task not found");
    return res.status(404).send('Task not found');
  }

  // check for user
  if (!req.user) {
    console.log("User not found");
    return res.status(401).send('User not found');
  }

  // check if task matches logged in user
  if (task.user.toString() !== req.user.id) {

    console.log("User not authorized");

    return res.status(401).send('User not authorized');
  }

  // DO THE ACTUAL THING
  try {
    await task.remove();

    res.status(200).json({'message': `Deleted task ${req.params.id}`, 'id':`${req.params.id}`});

  } catch (error) {
    res.status(400).json({ error: error });   
  }
};
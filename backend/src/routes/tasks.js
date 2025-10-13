const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');

// Get all tasks for user
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ dueDate: 1 });
    res.json(tasks);
  } catch(err){ res.status(500).json({ message: 'Server error' }); }
});

// Create
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, startDate, dueDate } = req.body;
    const task = await Task.create({ user: req.user.id, title, description, startDate, dueDate });
    res.json(task);
  } catch(err){ console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// Update
router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if(!task) return res.status(404).json({ message: 'Not found' });
    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch(err){ console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if(!task) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch(err){ console.error(err); res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;

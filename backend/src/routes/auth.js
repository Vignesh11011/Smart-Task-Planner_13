const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({ message: 'Missing fields' });
    const exists = await User.findOne({ email });
    if(exists) return res.status(400).json({ message: 'User exists' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });
    const token = jwt.sign({ id: user._id, email: user.email },'devsecret', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, email: user.email } });
  } catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({ message: 'Missing fields' });
    const user = await User.findOne({ email:email }).select('+password');
    if(!user) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password,user.password);
    if(!ok) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, email: user.email },'devsecret', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, email: user.email } });
  } catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

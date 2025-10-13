require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const planRoutes = require('./routes/plan');

const app = express();
app.use(cors());
app.use(express.json());

// mount routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/plan', planRoutes);

const PORT =4000;

async function start(){
  try{
    if(!process.env.MONGO_URI) {
      console.warn('Warning: MONGO_URI not set. Please fill backend/.env with your Mongo connection string.');
    } else {
      await mongoose.connect(process.env.MONGO_URI, { });
      console.log('Connected to MongoDB');
    }
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch(err){
    console.error(err);
    process.exit(1);
  }
}

start();

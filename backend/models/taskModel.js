import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  }
}, 
{
  timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
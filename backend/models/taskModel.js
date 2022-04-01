import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  }
}, 
  {
    timestamps: true,
  }
)

const Task = mongoose.model('Task', taskSchema);

export default Task;
// @desc get tasks
// @route GET /api/tasks
// @access Private
export const getTasks = async (req, res) => { 
  try {
    res.status(200).json({'message': 'Get tasks'});
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

// @desc create task
// @route POST /api/tasks
// @access Private
export const createTask = async (req, res) => {
  try {
    res.status(200).json({'message': 'Create tasks'});
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

// @desc edit task by id
// @route PUT /api/tasks
// @access Private
export const updateTask = async (req, res) => {
  try {
    res.status(200).json({'message': `Update task ${req.params.id}`});
  } catch (error) {
    res.status(400).json({ error: error });   
  }
};

// @desc delete task by id
// @route DELETE /api/tasks
// @access Private
export const deleteTask = async (req, res) => {
  try {
    res.status(200).json({'message': `Delete task ${req.params.id}`});
  } catch (error) {
    res.status(400).json({ error: error });   
  }
};
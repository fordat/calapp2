import axios from 'axios'

const API_URL = '/api/tasks/'

const createTask = async (text, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL, text, config);

  console.log('createTask! ', response);

  if (response.data) {
    console.log("Ua did it!");
  }

  return response.data;
}

const getTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL, config);

  console.log(' get tasks!   ', response);

  return response.data;
}

const taskService = {
  createTask,
  getTasks,
}

export default taskService
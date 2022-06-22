import axios from 'axios'

const API_URL = '/api/tasks/'

const create = async (text, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL, text, config);

  console.log('create! ', response);

  if (response.data) {
    console.log("Ua did it!");
  }

  return response.data;
}

const taskService = {
  create,
}

export default taskService
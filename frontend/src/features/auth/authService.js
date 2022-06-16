import axios from 'axios'

const API_URL = '/api/users/'

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  console.log('ay ay ay', response);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
}

const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  console.log('ay ay ay', response);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
}

const logout = () => {
  console.log("are we in here");

  localStorage.removeItem("user");
}

const authService = {
  register,
  logout,
  login,
}

export default authService
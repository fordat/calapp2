import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import taskService from './taskService'

const initialState = {
  tasks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Create a task for the  user!
export const create = createAsyncThunk('tasks/create', 
  async (text, thunkAPI) => {

    try {
      console.log(thunkAPI.getState().auth.user);

      const token = thunkAPI.getState().auth.user.token;

      return await taskService.create(text, token);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  });

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(create.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log("action payload in create", action.payload)
        state.tasks.push(action.payload);
      })
      .addCase(create.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log("rejected payload", action.payload)
        state.message = action.payload;
      })
  }
});

export const { reset } = taskSlice.actions

export default taskSlice.reducer
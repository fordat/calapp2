import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks, reset } from '../features/tasks/taskSlice';

import Form from '../components/Form';


function Dashboard() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { tasks, isLoading, isError, message } = useSelector((state) => state.tasks);

  const listTasks = tasks.map((d) => <li key={d.text}>{d.text}</li>)

  useEffect(() => {
    if(!user) {
      navigate('/login')
    }

    dispatch(getTasks());

    return () => {
      dispatch(reset);
    }
  }, [user, navigate, dispatch]);

  // const onChange = (e) => {
  //   setTaskData(e.target.value);
  // }

  // const onSubmit = e => {
  //   e.preventDefault();

  //   if (!text) {
  //     alert("Please enter some text");
  //   }

  //   dispatch(create({text}));
  // }

  console.log(tasks);

  return (
    <div className="dashboard-wrapper">
      {listTasks}
      <div>Dashboard!!! Hello {user && user.name}</div>
      <Form />
    </div>
  )
}

export default Dashboard
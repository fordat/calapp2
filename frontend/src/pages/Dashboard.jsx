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

  const listTasks = tasks.map((d) => <li key={d.text}>{d.text + " " + d.date} </li>)

  useEffect(() => {
    if(!user) {
      navigate('/login')
    }

    dispatch(getTasks());

    return () => {
      dispatch(reset);
    }
  }, [user, navigate, dispatch]);

  return (
    <div className="dashboard-wrapper">
      <ul className="dashboard-list">
       {listTasks}
      </ul>
      <div>Dashboard!!! Hello {user && user.name}</div>
      <Form />
    </div>
  )
}

export default Dashboard
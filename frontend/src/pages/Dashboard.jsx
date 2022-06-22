import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { create } from '../features/tasks/taskSlice'

import Form from '../components/Form';


function Dashboard() {
  // const [text, setText] = useState('');

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if(!user) {
      navigate('/login')
    }
  }, [user, navigate]);

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

  return (
    <div className="dashboard-wrapper">
      <div>Dashboard!!! Hello {user && user.name}</div>
      <Form />
    </div>
  )
}

export default Dashboard
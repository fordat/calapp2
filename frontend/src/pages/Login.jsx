import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    if (isSuccess || user) {
      console.log('troublemakers', isSuccess, user)
      navigate('/');
    }

    dispatch(reset());

  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return <>
    <section>
      <h1 className="heading-login">
        <img 
          src={require('../img/login-transparent.png')} 
          alt="login"></img>
        <div className="heading-login-text">Login</div>
      </h1>
    </section>

    <section className="form-login">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            name="email" 
            value={email} 
            placeholder="Enter your email"
            onChange={onChange}/>
        </div>
        <div className="form-group">
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            name="password" 
            value={password} 
            placeholder="Enter your password"
            onChange={onChange}/>
        </div>        
        <div className="form-group">
          <button type='submit' className='btn btn-block'>
            Submit
          </button>
        </div>
      </form>
    </section>
  </>
  
}

export default Login
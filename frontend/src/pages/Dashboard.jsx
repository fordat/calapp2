import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Dashboard() {
  const [taskData, setTaskData] = useState({
    text: '',
  });

  const { text } = taskData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if(!user) {
      navigate('/login')
    }
  }, [user, navigate]);

  const onChange = (e) => {
    setTaskData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert("Please enter some text");
    }
  }

  return (
    <div className="dashboard-wrapper">
      <div>Dashboard!!! Hello {user && user.name}</div>
      <div className="dashboard-form">
        <section>
          <h4>Prepare a task</h4>
        </section>
        <section>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input 
                type="text"
                className="form-control"
                id="text"
                name="text"
                value={text}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <button type='submit' className='btn btn-block'>
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}

export default Dashboard
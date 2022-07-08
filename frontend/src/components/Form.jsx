import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTask } from '../features/tasks/taskSlice';


function Dashboard() {
  const [taskValues, setTaskValues] = useState({
    text: '',
    date: '',
  });

  const { text, date } = taskValues;


  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();

    if (!text) {
      alert("Please enter some text");
    }

    dispatch(createTask({text, date}));

    setTaskValues({ text: '', date: '' });
  }

  return (
    <div className="dashboard-form">
      <section>
        <h4>Prepare a task</h4>
      </section>
      <section>
        <form onSubmit={onSubmit}>
          <div>Text</div>
          <div className="form-group">
            <input 
              type="text"
              className="form-control"
              id="text"
              name="text"
              value={text}
              onChange={(e) => setTaskValues({...taskValues, [e.target.name]: e.target.value})}
            />
          </div>
          <div>Date</div>
          <div className="form-group">
            <input 
              type="text"
              className="form-control"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setTaskValues({...taskValues, [e.target.name]: e.target.value})}
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
  )
}

export default Dashboard
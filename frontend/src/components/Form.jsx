import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { create } from '../features/tasks/taskSlice'


function Dashboard() {
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();

    if (!text) {
      alert("Please enter some text");
    }

    dispatch(create({text}));
  }

  return (
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
              onChange={(e) => setText(e.target.value)}
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
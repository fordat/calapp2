import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTask } from '../features/tasks/taskSlice';

function Dashboard() {
  const [taskValues, setTaskValues] = useState({
    text: '',
    date: '',
    category: '',
  });

  const { text, date, category } = taskValues;


  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();

    if (!text) {
      alert("Please enter some text");
    }

    dispatch(createTask({text, date, category}));

    setTaskValues({ text: '', date: '', category: '', });
  }

  return (
    <div className="dashboard-form">
      <section className="dashboard-form-title">
        <h4>Prepare a task</h4>
      </section>
      <section>
        <form onSubmit={onSubmit}>
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
          <div>Category</div>
          <div className="radio-group">
            <label htmlFor="candle">
              <input 
                type="radio" 
                name="category" 
                id="candle" 
                value="candle" 
                checked={category == 'candle'}
                onChange={(e) => setTaskValues({...taskValues, [e.target.name]: e.target.value})}/>
              <img src={require('../img/candle-transparent.png')}></img>
            </label>
            <label htmlFor="books">
              <input 
                type="radio" 
                name="category" 
                id="books" 
                value="books" 
                checked={category == 'books'}
                onChange={(e) => setTaskValues({...taskValues, [e.target.name]: e.target.value})}/>
              <img src={require('../img/books-transparent.png')}></img>
            </label>
            <label htmlFor="vacation">
              <input 
                type="radio" 
                name="category" 
                id="vacation" 
                value="vacation" 
                checked={category == 'vacation'}
                onChange={(e) => setTaskValues({...taskValues, [e.target.name]: e.target.value})}/>
              <img src={require('../img/vacation.png')}></img>
            </label>
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
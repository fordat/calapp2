import { PromiseProvider } from 'mongoose';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTask } from '../features/tasks/taskSlice';

function Form(props) {
  // const [taskValues, setTaskValues] = useState({
  //   text: '',
  //   date: '',
  //   category: '',
  // });

  // const { text, date, category } = taskValues;

  const {text, date, category} = props.taskValues;

  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();

    if (!text) {
      alert("Please enter some text");
    }

    dispatch(createTask({text, date, category}));

    props.setTaskValues({ text: '', date: '', category: '', });

    props.setOpenModal(false);
  }

  const onClickX = (e) => {
    e.preventDefault();
    if (e.currentTarget === e.target) {
      props.setOpenModal(false);
    }
  }

  return (
    <div className="dashboard-form-container" type="button">
      <div className="dashboard-form">
        <div className="dashboard-form-header">
          <div className="dashboard-form-header-x" type="button" onClick={onClickX}>X</div>
          <section className="dashboard-form-title">
            <h4>Prepare a task</h4>
          </section>
        </div>
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
                onChange={(e) => props.setTaskValues({...props.taskValues, [e.target.name]: e.target.value})}
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
                onChange={(e) => props.setTaskValues({...props.taskValues, [e.target.name]: e.target.value})}
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
                  onChange={(e) => props.setTaskValues({...props.taskValues, [e.target.name]: e.target.value})}/>
                <img src={require('../img/candle-transparent.png')}></img>
              </label>
              <label htmlFor="books">
                <input
                  type="radio"
                  name="category"
                  id="books"
                  value="books"
                  checked={category == 'books'}
                  onChange={(e) => props.setTaskValues({...props.taskValues, [e.target.name]: e.target.value})}/>
                <img src={require('../img/books-transparent.png')}></img>
              </label>
              <label htmlFor="vacation">
                <input
                  type="radio"
                  name="category"
                  id="vacation"
                  value="vacation"
                  checked={category == 'vacation'}
                  onChange={(e) => props.setTaskValues({...props.taskValues, [e.target.name]: e.target.value})}/>
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
    </div>
  )
}

export default Form
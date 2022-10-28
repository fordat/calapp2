import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../features/tasks/taskSlice';

function EditForm(props) {

  // const {text, date, category} = props.taskValues;

  const dispatch = useDispatch();

  const onClickDelete = (e) => {
    e.preventDefault();

    dispatch(deleteTask(props.task.id));

    props.setOpenEditModal(false);
  }

  console.log(props.task);

  const onClickX = (e) => {
    e.preventDefault();
    if (e.currentTarget === e.target) {
      props.setOpenEditModal(false);
    }
  }

  return (
    <div className="dashboard-form-container" type="button">
      <div className="dashboard-form">
        <div className="dashboard-form-header">
          <div className="dashboard-form-header-x" type="button" onClick={onClickX}>X</div>
          <section className="dashboard-form-title">
            <h4>Delete a task?</h4>
            <div>{props.task.title}</div>
          </section>
        </div>
        <div className="form-group">
          <button onClick={onClickDelete} className='btn btn-block'>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditForm
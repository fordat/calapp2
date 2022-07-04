import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks, reset } from '../features/tasks/taskSlice';
import moment from 'moment';

import Form from '../components/Form';


function Dashboard() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { tasks, isLoading, isError, message } = useSelector((state) => state.tasks);

  const listTasks = tasks.map((d) => <li key={d.text}>{d.text + " " + d.date} </li>);

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();


  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // const createCalendar = (year, month) => {
  //   let firstDay = (new Date(year, month)).getDay();

  //   let date = 1;

  //   let daWholeThang = {};

  //   for (let i = 0; i < 6; i++) {
  //     let row = <tr>{rowDays}</tr>;

  //     for (let j = 0; j < 7; j++) {
  //       if (i === 0 && j < firstDay) {

  //       }
  //     }
  //   }
  // }

  let blanks = [];

  console.log("day", today);

  // const firstDayOfMonth = () => {
  //   let dateObject = this.state.dateObject;
  //   let firstDay = moment(dateObject)
  //                .startOf("month")
  //                .format("d"); 
  //  return firstDay;
  // };

  // for (let i = 0; i < this.)

  const daysInMonth = (iYear, iMonth) => 32 - new Date(iYear, iMonth, 32).getDate();
  
  const calendar = <tbody id="calendar-body"></tbody>



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
      <div className="calendar-wrapper">
        <div>Dashboard!!! Hello {user && user.name}</div>
        <div>
          <h3 className="calendar-header">{months[currentMonth] + " " + currentYear}</h3>
          <table className="calendar">
            <thead>
              <tr>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
              </tr>
            </thead>
            {calendar}
          </table>
        </div>
      </div>
      <Form />
    </div>
  )
}

export default Dashboard
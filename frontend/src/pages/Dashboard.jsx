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

  const listTasks = tasks.map((d) => <li key={d.text}>{d.text + " " + d.date} </li>);

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();


  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const calculateDaysInMonth = (iYear, iMonth) => 32 - new Date(iYear, iMonth, 32).getDate();

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

  let firstDay = (new Date(currentYear, currentMonth)).getDay();

  let blanks = [];

  console.log("day", firstDay);

  for (let i = 0; i < firstDay; i++) {
    blanks.push(
      <td className="calendar-day empty">{""}</td>
    );
  }

  let daysInMonth = [];

  for (let d = 1; d <= calculateDaysInMonth(currentYear, currentMonth); d++) {
    daysInMonth.push(
      <td key={d} className="calendar-day">
        {d}
      </td>
    );
  }

  var totalDays = [...blanks, ...daysInMonth];

  let rows = [];
  let cells = [];

  totalDays.forEach((row, i) => {
    if (i % 7 !== 0) {
      cells.push(row);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(row);
    }
    if (i === totalDays.length - 1) {
      rows.push(cells);
    }
  });

  let newdays = rows.map((d, i) => {
    return <tr>{d}</tr>
  })

  // const firstDayOfMonth = () => {
  //   let dateObject = this.state.dateObject;
  //   let firstDay = moment(dateObject)
  //                .startOf("month")
  //                .format("d"); 
  //  return firstDay;
  // };

  // for (let i = 0; i < this.)

  
  const calendar = <tbody id="calendar-body">{newdays}</tbody>



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
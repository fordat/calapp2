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

  useEffect(() => {
    if(!user) {
      navigate('/login')
    }

    dispatch(getTasks());

    return () => {
      dispatch(reset);
    }
  }, [user, navigate, dispatch]);

  const tasks2 = tasks.map((d) => ({title: d.text,
                                    day: new Date(d.date).getDate(),
                                    month: new Date(d.date).getMonth(),
                                    year: new Date(d.date).getFullYear()}));

  console.log(tasks2);

  const listTasks = tasks.map((d) => <li key={d.text}>{d.text + " " + d.date} </li>);

  const today = new Date();
  const trueMonth = today.getMonth();
  const trueYear = today.getFullYear();
  const currentDate = today.getDate();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());


  const months = ["January", 
                  "February", 
                  "March", 
                  "April", 
                  "May", 
                  "June", 
                  "July", 
                  "August", 
                  "September", 
                  "October", 
                  "November", 
                  "December"];

  const calculateDaysInMonth = (year, month) => 32 - new Date(year, month, 32).getDate();

  const generateCalendar = (currentYear, currentMonth) => {
    let firstDay = (new Date(currentYear, currentMonth)).getDay();

    let blanks = [];
  
    for (let i = 0; i < firstDay; i++) {
      blanks.push(
        <td className="calendar-day empty">{""}</td>
      );
    }
  
    let daysInMonth = [];
  
    for (let d = 1; d <= calculateDaysInMonth(currentYear, currentMonth); d++) { 
      let result = tasks2.find(task => task.day === d && task.month === currentMonth && task.year === currentYear)
      
      let eventClass = result ? "event-class" : "";
      let eventName = result ? `${result.title}` : "";

      let dayClass = (d === currentDate && trueYear === currentYear && trueMonth === currentMonth) ? "today" : "";
      daysInMonth.push(
        <td key={d} className={`calendar-day ${dayClass} ${eventClass}`}>
          <div className="calendar-date">{d}</div>
          <div>{eventName}</div>
        </td>
      );
    }
  
    var totalDays = [...blanks, ...daysInMonth];
  
    let rows = [];
    let cells = [];
  
    totalDays.forEach((day, i) => {
      if (i % 7 !== 0) {
        cells.push(day);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(day);
      }
      if (i === totalDays.length - 1) {
        rows.push(cells);
      }
    });
  
    let newdays = rows.map((d, i) => {
      return <tr>{d}</tr>
    });

    return <tbody id="calendar-body">{newdays}</tbody>;
  }
  
  const onClickPrev = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear => currentYear - 1);
    } else {
      setCurrentMonth(currentMonth => currentMonth - 1);
    }
  }

  const onClickNext = () => {
    if (currentMonth !== 0 && currentMonth % 11 === 0) {
      setCurrentMonth(0)
      setCurrentYear(currentYear => currentYear + 1);
    } else {
      setCurrentMonth(currentMonth => currentMonth + 1);
    }
  }

  return (
    <div className="dashboard-wrapper">

      <div className="calendar-wrapper">
        <div>Dashboard!!! Hello {user && user.name}</div>
        <div className="calendar-body">
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
            {generateCalendar(currentYear, currentMonth)}
          </table>
        </div>
        <div className="calendar-control">
          <div className="btn" onClick={onClickPrev}> Prev! </div>
          <div className="btn" onClick={onClickNext}> Next! </div>
        </div>
        <ul className="dashboard-list">
          {listTasks}
        </ul>
      </div>
      <Form />
    </div>
  )
}

export default Dashboard
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
        <div className="calendar-control">
          <form>
            <div>Jump to:</div>
            <select name="month" id="month" value={currentMonth} onChange={e => setCurrentMonth(parseInt(e.target.value))}>
              <option value={0}>January</option>
              <option value={1}>February</option>
              <option value={2}>March</option>
              <option value={3}>April</option>
              <option value={4}>May</option>
              <option value={5}>June</option>
              <option value={6}>July</option>
              <option value={7}>August</option>
              <option value={8}>September</option>
              <option value={9}>October</option>
              <option value={10}>November</option>
              <option value={11}>December</option>
            </select>
            <select name="year" id="year" value={currentYear} onChange={e => setCurrentYear(parseInt(e.target.value))}>
              <option value={1990}>1990</option>
              <option value={1991}>1991</option>
              <option value={1992}>1992</option>
              <option value={1993}>1993</option>
              <option value={1994}>1994</option>
              <option value={1995}>1995</option>
              <option value={1996}>1996</option>
              <option value={1997}>1997</option>
              <option value={1998}>1998</option>
              <option value={1999}>1999</option>
              <option value={2000}>2000</option>
              <option value={2001}>2001</option>
              <option value={2002}>2002</option>
              <option value={2003}>2003</option>
              <option value={2004}>2004</option>
              <option value={2005}>2005</option>
              <option value={2006}>2006</option>
              <option value={2007}>2007</option>
              <option value={2008}>2008</option>
              <option value={2009}>2009</option>
              <option value={2010}>2010</option>
              <option value={2011}>2011</option>
              <option value={2012}>2012</option>
              <option value={2013}>2013</option>
              <option value={2014}>2014</option>
              <option value={2015}>2015</option>
              <option value={2016}>2016</option>
              <option value={2017}>2017</option>
              <option value={2018}>2018</option>
              <option value={2019}>2019</option>
              <option value={2020}>2020</option>
              <option value={2021}>2021</option>
              <option value={2022}>2022</option>
              <option value={2023}>2023</option>
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
              <option value={2027}>2027</option>
              <option value={2028}>2028</option>
              <option value={2029}>2029</option>
              <option value={2030}>2030</option>           
            </select>
          </form>
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
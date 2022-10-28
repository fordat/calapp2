import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks, reset } from '../features/tasks/taskSlice';

import Form from '../components/Form';
import EditForm from '../components/EditForm';


function Dashboard() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { tasks, isLoading, isError, message } = useSelector((state) => state.tasks);

  useEffect(() => {
    if(!user) {
      navigate('/login')
    }

    console.log("WHYY");

    dispatch(getTasks());

    return () => {
      dispatch(reset);
    }
  }, [user, navigate, isError, message, dispatch]);

  const tasks2 = tasks.map((d) => ({title: d.text,
                                    category: d.category,
                                    id: d._id,
                                    day: new Date(d.date).getDate(),
                                    month: new Date(d.date).getMonth(),
                                    year: new Date(d.date).getFullYear()}));

  // const listTasks = tasks.map((d) => <li key={d.text}>{d.text + " " + d.date} </li>);

  const [selectedTask, setSelectedTask] = useState({});

  // GENERATE TODAY'S DATE AND SAVE IT
  const today = new Date();
  const trueMonth = today.getMonth();
  const trueYear = today.getFullYear();
  const currentDate = today.getDate();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // MODAL
  const [openModal, setOpenModal] = useState(false);

  // EDIT MODAL
  const [openEditModal, setOpenEditModal] = useState(false);

  // TASK VALUES
  const [taskValues, setTaskValues] = useState({
    text: '',
    date: '',
    category: '',
  });


  const onClickDay = (dd,mm,yy,event) => {
    if (event.currentTarget === event.target) {
      console.log(dd + " " + mm + " " + yy);

      setOpenModal(true);
  
      setTaskValues({ ...taskValues, date: `${mm + 1}/${dd}/${yy}`});
    }
  }

  const onClickTask = (clickedTask, event) => {
    event.preventDefault();
    if (event.currentTarget === event.target) {
      console.log("TASK ", clickedTask);
      setSelectedTask(clickedTask);

      setOpenEditModal(true);
    }
  }

  // MONTH CALCULATION AND RENDER

  const calculateDaysInMonth = (year, month) => 32 - new Date(year, month, 32).getDate();



  const yearOptions = [];

  for (let i = 1990; i <= 2030; i++) {
    yearOptions.push(
      <option value={i}>{i}</option>
    )
  }

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
      let eventList = tasks2.filter(task => task.day === d && task.month === currentMonth && task.year === currentYear);

      let eventsInDay = [];

      let eventIcons = [];

      for (let e = 0; e <= eventList.length; e++) {
        if(eventList[e]) {
          if(eventList[e].category) {
            eventIcons.push(
              <div className="event-icon">
                <div className={`event-${eventList[e].category}`} ></div>
              </div>
            );
          }

          eventsInDay.push(
            <div className="event">
              <div onClick={(event) => onClickTask(eventList[e], event)}>- {eventList[e].title}</div>
            </div>
          );
        }
      }

      
      let eventClass = eventList.length !== 0 ? "event-class" : "";

      let dayClass = (d === currentDate && trueYear === currentYear && trueMonth === currentMonth) ? "today" : "";
      
      daysInMonth.push(
        <td 
          key={d} 
          className={`calendar-day ${dayClass} ${eventClass}`}
          onClick={(event) => onClickDay(d,currentMonth,currentYear,event)}
        >
          <div className="calendar-date">
            {d} 
            <div className="calendar-icons">{eventIcons}</div>
          </div>
          {eventsInDay}
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

        {/* <div>Dashboard!!! Hello {user && user.name}</div> */}
        <div className="calendar-body">
          <div className="calendar-control">
            <div className="btn" onClick={onClickPrev}> Previous </div>
            <form className="calendar-control-form">
              <select className="calendar-control-select" name="month" id="month" value={currentMonth} onChange={e => setCurrentMonth(parseInt(e.target.value))}>
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
              <select className="calendar-control-select" name="year" id="year" value={currentYear} onChange={e => setCurrentYear(parseInt(e.target.value))}>
                {yearOptions}          
              </select>
            </form>
            <div className="btn" onClick={onClickNext}> Next </div>
          </div>
          
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
        {/* <ul className="dashboard-list">
          {listTasks}
        </ul> */}
      {openModal && 
        <Form 
          taskValues={taskValues} 
          setTaskValues={setTaskValues}
          setOpenModal={setOpenModal}
        />}

      {openEditModal && 
        <EditForm 
          task={selectedTask}
          // setTaskValues={setTaskValues}
          setOpenEditModal={setOpenEditModal}
        />}
    </div>
  )
}

export default Dashboard
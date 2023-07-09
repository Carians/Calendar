import 'bootstrap/dist/css/bootstrap.min.css'
import './css/Calendars.css'
import { Card, CardBody } from "reactstrap";
import { FilePlus, CalendarDay, CalendarMonth, CalendarWeek } from 'react-bootstrap-icons';

import Header from '../components/Header';
import Footer from '../components/Footer';

import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { ThemeContext } from '../ThemeContext';
import { Link } from "react-router-dom";

import { getCalendars } from '../Data';


function Calendars() {

  const calendarIcons = [<CalendarDay size={50} className='mb-2'/>, <CalendarMonth size={50} className='mb-2'/>, <CalendarWeek size={50} className='mb-2'/>]

  // context
  const {session, userData} = useContext(UserContext)
  const {theme} = useContext(ThemeContext)

  //state
  const [calendars, setCalendars] = useState([])

  useEffect(()=>{
    const fetchdata = async() =>{
      const data = await getCalendars()
      setCalendars(data.results)
    }
    fetchdata()
  }, [session])

  function setCalendarInfo(cal){
    typeof cal === "object" ? localStorage.setItem('calInfo', JSON.stringify(cal)) : localStorage.setItem('calInfo', null)
  }

  function formatDate(date){
    //TODO zła data dla mojej lokalizacji, zobaczyć backend
    date = date.slice(0, date.indexOf('.'))
    date = date.slice(0, date.lastIndexOf(':'))
    date = date.replace('T', ' ')
    return date
  }

  return (
    <>
      <Header session={session} userData={userData} theme={theme}/>
      <div style={{backgroundColor: theme.background, height: '80vh'}} className='cal-main d-flex justify-content-center align-items-center flex-column'>
        <p className='m-4'>Witaj {userData.username}, tutaj znajdują się twoje kalendarze </p>
        <div className='container card-style'>
          <div className='row row-cols-xl-2'>

            <Link onClick={() => setCalendarInfo(0)} to={'/'} className='col cal-style m-4 d-flex justify-content-center align-items-center'>
                <FilePlus size={50} />
            </Link>

            {calendars.map((cal) =>(
              <Link onClick={() => setCalendarInfo(cal)} to={'/'} className='col cal-style m-4 d-flex justify-content-center align-items-center'>
                <div className='d-flex flex-column text-dark'>
                  {calendarIcons[Math.floor(Math.random()*calendarIcons.length)]}
                  <p><b>Name: </b>{cal.name}</p>
                  <div className='d-flex flex-column'>
                    <b>Description</b>
                    <p>{cal.description}</p>
                  </div>
                  <p><b>Created: </b>{formatDate(cal.date_created)}</p>
                  <p><b>Modified: </b>{formatDate(cal.date_modified)}</p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
      <Footer theme={theme}/>
    </>
  );
}

export default Calendars;
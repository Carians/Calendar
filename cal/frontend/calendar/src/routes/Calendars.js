import 'bootstrap/dist/css/bootstrap.min.css'
import './css/Calendars.css'
import { Card, CardBody } from "reactstrap";
import { FilePlus } from 'react-bootstrap-icons';

import Header from '../components/Header';
import Footer from '../components/Footer';

import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { Link } from "react-router-dom";

import { getCalendars } from '../Data';


function Calendars() {

  const {session, userData} = useContext(UserContext)
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

  return (
    <>
      <Header session={session} userData={userData}/>
      <div className='main d-flex justify-content-center align-items-center flex-column'>
        <p>Witaj {userData.username}, tutaj znajdują się twoje kalendarze </p>
        <div className='container card-style'>
          <div className='row row-cols-xl-2'>

            <div className='col cal-style m-4 d-flex justify-content-center align-items-center'>
              <Link onClick={() => setCalendarInfo(0)} to={'/'}>
                <FilePlus size={50} />
              </Link>
            </div>

            {calendars.map((cal) =>(
              <div className='col cal-style m-4'>
                <Link onClick={() => setCalendarInfo(cal)} to={'/'} className='d-flex flex-column'>
                  <p><b>Calendar: </b>{cal.name}</p>
                  <div>{cal.description}</div>
                  <p><b>Created: </b>{cal.date_created.toLocaleString()}</p>
                  <p><b>Modified: </b>{cal.date_modified}</p>
                </Link>
              </div>
            ))}
          </div>

        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Calendars;
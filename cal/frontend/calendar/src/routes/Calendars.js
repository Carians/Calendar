import 'bootstrap/dist/css/bootstrap.min.css'
import './css/Calendars.css'
import { Card, CardBody } from "reactstrap";
import { FilePlus } from 'react-bootstrap-icons';

import Header from '../components/Header';
import Footer from '../components/Footer';

import { useState, useEffect } from 'react';
import { getUserData } from '../Data';


function Calendars() {

  const [session, setSession] = useState(window.sessionStorage.getItem('sessionid')) 
  const [userData, setUserData] = useState('')
    
    
  useEffect(()=>{
      const fetchData = async () => {
          const data = await getUserData()
          setUserData(data)
      }
      fetchData()
  },[session])

  useEffect(()=>{
    setSession(window.sessionStorage.getItem('sessionid'))
  }, [window.sessionStorage.getItem('sessionid')])

  return (
    <>
      <Header/>
      <div className='main d-flex justify-content-center align-items-center flex-column'>
        <p>Witaj {userData.username}, tutaj znajdują się twoje kalendarze </p>
        <Card className='card-style'>
          <CardBody>
            <div className='cal-style d-flex justify-content-center align-items-center'>
              <FilePlus size={50} />
            </div>
          </CardBody>

        </Card>
      </div>
      <Footer/>
    </>
  );
}

export default Calendars;
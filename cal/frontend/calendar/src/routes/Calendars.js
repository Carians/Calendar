import 'bootstrap/dist/css/bootstrap.min.css'
import './css/Calendars.css'
import { Card, CardBody } from "reactstrap";
import { FilePlus } from 'react-bootstrap-icons';

import Header from '../components/Header';
import Footer from '../components/Footer';

import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Link } from "react-router-dom";


function Calendars() {

  const {session, userData} = useContext(UserContext)

  return (
    <>
      <Header session={session} userData={userData}/>
      <div className='main d-flex justify-content-center align-items-center flex-column'>
        <p>Witaj {userData.username}, tutaj znajdują się twoje kalendarze </p>
        <Card className='card-style'>
          <CardBody>
            <Link to={'/'} className='cal-style d-flex justify-content-center align-items-center'>
              <FilePlus size={50} />
            </Link>
          </CardBody>

        </Card>
      </div>
      <Footer/>
    </>
  );
}

export default Calendars;
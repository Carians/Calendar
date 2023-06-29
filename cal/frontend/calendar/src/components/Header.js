import React, { useState } from "react";
import './css/Header.css'
import { logOutUser } from "../Data"

import { Calendar2Date, Calendar2Week, List, PersonCircle, Person, Gear, BoxArrowRight } from 'react-bootstrap-icons';
import {Col, Row} from 'reactstrap'
import { Link } from "react-router-dom";


export default function Header(props){

    const [isHovering, setHovering] = useState(false)


    function showSideMenu(){
        setHovering(true)
    }

    function hideSideMenu(){
        setHovering(false)
    }

    function logOut(){
        window.sessionStorage.setItem('sessionid', '')
        window.location.href = '/'
        const fetchData = async () => {
            await logOutUser()
        }
        fetchData()
    }

    return(
        <header>
            <Row className="header border border-dark">
                <Col className="d-flex justify-content-center align-items-center">
                    <div className="me-3 mb-2"><Calendar2Date size={45}/></div>
                    <h1>Calendar</h1>
                </Col>
                <Col className="d-flex justify-content-end align-items-center pe-5">
                    <List size={52} onMouseOver={showSideMenu} className='listIcon'/>

                    {/* Sliding side menu */}
                    {isHovering && 
                        <div className="side-navbar d-flex justify-content-start flex-column" onMouseLeave={hideSideMenu}>
                            {!props.session && 
                            <div className="d-flex justify-content-center h-100 flex-column">
                                    <p>Nie jesteś zalogowany</p>
                                    <Link to={'/'} className="text-primary">Zaloguj się</Link>
                                </div>
                            }
                            {/* if Logged */}
                            {props.session && 
                                <div className="mt-4">
                                    <div className="d-flex justify-content-evenly flex-row"> 
                                        <PersonCircle size={50}/>
                                        <div className="d-flex justify-content-evenly flex-column"> 
                                            <h4>{props.userData.username}</h4>
                                            <p className="text-secondary">{props.userData.email}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Link to={'/calendars'} style={{height: '7vh'}} className="linked dropdown-hover d-flex justify-content-start align-items-center flex-row ps-5"> 
                                            <Calendar2Week size={30}/>
                                            <p className="ms-3 mt-3 fs-4">Kalendarze</p>
                                        </Link>
                                        <Link to={'/'} style={{height: '7vh'}} className="linked dropdown-hover d-flex justify-content-start align-items-center flex-row ps-5"> 
                                            <Person size={30}/>
                                            <p className="ms-3 mt-3 fs-4">Moje konto</p>
                                        </Link>
                                        <Link to={'/settings'} style={{height: '7vh'}} className="linked dropdown-hover d-flex justify-content-start align-items-center flex-row ps-5"> 
                                            <Gear size={30}/>
                                            <p className="ms-3 mt-3 fs-4">Ustawienia</p>
                                        </Link>
                                        <div onClick={logOut} style={{height: '7vh'}} className="linked dropdown-hover d-flex justify-content-start align-items-center flex-row ps-5"> 
                                            <BoxArrowRight size={30}/>
                                            <p className="ms-3 mt-3 fs-4">Wyloguj się</p>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>}
                </Col>
            </Row>

        </header>
    )
}
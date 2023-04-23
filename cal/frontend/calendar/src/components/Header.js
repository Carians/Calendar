import React, { useState, useEffect } from "react";
import './css/Header.css'

import { Calendar2Date, Calendar2Week, List, PersonCircle, Person, Gear, BoxArrowRight } from 'react-bootstrap-icons';
import {Col, Row} from 'reactstrap'
import { Link } from "react-router-dom";


export default function Header(){
    let isLogged = true 

    const [isHovering, setHovering] = useState(false)
    const [session, setSession] = useState(window.sessionStorage.getItem('sessionid')) 

    useEffect(()=>{
        setSession(window.sessionStorage.getItem('sessionid'))
    }, [window.sessionStorage.getItem('sessionid')])

    // TODO pobieranie danych uzytkownika z api (sesja)
    function showSideMenu(){
        setHovering(true)
        console.log(session)
    }

    function hideSideMenu(){
        setHovering(false)
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
                            {!isLogged && 
                            <div className="d-flex justify-content-center h-100 flex-column">
                                    <p>Nie jesteś zalogowany</p>
                                    <Link to={'/login'}>Zaloguj się</Link>
                                </div>
                            }
                            {/* if Logged */}
                            {isLogged && 
                                <div className="mt-4">
                                    <div className="d-flex justify-content-evenly flex-row"> 
                                        <PersonCircle size={50}/>
                                        <div className="d-flex justify-content-evenly flex-column"> 
                                            <h4>Witaj michal!</h4>
                                            <p className="text-secondary">email@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Link to={'/calendars'} style={{height: '7vh'}} className="linked dropdown-hover d-flex justify-content-start align-items-center flex-row ps-5"> 
                                            <Calendar2Week size={30}/>
                                            <p className="ms-3 mt-3 fs-4">Kalendarze</p>
                                        </Link>
                                        <div style={{height: '7vh'}} className="linked dropdown-hover d-flex justify-content-start align-items-center flex-row ps-5"> 
                                            <Person size={30}/>
                                            <p className="ms-3 mt-3 fs-4">Moje konto</p>
                                        </div>
                                        <div style={{height: '7vh'}} className="linked dropdown-hover d-flex justify-content-start align-items-center flex-row ps-5"> 
                                            <Gear size={30}/>
                                            <p className="ms-3 mt-3 fs-4">Ustawienia</p>
                                        </div>
                                        <div style={{height: '7vh'}} className="linked dropdown-hover d-flex justify-content-start align-items-center flex-row ps-5"> 
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
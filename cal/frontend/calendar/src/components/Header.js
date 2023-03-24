import React, { useState, useEffect, createElement } from "react";
import './css/Header.css'

import { Calendar2Date, List } from 'react-bootstrap-icons';
import {Container, Col, Row} from 'reactstrap'
import { Link } from "react-router-dom";


export default function Header(){

    const [isHovering, setHovering] = useState(false) 

    function showSideMenu(){
        setHovering(true)
        //document.querySelector('.side-navbar').classList.add('side-navbar-transform')
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
                        <div className="side-navbar d-flex justify-content-center flex-column" onMouseLeave={hideSideMenu}>
                            <p>Nie jesteś zalogowany</p>
                            <Link to={'/login'}>Zaloguj się</Link>
                        </div>}
                </Col>
            </Row>

        </header>
    )
}
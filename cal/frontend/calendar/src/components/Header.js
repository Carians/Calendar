import React from "react";
import './css/Header.css'

import { Calendar2Date, List } from 'react-bootstrap-icons';
import {Container, Col, Row} from 'reactstrap'


export default function Header(){
    return(
        <header>
            <Row className="header border border-dark">
                <Col className="d-flex justify-content-center align-items-center">
                    <div className="me-3 mb-2"><Calendar2Date size={45}/></div>
                    <h1>Calendar</h1>
                </Col>
                <Col className="d-flex justify-content-end align-items-center pe-5">
                    <List size={52}/>
                </Col>
            </Row>
        </header>
    )
}
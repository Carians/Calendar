import React from "react";
import { List } from 'react-bootstrap-icons';
import {Container, Col, Row} from 'reactstrap'


export default function Header(){
    return(
        <header>
            <Row className="header border border-dark">
                <Col>
                    <h1>Calendar</h1>
                </Col>
                <Col className="d-flex justify-content-end pe-5">
                    <List size={52}/>
                </Col>
            </Row>
        </header>
    )
}
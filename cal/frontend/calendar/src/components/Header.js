import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { List } from 'react-bootstrap-icons';
import {Container, Col, Row} from 'reactstrap'


export default function Header(){
    return(
        <header>
            <Row className="border border-dark">
                <Col>
                    <h1>Calendar</h1>
                </Col>
                <Col>
                    <List size={52}/>
                </Col>
            </Row>
        </header>
    )
}
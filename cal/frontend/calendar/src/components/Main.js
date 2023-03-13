import React from "react";
import './css/Main.css'

import {Container, Col, Row} from 'reactstrap'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';


export default function Main(){

    function handleForm(event){
        event.preventDefault()
    }

    return(
        <div className="main d-flex justify-content-center align-items-center">
            <Form onSubmit={handleForm}> 
                <p>Zarejestruj się</p>
                <FormGroup className="d-flex flex-direction-row">
                    <Label className="me-2" for="inputLogin">Login</Label>
                    <Input type="text" name="login" placeholder="Enter login"/>
                </FormGroup>
                <FormGroup className="d-flex flex-direction-row">
                    <Label className="me-2" for="inputPassword">Password</Label>
                    <Input type="password" name="password" placeholder="Enter password"/>
                </FormGroup>
                <Button className="submit-btn bg-primary">Submit</Button>
            </Form>

        </div>
    )
}
import React from "react";
import './css/Main.css'

import { Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link } from "react-router-dom";


export default function Main(){

    function handleForm(event){
        event.preventDefault()
    }

    return(
        <div className="main d-flex justify-content-center align-items-center">
            <Card style={{
                width: '25%',
                boxShadow: '0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)',
            }}>
                <CardBody>
                    <Form onSubmit={handleForm}> 
                        <p>Logowanie</p>
                        <FormGroup className="d-flex flex-direction-row">
                            <Input type="text" name="login" placeholder="Enter login"/>
                        </FormGroup>
                        <FormGroup className="d-flex flex-direction-row">
                            <Input type="password" name="password" placeholder="Enter password"/>
                        </FormGroup>
                        <Button className="submit-btn bg-primary"><h6>Zaloguj się</h6></Button>
                        <div><a style={{fontSize: '50%'}} href="/">Nie pamiętasz hasła?</a></div>
                        <hr></hr>
                        <Button className="submit-btn bg-success">
                            <h6><Link to='register' className="linked">Utwórz nowe konto</Link></h6>
                        </Button>
                    </Form>
                </CardBody>
            </Card>

        </div>
    )
}
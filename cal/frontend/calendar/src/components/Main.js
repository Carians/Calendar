import React, { useState } from "react";
import './css/Main.css'

import { Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link } from "react-router-dom";

import { getCookie } from "./functions/cookie";


export default function Main(){

    const [form, setForm] = useState({username: '', password: ''})

    function handleForm(event){
        event.preventDefault()
        const {name, value} = event.target

        setForm(prevForm => {
          return{
            ...prevForm,
            [name]: value
          }
        })
    }

    function handleLogin(){
        const url = window.location.origin + '/api/auth/'
        const csrf = getCookie('csrftoken')

        fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json, application/x-www-form-urlencoded, multipart/form-data',
              'Content-Type': 'application/json',
              'X-CSRFToken': csrf
            },
            body: JSON.stringify({
              'username': form.username,
              'password': form.password,
            })
          })
          .then(res => {return res.json()})
          .then(data => {
            console.log(data)
            window.sessionStorage.setItem('sessionid', data.token)
            })
          .catch(err => console.log(err))
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
                            <Input type="text" name="username" placeholder="Enter username" onChange={handleForm}/>
                        </FormGroup>
                        <FormGroup className="d-flex flex-direction-row">
                            <Input type="password" name="password" placeholder="Enter password" onChange={handleForm}/>
                        </FormGroup>
                        <Button className="submit-btn bg-primary" onClick={handleLogin}>
                            <h6 className="linked">Zaloguj się</h6>
                        </Button>
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
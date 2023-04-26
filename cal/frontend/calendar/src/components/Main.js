import React, { useState } from "react";
import './css/Main.css'

import { Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link } from "react-router-dom";

import { loginUser } from "../Data";


export default function Main(){

    const [form, setForm] = useState({username: '', password: ''})
    const [formError, setformError] = useState({username: '', password: '', non_field_errors: ''})


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
        
        const fetchdata = async() =>{
            const data = await loginUser(form)
            setformError({
                'username': data.username,
                'password': data.password,
                'non_field_errors': data.non_field_errors,
            })
        }
        fetchdata()
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
                        <FormGroup className="d-flex flex-column">
                            <Input type="text" name="username" placeholder="Enter username" onChange={handleForm}/>
                            {formError.username && <p style={{color: 'red', fontSize: '60%'}}>{formError.username}</p>}
                        </FormGroup>
                        <FormGroup className="d-flex flex-column">
                            <Input type="password" name="password" placeholder="Enter password" onChange={handleForm}/>
                            {formError.password && <p style={{color: 'red', fontSize: '60%'}}>{formError.password}</p>}
                        </FormGroup>
                        <FormGroup>
                            <Button className="submit-btn bg-primary" onClick={handleLogin}>
                                <h6 className="linked">Zaloguj się</h6>
                            </Button>
                            {formError.non_field_errors && <p style={{color: 'red', fontSize: '60%'}}>{formError.non_field_errors}</p>}
                        </FormGroup>
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
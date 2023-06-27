import React, { useEffect, useState } from "react";
import './css/Main.css'

import { Card, CardBody } from "reactstrap";
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { Link } from "react-router-dom";
import Creator from "./Creator";
 
import { loginUser } from "../Data";


export default function Main(props){

    const [form, setForm] = useState({username: '', password: ''})
    const [formError, setformError] = useState({username: undefined, password: undefined, non_field_errors: undefined})
    const hasErrors = Object.values(formError).some((error) => error !== undefined)
    const [formSubmitted, setFormSubmitted] = useState(false); 


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
        setFormSubmitted(true)
        const fetchdata = async() =>{
            const data = await loginUser(form)
            setformError(prevState => ({
                ...prevState,
                'username': data.username,
                'password': data.password,
                'non_field_errors': data.non_field_errors,
            }))
        }
        fetchdata()
    }

    useEffect(() =>{
        if(!hasErrors && formSubmitted){
            window.location.href = '/'
        }
    }, [formError])

    return(
        <>
            {!props.session &&
                <div className="main d-flex justify-content-center align-items-center">
                    <Card style={{
                        width: '25%',
                        boxShadow: '0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)',
                    }}>
                        <CardBody>
                            <Form onSubmit={handleForm}> 
                                <p className="fs-3">Logowanie</p>
                                <FormGroup className="d-flex flex-column">
                                    <Input type="text" name="username" placeholder="Enter username" onChange={handleForm}/>
                                    {formError.username && <p style={{color: 'red'}}>{formError.username}</p>}
                                </FormGroup>
                                <FormGroup className="d-flex flex-column">
                                    <Input type="password" name="password" placeholder="Enter password" onChange={handleForm}/>
                                    {formError.password && <p style={{color: 'red'}}>{formError.password}</p>}
                                </FormGroup>
                                <FormGroup>
                                    <Button className="submit-btn bg-primary" onClick={handleLogin}>
                                        <h6 className="linked">Zaloguj się</h6>
                                    </Button>
                                    {(hasErrors && formSubmitted) && <p style={{color: 'red'}}>Nieprawidłowe hasło lub nazwa użytkownika</p>}
                                    {(!hasErrors && formSubmitted) && <p style={{color: 'green'}}>Zalogowano pomyślnie!</p>} 
                                </FormGroup>
                                <div><a className="a-underline" href="/">Nie pamiętasz hasła?</a></div>
                                <hr></hr>
                                <Button className="submit-btn bg-success">
                                    <h6><Link to='register' className="linked">Utwórz nowe konto</Link></h6>
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            }

                {props.session &&
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="d-flex justify-content-center align-items-center " style={{
                                width: '90%',
                                height: '120vh',
                            }}>
                            <Card style={{
                                width: '100%',
                                height: '100vh',
                                boxShadow: '0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)',
                            }}>
                                <CardBody>
                                    <Creator/>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                }
        </>
    )
}
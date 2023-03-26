import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import Header from '../components/Header';
import Footer from '../components/Footer';

function Register() {
  // TODO Refactor to Password.js component to make it cleaner

  const [form, setForm] = useState({userName: '', firstName: '', lastName: '', email: '', password: '', password2: ''})
  const [formError, setFormError] = useState({userName: null, firstName: null, lastName: null, email: null, password2: null})


  // Error checking
  useEffect(() =>{
    const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/
    setFormError({
      'userName': form.userName.length > 0 && form.userName.length < 4 ? 'Nazwa użytkownika jest za krótka' : null,
      'firstName': null,
      'lastName': null,
      'email': form.email.length <= 0 || emailRegex.test(form.email) ? null : 'Email jest nieprawidłowy',
      'password': null,
      'password2': form.password2 !== form.password ? 'Hasła nie są takie same' : null,
  })
  }, [form])

  // Password strength
  const [strengthColors, setstrengthColors] = useState({low: false, medium: false, medium2: false, high: false, high2: false})
  useEffect(()=>{
    const strengthRegex = {
      low: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/, 
      medium: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      medium2: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{10,}$/,
      high: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?~_+-=/|]).{10,}$/,
      high2: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?~_+-=/|]).{12,}$/
    }

    for(const [key, val] of Object.entries(strengthRegex)){
      if(val.test(form.password)){
        console.log(strengthColors)
        setstrengthColors(prev=> {
          return{
            ...prev,
            [key]: true
          }
        })
      }
      else{
        setstrengthColors(prev=> {
          return{
            ...prev,
            [key]: false
          }
        })
      }
    }

  }, [form.password, form.password2])

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

  return (
    <>
      <Header/>
      <main style={{height: '80vh'}} className='d-flex justify-content-center align-items-center'>
        <Card style={{
          width: '25%',
          boxShadow: '0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)',
          }}>
            <CardBody>
              <Form onSubmit={handleForm}> 
                <h1 className='text-center'>Rejestracja</h1>
                <FormGroup className="d-flex flex-column">
                    <Input type="text" name="userName" placeholder="Nazwa użytkownika" onChange={handleForm}/>
                    {formError.userName && <p style={{color: 'red'}}>{formError.userName}</p>}
                </FormGroup>
                <FormGroup className="d-flex flex-column">
                    <Input type="text" name="firstName" placeholder="Imię" onChange={handleForm}/>
                    {formError.firstName && <p style={{color: 'red'}}>{formError.firstName}</p>}
                </FormGroup>
                <FormGroup className="d-flex flex-column">
                    <Input type="text" name="lastName" placeholder="Nazwisko" onChange={handleForm}/>
                    {formError.lastName && <p style={{color: 'red'}}>{formError.lastName}</p>}
                </FormGroup>
                <FormGroup className="d-flex flex-column">
                    <Input type="text" name="email" placeholder="Email" onChange={handleForm}/>
                    {formError.email && <p style={{color: 'red'}}>{formError.email}</p>}
                </FormGroup>
                <FormGroup className="d-flex flex-column">
                    <Input type="password" name="password" placeholder="Hasło" onChange={handleForm}/>
                </FormGroup>
                <FormGroup className="d-flex flex-column">
                    <Input type="password" name="password2" placeholder="Powtórz hasło" onChange={handleForm}/>
                    {formError.password2 && <p style={{color: 'red'}}>{formError.password2}</p>}
                </FormGroup>
                {(form.password || form.password2) && <FormGroup className='d-flex flex-row'>
                  <p className='me-2'>Siła hasła:</p>
                  <div style={{backgroundColor: 'rgb(179, 0, 0)', width: '7.5%', height: '2vh', border: '0.2px solid black', borderRadius: '5px'}} className='me-1'></div>
                  <div style={{backgroundColor: strengthColors.low ? 'rgb(179, 0, 0)' : '', width: '7.5%', height: '2vh', border: '0.2px solid black', borderRadius: '5px'}} className='me-1' id='low'></div>
                  <div style={{backgroundColor: strengthColors.medium ? 'rgb(237, 220, 28)' : '', width: '7.5%', height: '2vh', border: '0.2px solid black', borderRadius: '5px'}} className='me-1' id='medium'></div>
                  <div style={{backgroundColor: strengthColors.medium2 ? 'rgb(237, 220, 28)' : '', width: '7.5%', height: '2vh', border: '0.2px solid black', borderRadius: '5px'}} className='me-1' id='medium2'></div>
                  <div style={{backgroundColor: strengthColors.high ? 'rgb(13, 224, 28)' : '', width: '7.5%', height: '2vh', border: '0.2px solid black', borderRadius: '5px'}} className='me-1' id='high'></div>
                  <div style={{backgroundColor: strengthColors.high2 ? 'rgb(13, 224, 28)' : '', width: '7.5%', height: '2vh', border: '0.2px solid black', borderRadius: '5px'}} className='me-1' id='high2'></div>
                </FormGroup>}
                <FormGroup className='d-flex justify-content-center'>
                  <Button className="submit-btn bg-primary"><h6>Zarejestruj się</h6></Button>
                </FormGroup>
              </Form>
          </CardBody>
        </Card>
      </main>
      <Footer/>
    </>
  );
}

export default Register;

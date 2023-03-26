import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import Header from '../components/Header';
import Footer from '../components/Footer';

function Register() {

  const [form, setForm] = useState({userName: '', firstName: '', lastName: '', email: '', password: '', password2: ''})
  const [formError, setFormError] = useState({userName: null, firstName: null, lastName: null, email: null, password2: null})

  console.log(form)

  // Error checking
  useEffect(() =>{
    const regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    setFormError({
      'userName': form.userName.length > 0 && form.userName.length < 4 ? 'Nazwa użytkownika jest za krótka' : null,
      'firstName': null,
      'lastName': null,
      'email': form.email.length <= 0 || regex.test(form.email) ? null : 'Email jest nieprawidłowy',
      'password': null,
      'password2': form.password2 !== form.password ? 'Hasła nie są takie same' : null,
  })
  }, [form])

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
                <h1>Rejestracja</h1>
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
                <Button className="submit-btn bg-primary"><h6>Zarejestruj się</h6></Button>
              </Form>
          </CardBody>
        </Card>
      </main>
      <Footer/>
    </>
  );
}

export default Register;

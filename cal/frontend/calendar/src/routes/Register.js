import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, CardBody } from "reactstrap";
import { Form, FormGroup, Input, Button } from 'reactstrap';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Password from './Password';
import { registerUserAPI } from '../Data';
import { ThemeContext } from '../ThemeContext';
import { useContext } from 'react';


function Register() {

  const {theme} = useContext(ThemeContext)
  
  const [form, setForm] = useState({username: '', first_name: '', last_name: '', email: '', password: '', password2: ''})
  const [formError, setFormError] = useState({username: null, first_name: null, last_name: null, email: null, password2: null})
  const [formSubmitted, setFormSubmitted] = useState(false);
  const hasErrors = Object.values(formError).some(error => error !== null);



  // Error checking
  useEffect(() =>{
    const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/
    setFormError({
      'username': form.username.length > 0 && form.username.length < 4 ? 'Nazwa użytkownika jest za krótka' : null,
      'email': form.email.length <= 0 || emailRegex.test(form.email) ? null : 'Email jest nieprawidłowy',
      'password':  form.password.length > 2 && form.password.length < 8 ? 'Hasło jest za krótkie' : null,
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


  function submitUser(){
    if(!hasErrors){
      setFormSubmitted(true)

      const fetchData = async () => {
        const response = await registerUserAPI(form)
        if(Array.isArray(response.username)){
          setFormError({'username': response.username})
        }
      }
      fetchData()
      .then(window.location.href = '/')
    }
  }


  return (
    <div style={{width: '100%', height: '100vh', backgroundColor: theme.background}}>
      <Header theme={theme}/>
      <main style={{height: '80vh'}} className='d-flex justify-content-center align-items-center'>
        <Card style={{
          width: '25%',
          boxShadow: '0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)',
          }}>
            <CardBody>
              <Form onSubmit={handleForm}> 
                <h1 className='text-center'>Rejestracja</h1>
                <FormGroup className="d-flex flex-column">
                    <Input type="text" name="username" placeholder="Nazwa użytkownika" onChange={handleForm}/>
                    {formError.username && <p style={{color: 'red'}}>{formError.username}</p>}
                </FormGroup>
                <FormGroup className="d-flex flex-column">
                    <Input type="text" name="first_name" placeholder="Imię" onChange={handleForm}/>
                    {formError.first_name && <p style={{color: 'red'}}>{formError.first_name}</p>}
                </FormGroup>
                <FormGroup className="d-flex flex-column">
                    <Input type="text" name="last_name" placeholder="Nazwisko" onChange={handleForm}/>
                    {formError.last_name && <p style={{color: 'red'}}>{formError.last_name}</p>}
                </FormGroup>
                <FormGroup className="d-flex flex-column">
                    <Input type="text" name="email" placeholder="Email" onChange={handleForm}/>
                    {formError.email && <p style={{color: 'red'}}>{formError.email}</p>}
                </FormGroup>
                <FormGroup className="d-flex flex-column">
                    <Input type="password" name="password" placeholder="Hasło" onChange={handleForm}/>
                    {formError.password && <p style={{color: 'red'}}>{formError.password}</p>}
                </FormGroup>
                <FormGroup className="d-flex flex-column">
                    <Input type="password" name="password2" placeholder="Powtórz hasło" onChange={handleForm}/>
                    {formError.password2 && <p style={{color: 'red'}}>{formError.password2}</p>}
                </FormGroup>
                <Password form={form} />
                <FormGroup className='d-flex justify-content-center align-items-center flex-column'>
                  <Button onClick={submitUser} className="submit-btn bg-primary"><h6>Zarejestruj się</h6></Button>
                  {(hasErrors && formSubmitted) && <p style={{color: 'red'}}>Poprawnie uzupełnij formularz!</p>}
                  {(!hasErrors && formSubmitted) && <p style={{color: 'green'}}>Rejestracja przebiegła pomyślnie</p>}
                </FormGroup>
              </Form>
          </CardBody>
        </Card>
      </main>
      <Footer theme={theme}/>
    </div>
  );
}

export default Register;

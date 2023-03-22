import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import Header from '../components/Header';
import Footer from '../components/Footer';

function Register() {

  function handleForm(event){
    event.preventDefault()
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
                <FormGroup className="d-flex flex-direction-row">
                    <Input type="text" name="login" placeholder="Nazwa użytkownika"/>
                </FormGroup>
                <FormGroup className="d-flex flex-direction-row">
                    <Input type="text" name="email" placeholder="Email"/>
                </FormGroup>
                <FormGroup className="d-flex flex-direction-row">
                    <Input type="password" name="password" placeholder="Hasło"/>
                </FormGroup>
                <FormGroup className="d-flex flex-direction-row">
                    <Input type="password" name="password" placeholder="Powtórz hasło"/>
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

import 'bootstrap/dist/css/bootstrap.min.css'
import './css/Settings.css'

import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';

import Header from '../components/Header';
import Footer from '../components/Footer';

import { PersonCircle, Columns, Translate } from 'react-bootstrap-icons';
import {Form, FormGroup, Input, Label} from 'reactstrap';

function Settings(){

    const {session, userData} = useContext(UserContext)
    const [currentSetting, setCurrentSetting] = useState('')

    // form
    const [form, setForm] = useState({username: '', first_name: '', last_name: '', email: '', password: '', password2: ''})
    const [formError, setFormError] = useState({username: null, first_name: null, last_name: null, email: null, password2: null})
    const [formSubmitted, setFormSubmitted] = useState(false);
    const hasErrors = Object.values(formError).some(error => error !== null);


    function settingClicked(setting){
        if(setting === 'Account'){
            setCurrentSetting(
                <div className='tile'>
                    <h4 className='d-flex justify-content-start align-items-center ms-4'>{setting}</h4>
                    <Form className='w-100'>
                        <h5 className='d-flex justify-content-center'>Zmiana hasła</h5>
                        <FormGroup className='d-flex justify-content-center align-items-center flex-row gap-3'>
                            <Label className='break-line ms-4'><b>Stare hasło: </b></Label>
                            <Input  type="text" name="oldPassword" onChange={handleChangePassword}/>
                        </FormGroup>
                        <FormGroup className='d-flex justify-content-center align-items-center flex-row gap-3'>
                            <Label className='break-line ms-4'><b>Nowe hasło: </b></Label>
                            <Input  type="text" name="oldPassword" onChange={handleChangePassword}/>
                        </FormGroup>
                        <FormGroup className='d-flex justify-content-center align-items-center flex-row gap-3'>
                            <Label className='break-line ms-4'><b>Powtórz nowe hasło: </b></Label>
                            <Input  type="text" name="oldPassword" onChange={handleChangePassword}/>
                        </FormGroup>
                        <div className='d-flex justify-content-center'>
                            <button className='btn btn-primary'>Zapisz</button>
                        </div>
                    </Form>
                </div>
            )
        }
        else if(setting === 'Theme'){
            setCurrentSetting(
                <div className='tile'>
                    <h4 className='d-flex justify-content-start align-items-center ms-4'>{setting}</h4>
                </div>
            )
        }
        else if(setting === 'Language'){
            setCurrentSetting(
                <div className='tile'>
                    <h4 className='d-flex justify-content-start align-items-center ms-4'>{setting}</h4>
                </div>
            )
        }
    }

    function handleChangePassword(){

    }


    return(
        <>
            <Header session={session} userData={userData}/>
            <div className='d-flex justify-content-center mt-5'>
                <div className='settings-main'>
                    <h2 className='d-flex justify-content-center'>Settings</h2>
                    <hr></hr>
                    <div className='d-flex flex-row'>
                        <div className='menu-tile ms-5'>
                            <div onClick={() => settingClicked('Account')} className='settings-tile d-flex align-items-center flex-row'><PersonCircle className='me-2' size={30}/><p className='fs-5'>Account</p></div>
                            <div onClick={() => settingClicked('Theme')} className='settings-tile d-flex align-items-center flex-row'><Columns className='me-2' size={30}/><p className='fs-5'>Theme</p></div>
                            <div onClick={() => settingClicked('Language')} className='settings-tile d-flex align-items-center flex-row'><Translate className='me-2' size={30}/><p className='fs-5'>Language</p></div>
                            
                        </div>
                        {currentSetting}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Settings
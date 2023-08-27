import 'bootstrap/dist/css/bootstrap.min.css'
import './css/Settings.css'

import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { ThemeContext } from '../ThemeContext';

import Header from '../components/Header';
import Footer from '../components/Footer';

import { PersonCircle, Columns, Translate } from 'react-bootstrap-icons';
import {Form, FormGroup, Input, Label} from 'reactstrap';


function Settings(){

    const {session, userData} = useContext(UserContext)
    //TODO po odświeżeniu wraca do default theme
    const {theme, setTheme} = useContext(ThemeContext)

    const [currentSetting, setCurrentSetting] = useState('')

    //TODO form
    const [form, setForm] = useState({username: '', first_name: '', last_name: '', email: '', password: '', password2: ''})
    const [formError, setFormError] = useState({username: null, first_name: null, last_name: null, email: null, password2: null})
    const [formSubmitted, setFormSubmitted] = useState(false)
    const hasErrors = Object.values(formError).some(error => error !== null)


    useEffect(()=>{
        localStorage.setItem('theme', JSON.stringify(theme))
        settingClicked('Account')
    }, [theme])

    function themeChange(mode){
        if(mode === 'dark'){
            setTheme(prev => ({
                ...prev,
                font: 'white',
                header: '#303034',
                background: '#3f51b5',
                button: 'btn btn-primary',
            }))
        }
        else if(mode === 'light'){
            setTheme(prev => ({
                ...prev,
                font: 'black',
                header: '#DFE0E2',
                background: '#F6F6F6',
                button: 'btn btn-primary',
            }))
        }
        else{
            setTheme(prev => ({
                ...prev,
                font: 'white',
                header: '#303034',
                background: '#F6F6F6',
                button: 'btn btn-primary',
            }))
        }
    }


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
                    <div className='tile-settings'>
                        <h5>Default: </h5>
                        <div onClick={() => themeChange('default')} className='theme theme-tile-dark'>
                            <div className='item-1'>
                                <div className='item-2'></div>
                                <div className='item-3'></div>
                            </div>
                        </div>
                        <h5>Light: </h5>
                        <div onClick={() => themeChange('light')} className='theme theme-tile-light'>
                            <div className='item-1'>
                                <div className='item-2'></div>
                                <div style={{backgroundColor: '#DFE0E2'}} className='item-3'></div>
                            </div>
                        </div>
                        <h5>Dark: </h5>
                        <div onClick={() => themeChange('dark')} className='theme theme-tile-dark'>
                            <div style={{backgroundColor: '#3f51b5'}} className='item-1'>
                                <div className='item-2'></div>
                                <div className='item-3'></div>
                            </div>
                        </div>
                    </div>
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
        <div style={{backgroundColor: theme.background}} className='settings-container'>
            <Header session={session} userData={userData} theme={theme}/>
            <div className='d-flex justify-content-center mt-5'>
                <div className='settings-main'>
                    <h2 className='d-flex justify-content-center'>Settings</h2>
                    <hr></hr>
                    <div className='tiles-flex'>
                        <div className='menu-tile'>
                            <div onClick={() => settingClicked('Account')} className='settings-tile d-flex align-items-center flex-row'><PersonCircle className='settings-icon me-2 mb-2'/><p className='settings-p'>Account</p></div>
                            <div onClick={() => settingClicked('Theme')} className='settings-tile d-flex align-items-center flex-row'><Columns className='settings-icon me-2 mb-3'/><p className='settings-p'>Theme</p></div>
                            <div onClick={() => settingClicked('Language')} className='settings-tile d-flex align-items-center flex-row'><Translate className='settings-icon me-2 mb-3'/><p className='settings-p'>Language</p></div>
                            
                        </div>
                        {currentSetting}
                    </div>
                </div>
            </div>
            <Footer theme={theme}/>
        </div>
    )
}

export default Settings
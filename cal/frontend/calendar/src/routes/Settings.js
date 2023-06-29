import 'bootstrap/dist/css/bootstrap.min.css'
import './css/Settings.css'

import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';

import Header from '../components/Header';
import Footer from '../components/Footer';

import { PersonCircle, Columns, Translate } from 'react-bootstrap-icons';

function Settings(){

    const {session, userData} = useContext(UserContext)
    const [settings, setSettings] = useState(['Account', 'Theme', 'Language'])
    const [current, setCurrent] = useState('')
    const [settingIcons, setSettingIcons] = useState([<PersonCircle className='me-2' size={30} />, <Columns className='me-2' size={30} />, <Translate className='me-2' size={30} />])


    return(
        <>
            <Header session={session} userData={userData}/>
            <div className='d-flex justify-content-center mt-5'>
                <div className='main'>
                    <h2 className='d-flex justify-content-center'>Settings</h2>
                    <hr></hr>
                    <div className='d-flex flex-row'>
                        <div className='menu-tile ms-5'>
                        {settings.map((item, index)=>
                            <div onClick={() => setCurrent(item)} className='settings-tile d-flex align-items-center flex-row'>{settingIcons[index]}<p className='fs-5'>{item}</p></div>
                        )}
                            
                        </div>
                        <div className='tile d-flex justify-content-center align-items-center flex-column'>
                            <h2>{current}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Settings
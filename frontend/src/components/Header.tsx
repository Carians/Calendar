import { useState } from "react";
import './css/Header.css'
import { logOutUserAPI } from "../Data"

import { Calendar2Date, Calendar2Week, List, PersonCircle, Person, Gear, BoxArrowRight, XLg } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";


export default function Header(props: any){

    const [isHovering, setHovering] = useState(false)
    const [isMobile, setIsMobile] = useState(false)


    function showSideMenu(){
        setHovering(true)
    }

    function hideSideMenu(){
        setHovering(false)
    }

    function logOut(){
        window.localStorage.setItem('calInfo', 'null')
        window.sessionStorage.setItem('sessionid', '')
        window.location.href = '/'
        const fetchData = async () => {
            await logOutUserAPI()
        }
        fetchData()
    }

    function menuClick(){
        const notMobile = window.matchMedia('(min-width: 1200px)').matches
        if(!notMobile){
            setIsMobile(true)
            setHovering(true)
        }
    }

    function menuClose(){
        setIsMobile(false)
        setHovering(false)
    }


    return(
        <header>
            <div style={{backgroundColor: props.theme.header, color: props.theme.font}} className="d-flex justify-content-between align-items-center header border border-dark">
                <div className="d-flex flex-row ms-5">
                    <div className="me-3 mb-2"><Calendar2Date size={45}/></div>
                    <h1>Calendar</h1>
                </div>
                <div className="me-5">
                    <List size={52} onClick={menuClick} onMouseOver={showSideMenu} className='listIcon'/>

                    {/* Sliding side menu */}
                    {isHovering && 
                        <div style={{backgroundColor: props.theme.header, color: props.theme.font}} className="side-navbar d-flex justify-content-start flex-column" onMouseLeave={hideSideMenu}>
                            {!props.session && 
                            <div className="d-flex justify-content-center h-100 flex-column">
                                    <p>Nie jesteś zalogowany</p>
                                    <Link to={'/'} className="text-primary">Zaloguj się</Link>
                                </div>
                            }
                            {/* if Logged */}
                            {props.session && 
                                <div className="mt-4">
                                    {isMobile && <div className="w-100 d-flex justify-content-start border-bottom ms-3 mb-4"><XLg onClick={menuClose} size={40}/></div>}
                                    <div className="user-info"> 
                                        <div className="d-flex justify-content-center"><PersonCircle size={50}/></div>
                                        <div className="d-flex justify-content-evenly flex-column"> 
                                            <b className="username-text">{props.userData.username}</b>
                                            <p className="email-text text-secondary">{props.userData.email}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Link to={'/calendars'} style={{height: '7vh'}} className={`linked ${props.theme.header === '#303034' ? 'dropdown-hover-dark' : 'dropdown-hover-light'} d-flex justify-content-start align-items-center flex-row`}> 
                                            <Calendar2Week size={30}/>
                                            <p className="ms-3 mt-3 fs-4">Kalendarze</p>
                                        </Link>
                                        <Link to={'/'} style={{height: '7vh'}} className={`linked ${props.theme.header === '#303034' ? 'dropdown-hover-dark' : 'dropdown-hover-light'} d-flex justify-content-start align-items-center flex-row`}> 
                                            <Person size={30}/>
                                            <p className="ms-3 mt-3 fs-4">Moje konto</p>
                                        </Link>
                                        <Link to={'/settings'} style={{height: '7vh'}} className={`linked ${props.theme.header === '#303034' ? 'dropdown-hover-dark' : 'dropdown-hover-light'} d-flex justify-content-start align-items-center flex-row`}> 
                                            <Gear size={30}/>
                                            <p className="ms-3 mt-3 fs-4">Ustawienia</p>
                                        </Link>
                                        <div onClick={logOut} style={{height: '7vh'}} className={`linked ${props.theme.header === '#303034' ? 'dropdown-hover-dark' : 'dropdown-hover-light'} d-flex justify-content-start align-items-center flex-row`}> 
                                            <BoxArrowRight size={30}/>
                                            <p className="ms-3 mt-3 fs-4">Wyloguj się</p>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>}
                </div>
            </div>

        </header>
    )
}
import React, {useEffect, useState} from "react"

import { Modal, Button } from "react-bootstrap";
import { Form, FormGroup, Input, Label } from "reactstrap";

import { registerEventAPI, registerCalendarAPI, deleteCalendarAPI, getEventsAPI, getCalendarsAPI, deleteEventAPI, updateEventAPI, updateCalendarAPI } from "../Data";

export default function CreateCalendar(props){

    const [calendarModal, setCalendarModal] = useState(false)
    const [calendar, setCalendar] = useState({title: '', description: ''})

    const [errors, setErrors] = useState({title: undefined, description: undefined})
    const [submitError, setsubmitError] = useState('')
    const hasErrors = Object.values(errors).some((error) => error !== undefined)
    const [modifyText, setModifyText] = useState('')


    function openCalendar(){
        setCalendarModal(true)
        setErrors({...errors, title: undefined, description: undefined})
        setsubmitError('')
    }

    function createCalendar(ev){
        ev.preventDefault()
        if(!hasErrors && calendar.title !== '' && calendar.description !== ''){
            setsubmitError('')
            setCalendarModal(false)

            // api events
            const fetchdata = async() =>{
                let evs = []
                for(const event of props.events){
                    const data = await registerEventAPI(event)
                    evs.push(data.id)
                }

                await registerCalendarAPI(calendar, evs)
            }
            fetchdata()
            .then(()=> window.location.href = '/calendars')

        }
        else{
            setsubmitError('Nie można utworzyć takiego wydarzenia, sprawdź czy pola tytuł i opis nie są puste')
        }
    }
    

    function calendarChange(val, key){
        setCalendar(prevForm =>{
            return{
                ...prevForm,
                [key]: val
            }
        })
        
        setErrors(prevErrors =>{
            const spaceRegex = /( )\1{1,}/g
            const charsRegex = /[/.,[\]$#%^&*;:<>"\\()]/g
            if(key === 'title'){
                if(val.length > 0 && val.length < 5){
                    return{...prevErrors, 'title': 'Tytuł jest zbyt krótki'}

                }
                if(spaceRegex.test(val)){
                    return{...prevErrors, 'title': 'Usuń niepotrzebne spacje'}
                }
                if(charsRegex.test(val)){
                    return{...prevErrors, 'title': 'Usuń niedozwolone znaki'}
                }
                return{...prevErrors, 'title': undefined}
            }
            else if(key === 'description'){
                if(val.length > 100){
                    return{...prevErrors, 'description': 'Opis jest za długi'}
                }
                return{...prevErrors, 'description': undefined}
            }
        })
    }

    function removeCalendar(){

        let calInfo = localStorage.getItem('calInfo')
        calInfo = JSON.parse(calInfo)

        let calEvents = []
        const fetchdata = async() =>{ 
            const data = await getEventsAPI()
            calEvents = data.results
            .filter(ev => calInfo.events.includes(ev.id))
            .map(ev =>({
                title: ev.name,
                description: ev.description,
                start: ev.start_time,
                end: ev.end_time,
                id: ev.id
            }))
        }
        fetchdata()
        .then(()=>{
            const deletedata = async() =>{
                for(const event of calEvents){
                    await deleteEventAPI(event.id)
                }
                await deleteCalendarAPI(calInfo.id)
            }
            deletedata()
            .then(()=> window.location.href = '/calendars')
        })
    }
    

    function updateCalendar(){

        let calInfo = localStorage.getItem('calInfo')
        calInfo = JSON.parse(calInfo)
        console.log(calInfo)

        let calEvents = []
        const fetchdata = async() =>{
            const data = await getEventsAPI()
            calEvents = data.results
            .filter(ev => calInfo.events.includes(ev.id))
            .map(ev =>({
                title: ev.name,
                description: ev.description,
                start: ev.start_time,
                end: ev.end_time,
                id: ev.id
            }))
        }
        fetchdata()
        .then(()=>{
            const updatedata = async() =>{

                const ids = calEvents.map((item, i) =>{
                    return props.events[i] !== undefined ? item.id : props.events[i].id
                })

                for(let i=0; i<props.events.length; i++){
                    if(calEvents[i]){
                        const data = await updateEventAPI(props.events[i])
                        calEvents[i] = data.id
                    }
                    else{
                        const data = await registerEventAPI(props.events[i])
                        calEvents.push(data.id)
                    }
                }
                await updateCalendarAPI(calInfo, calEvents)
                calInfo.events = calEvents
                
            }
            updatedata()
            .then(() =>{
                localStorage.setItem('calInfo', JSON.stringify(calInfo))

                setModifyText('Pomyślnie zaktualizowano kalendarz!')
                setTimeout(()=>{
                    setModifyText('')
                }, 60000)
            })
        })
    }

    return(
        <>
            {!props.isModifying &&
                <div style={{height: '10vh'}} className="d-flex justify-content-end align-items-center pe-4">
                    <Button onClick={openCalendar} className="upload-btn bg-secondary border border-1"><h5>Utwórz</h5></Button>
                </div>
             } 
            {props.isModifying &&
                <div style={{height: '10vh'}} className="d-flex justify-content-between align-items-center pe-4">
                    <Button onClick={removeCalendar} className="upload-btn bg-danger border border-1"><h5>Usuń</h5></Button>
                    <p style={{color: 'green', fontSize: '90%'}}>{modifyText}</p>
                    <Button onClick={updateCalendar} className="upload-btn bg-secondary border border-1"><h5>Aktualizuj</h5></Button>
                </div>
            } 
            <Modal show={calendarModal} onHide={()=>{setCalendarModal(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Utwórz kalendarz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={createCalendar} className="d-flex justify-content-center align-items-center flex-column">
                        <FormGroup className="d-flex align-items-center flex-row">
                            <Label className="me-3">Nazwa</Label>
                            <Input type="text" placeholder="Nazwa" onChange={title => calendarChange(title.target.value, 'title')}/>
                        </FormGroup>
                        {errors.title && <p style={{color: 'red', fontSize: '90%'}}>{errors.title}</p>}
                        <FormGroup className="d-flex align-items-center flex-row">
                            <Label className="me-3">Opis</Label>
                            <Input type="textarea" placeholder="Opis" onChange={description => calendarChange(description.target.value, 'description')}/>
                        </FormGroup>
                        {errors.description && <p style={{color: 'red', fontSize: '90%'}}>{errors.description}</p>}
                    </Form>
                    {submitError && <p style={{color: 'red', fontSize: '90%'}}>{submitError}</p>}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={createCalendar}>
                    Utwórz
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
import React, { useState } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import DatePicker from 'react-datepicker'

import './css/Creator.css'
import { Modal, Button } from "react-bootstrap";
import { Form, FormGroup, Input, Label } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";

import EventModify from "./EventModify";


export default function Creator(props){

    const [modal, setModal] = useState(false);
    const [modifyModal, setmodifyModal] = useState(false)
    const [calendarModal, setCalendarModal] = useState(false)
    const [event, setEvent] = useState({title: '', description: '', start: '', end: '', id: 0})
    const [modifiedEvent, setmodifiedEvent] = useState({title: '', description: '', start: '', end: '', id: 0})
    const [errors, setErrors] = useState({title: undefined, description: undefined, date: undefined})

    const hasErrors = Object.values(errors).some((error) => error !== undefined)
    const [submitError, setsubmitError] = useState('')
    const [events, setEvents] = useState([])
    const [calendar, setCalendar] = useState('')

    
    function dateClick(info){
        setModal(true)
        setErrors({...errors, title: undefined, description: undefined, date: undefined})
        setsubmitError('')

        const date = new Date(info.date)
        date.setDate(info.date.getDate()+1)
        setEvent(prevEvent => {return {...prevEvent, title: '', description: '', start: info.date, end: date}})
    }

    function eventChange(val, key){
        setEvent(prevForm =>{
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
            else if(key === 'id'){
                return{...prevErrors}
            }
            else{
                const startDate = key === 'start' ? val.getTime() : event.start.getTime()
                const endDate = key === 'end' ? val.getTime() : event.end.getTime()

                return{...prevErrors, 'date': startDate > endDate ? 'Data rozpoczęcia jest po dacie zakończenia' : undefined}
            }
        })
    }

    function handleAddEvent(ev){
        ev.preventDefault()
        if(!hasErrors && event.title !== '' && event.description !== ''){
            setEvent(prevEvent => {return{...prevEvent, id: events.length+1}})
            setEvents(prevArray => [...prevArray, event])
            setsubmitError('')
            setModal(false)
        }
        else{
            setsubmitError('Nie można utworzyć takiego wydarzenia, sprawdź czy pola tytuł i opis nie są puste')
        }
    }
    
    function setEventToModify(eventInfo){
        setmodifyModal(true)
        setmodifiedEvent({title: eventInfo.event.title, description: eventInfo.event.extendedProps.description, start: eventInfo.event.start, end: eventInfo.event.end, id: eventInfo.event.id})
    }

    // TODO rozwala się przy zmianie na więcej niż 1 dniowy event
    function renderEventContent(eventInfo){
        return(
            <div onClick={() => setEventToModify(eventInfo)} className="pe-3 ps-3">
                <div className="d-flex justify-content-between align-items-start flex-row">
                    <h4>{eventInfo.event.title}</h4>
                    <b>{eventInfo.event.start.toLocaleTimeString()} - {eventInfo.event.end.toLocaleTimeString()}</b>
                </div>
                <div>
                    <p className="fs-6">{eventInfo.event.extendedProps.description}</p>
                </div>
            </div>
        )
    }

    function openCalendar(){
        setCalendarModal(true)
        //setEvent({...event, title: '', description: '', start: '', end: '', id: ''})
        setErrors({...errors, title: undefined, description: undefined, date: undefined})
        setsubmitError('')
    }

    function createCalendar(ev){
        ev.preventDefault()
        if(!hasErrors && event.title !== '' && event.description !== ''){
            setsubmitError('')
        }
        else{
            setsubmitError('Nie można utworzyć takiego wydarzenia, sprawdź czy pola tytuł i opis nie są puste')
        }
    }
    

    return(
        <>
            <div>
                <FullCalendar
                    plugins={[ dayGridPlugin, interactionPlugin ]}
                    initialView="dayGridMonth"
                    height={800}
                    dateClick={dateClick}
                    headerToolbar={{
                        start: 'title', 
                        center: '',
                        end: 'today prev,next' 
                        }}
                    eventBackgroundColor="#ffffff"
                    eventDisplay="auto"
                    events={events}
                    eventContent={renderEventContent}
                    dayMaxEvents={3}
                />
                <div style={{height: '10vh'}} className="d-flex justify-content-end align-items-center pe-4">
                    <Button onClick={openCalendar} className="upload-btn bg-secondary border border-1"><h5>Utwórz</h5></Button>    
                </div>
            </div>

            <Modal show={modal} onHide={()=>{setModal(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Dodaj wydarzenie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddEvent} className="d-flex justify-content-center align-items-center flex-column">
                        <FormGroup className="d-flex align-items-center flex-row">
                            <Label className="me-3">Nazwa</Label>
                            <Input type="text" placeholder="Nazwa" onChange={title => eventChange(title.target.value, 'title')}/>
                        </FormGroup>
                        {errors.title && <p style={{color: 'red', fontSize: '90%'}}>{errors.title}</p>}
                        <FormGroup className="d-flex align-items-center flex-row">
                            <Label className="me-3">Opis</Label>
                            <Input type="textarea" placeholder="Opis" onChange={description => eventChange(description.target.value, 'description')}/>
                        </FormGroup>
                        {errors.description && <p style={{color: 'red', fontSize: '90%'}}>{errors.description}</p>}
                        <FormGroup className="d-flex align-items-center flex-row">
                            <Label className="me-3">Data rozpoczęcia</Label>
                            <DatePicker
                                selected={event.start}
                                onChange={date => eventChange(date, 'start')}
                                showTimeSelect
                                dateFormat="MMMM d, yyyy h:mm aa"
                            />
                        </FormGroup>
                        <FormGroup className="d-flex align-items-center flex-row">
                            <Label className="me-3">Data zakończenia</Label>
                            <DatePicker
                                selected={event.end}
                                onChange={date => eventChange(date, 'end')}
                                showTimeSelect
                                dateFormat="MMMM d, yyyy h:mm aa"
                            />
                        </FormGroup>
                        {errors.date && <p style={{color: 'red', fontSize: '90%'}}>{errors.date}</p>}
                    </Form>
                    {submitError && <p style={{color: 'red', fontSize: '90%'}}>{submitError}</p>}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleAddEvent}>
                    Dodaj
                </Button>
                </Modal.Footer>
            </Modal>

            <EventModify eventInfo={modifiedEvent} events={events} setEvents={setEvents} modal={modifyModal} setModal={setmodifyModal}/>

            <Modal show={calendarModal} onHide={()=>{setCalendarModal(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Utwórz kalendarz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={createCalendar} className="d-flex justify-content-center align-items-center flex-column">
                        <FormGroup className="d-flex align-items-center flex-row">
                            <Label className="me-3">Nazwa</Label>
                            <Input type="text" placeholder="Nazwa" onChange={title => eventChange(title.target.value, 'title')}/>
                        </FormGroup>
                        {errors.title && <p style={{color: 'red', fontSize: '90%'}}>{errors.title}</p>}
                        <FormGroup className="d-flex align-items-center flex-row">
                            <Label className="me-3">Opis</Label>
                            <Input type="textarea" placeholder="Opis" onChange={description => eventChange(description.target.value, 'description')}/>
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
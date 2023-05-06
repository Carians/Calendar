import React, { useState } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import DatePicker from 'react-datepicker'

import './css/Creator.css'
import { Modal, Button } from "react-bootstrap";
import { Form, FormGroup, Input, Label } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";


export default function Creator(){

    const [modal, setModal] = useState(false);
    const [event, setEvent] = useState({title: '', description: '', start: '', end: ''})
    const [errors, setErrors] = useState({title: undefined, description: undefined, date: undefined})

    const hasErrors = Object.values(errors).some((error) => error !== undefined)
    const [submitError, setsubmitError] = useState('')
    const [events, setEvents] = useState([])

    
    function dateClick(info){
        setModal(true)

        const date = new Date(info.date)
        date.setDate(info.date.getDate()+1)
        setEvent({title: '', description: '', start: info.date, end: date})
    }

    function eventChange(val, key){
        setEvent(prevForm =>{
            return{
                ...prevForm,
                [key]: val
            }
        })
        setErrors(prevErrors =>{
            if(key === 'title'){
                return{...prevErrors, 'title': val.length > 0 && val.length < 5 ? 'Tytuł jest zbyt krótki' : undefined}
            }
            else if(key === 'description'){
                return{...prevErrors, 'description': val.length > 100 ? 'Opis jest za długi' : undefined}
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
            setEvents(prevArray => [...prevArray, event])
            setsubmitError('')
        }
        else{
            setsubmitError('Nie można utworzyć takiego wydarzenia, sprawdź czy pola tytuł i opis nie są puste')
        }
    }

    function renderEventContent(eventInfo){
        return(
            <div className="border">
                <div className="d-flex justify-content-between align-items-start flex-row">
                    <h4>{eventInfo.event.title}</h4>
                    <b>{eventInfo.timeText}</b>
                </div>
                <div>
                    <p className="fs-6">{eventInfo.event.extendedProps.description}</p>
                </div>
            </div>
        )
    }
    

    return(
        <>
            <div className="d-flex justify-content-start align-items-center flex-column ps-5">
                <Form>
                    <Input type="text"/>
                </Form>
            </div>  
            <div>
                <FullCalendar
                    plugins={[ dayGridPlugin, interactionPlugin ]}
                    initialView="dayGridMonth"
                    height={800}
                    dateClick={dateClick}
                    themeSystem="bootstrap5"
                    headerToolbar={{
                        start: 'title', 
                        center: '',
                        end: 'today prev,next' 
                        }}
                    eventBackgroundColor="#ff0000"
                    events={events}
                    eventContent={renderEventContent}
                    />
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

        </>
    )
}
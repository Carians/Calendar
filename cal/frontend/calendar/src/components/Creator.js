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
    const [events, setEvents] = useState([])

    
    function dateClick(info){
        setModal(true)
        console.log(event)

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
    }

    function handleAddEvent(ev){
        setEvents(prevArray => [...prevArray, event])
        console.log(events)
        ev.preventDefault()
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
                    themeSystem="jquery-ui"
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
                        <FormGroup className="d-flex align-items-center flex-row">
                            <Label className="me-3">Opis</Label>
                            <Input type="textarea" placeholder="Opis" onChange={description => eventChange(description.target.value, 'description')}/>
                        </FormGroup>
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
                    </Form>
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
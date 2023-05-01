import React, { useState } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"

import './css/Creator.css'
// TODO zamienić na reactstrap
import { Modal, Button } from "react-bootstrap";
import { Form, FormGroup, Input, FormText  } from "reactstrap";


export default function Creator(){

    const [modal, setModal] = useState(false);
    // TODO zrobić handleAddEvent aby dane dodawały się do stanu event, oraz sprawdzić react-datepicker do wyboru daty w modalu
    const [event, setEvent] = useState({})
    
    function dateClick(info){
        setModal(prevVal => !prevVal)
    }

    function handleAddEvent(event){
        event.preventDefault()
    }
    

    return(
        <>
            <div className="d-flex justify-content-start align-items-center flex-column ps-5">
                <form>
                    <input type="text"/>
                </form>
            </div>  
            <div className="fc-button">
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
                    events={[
                        {
                            title: "Event 1",
                            start: "2023-05-01",
                            end: "2023-05-03",
                        },
                        {
                            title: "Event 2",
                            start: "2023-05-05",
                            end: "2023-05-07",
                            color: "blue",
                        },
                        {
                        title: 'Moje wydarzenie',
                        start: '2023-05-10T10:30:00',
                        end: '2023-05-10T12:00:00'
                        },
                        {
                        title: 'Moje wydarzenie2',
                        start: '2023-05-10T19:30:00',
                        end: '2023-05-10T20:00:00'
                        },
                    ]}
                    />
            </div>

            <Modal show={modal} onHide={dateClick}>
                <Modal.Header closeButton>
                    <Modal.Title>Dodaj wydarzenie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddEvent} className="d-flex justify-content-center align-items-center flex-column">
                        <FormGroup>
                            <Input type="text" placeholder="Nazwa"/>
                        </FormGroup>
                        <FormGroup>
                            <Input type="textarea" placeholder="Opis"/>
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" placeholder="Data rozpoczęcia"/>
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" placeholder="Data zakończenia"/>
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
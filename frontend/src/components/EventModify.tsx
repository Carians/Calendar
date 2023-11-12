import { useState, useEffect } from "react";
import DatePicker from 'react-datepicker'

import './css/Creator.css'
import { Modal, Button } from "react-bootstrap";
import { Form, FormGroup, Input, Label } from "reactstrap";

import { EventType } from "../types/eventType";
import { ModifyPropsType } from "../types/propsTypes";


export default function EventModify(props: ModifyPropsType){

    const [event, setEvent] = useState<EventType>({title: '', description: '', start: new Date(), end: new Date(), id: 0})
    const [errors, setErrors] = useState({title: undefined, description: undefined, date: undefined})
    const hasErrors = Object.values(errors).some((error) => error !== undefined)
    const [submitError, setsubmitError] = useState('')
    const [modifyText, setModifyText] = useState('')
    

    useEffect(()=>{
        setEvent(prevEvent => {return{...prevEvent ,title: props.eventInfo.title, description: props.eventInfo.description, start: props.eventInfo.start, end: props.eventInfo.end, id: props.eventInfo.id}})
        setErrors(prev => {return{...prev, title: undefined, description: undefined, date: undefined}})
        setsubmitError('')
    }, [props.modal])


    function addModifiedEvent(ev: React.MouseEvent<HTMLButtonElement>){
        ev.preventDefault()

        if(!hasErrors && event.title !== '' && event.description !== ''){
            props.setEvents(prevEvents =>{
                return prevEvents.map(e =>{
                    return e.id === event.id ? event : e
                })
            })
            setsubmitError('')
            setModifyText('Pomyślnie zaktualizowano')
            setTimeout(()=>{
                setModifyText('')
            }, 60000)
        }
        else{
            setsubmitError('Nie można utworzyć takiego wydarzenia, sprawdź czy pola tytuł i opis nie są puste')
            setModifyText('')
        }
    }

    function removeEvent(){
        props.setEvents(prevEvents =>{
            return prevEvents.filter(e => {
                if(e.id !== event.id){
                    return e
                }
            })
        })
        props.setModal(false)
    }


    return(
        <>
            <Modal show={props.modal} onHide={()=>{props.setModal(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Wydarzenie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="d-flex justify-content-center align-items-center flex-column">
                        <FormGroup className="d-flex align-items-center flex-row">
                            <Label className="me-3">Nazwa</Label>
                            <Input type="text" placeholder="Nazwa" onChange={title => props.eventChange(title.target.value, 'title')} value={event.title}/>
                        </FormGroup>
                        {errors.title && <p style={{color: 'red', fontSize: '90%'}}>{errors.title}</p>}
                        <FormGroup className="d-flex align-items-center flex-row">
                            <Label className="me-3">Opis</Label>
                            <Input type="textarea" placeholder="Opis" onChange={description => props.eventChange(description.target.value, 'description')} value={event.description}/>
                        </FormGroup>
                        {errors.description && <p style={{color: 'red', fontSize: '90%'}}>{errors.description}</p>}
                        <FormGroup className="d-flex align-items-center flex-row">
                            <Label className="me-3">Data rozpoczęcia</Label>
                            <DatePicker
                                selected={event.start}
                                onChange={date => props.eventChange(date, 'start')}
                                showTimeSelect
                                dateFormat="MMMM d, yyyy h:mm aa"
                            />
                        </FormGroup>
                        <FormGroup className="d-flex align-items-center flex-row">
                            <Label className="me-3">Data zakończenia</Label>
                            <DatePicker
                                selected={event.end}
                                onChange={date => props.eventChange(date, 'end')}
                                showTimeSelect
                                dateFormat="MMMM d, yyyy h:mm aa"
                            />
                        </FormGroup>
                        {errors.date && <p style={{color: 'red', fontSize: '90%'}}>{errors.date}</p>}
                    </Form>
                    <div className="d-flex justify-content-center">
                        {submitError && <p style={{color: 'red', fontSize: '90%'}}>{submitError}</p>}
                        <p style={{color: 'green', fontSize: '90%'}}>{modifyText}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex justify-content-between w-100">
                        <Button variant="danger" onClick={removeEvent}>Usuń</Button>
                        <Button variant="secondary" onClick={addModifiedEvent}>Zaktualizuj</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}
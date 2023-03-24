import React from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import './css/Cards.css'
import { Link } from "react-router-dom";

import { useEffect } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from "reactstrap";
import { CloudArrowUpFill } from 'react-bootstrap-icons';


export default function Cards(){
    useEffect(()=>{
        AOS.init();
    }, [])

    return(
        <div className="cards d-flex justify-content-evenly align-items-center">
            <Card
                data-aos="fade-left"
                className="border-0"
                style={{
                    width: '20%',
                    height: '70%',
                    backgroundColor: '#F6F6F6',
                }}
                >
                <div style={{width: '100%', height: '10%', backgroundColor: '#303034'}}></div>
                <img
                    style={{
                        width: '90%',
                        marginLeft: '5%',
                        marginTop: '-10%',
                        borderRadius: '10px',
                    }}
                    alt="Sample"
                    src={process.env.PUBLIC_URL + '/images/calendar2.jpg'}
                />
                <CardBody>
                    <CardTitle tag="h5">
                        <p>Zaplanuj swój czas</p>
                    </CardTitle>
                    <CardText>
                        <p>Dzięki Calendar jesteś w stanie zorganizować swój czas w zaledwie kilka kliknięć</p>
                    </CardText>
                </CardBody>
            </Card>

            <Card
                data-aos="fade-down"
                style={{
                    width: '15%',
                    height: '70%',
                    backgroundColor: '#F6F6F6',
                }}>
                <CardBody
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}>
                    <CardTitle tag="h5">
                        <p>Zaimportuj kalendarz</p>
                    </CardTitle>
                    <CardText>
                    Some quick example text to build on the card title and make up the bulk of the card‘s content.
                    </CardText>
                    <Button
                        className="upload-btn"
                        style={{
                            borderRadius: '10px',
                            backgroundColor: '#A59586',
                            width: '30%',
                            marginTop: '5%',
                        }}>
                        <Link to='login' className="linked">
                            <CloudArrowUpFill size={30} />
                        </Link>
                    </Button>
                </CardBody>
            </Card>
            
            <Card
                data-aos="fade-right"
                style={{
                    width: '20%',
                    height: '70%',
                    backgroundColor: '#F6F6F6',
                }}
                >
                <img
                    src={process.env.PUBLIC_URL + '/static/images/calendar1.jpg'}
                    alt="Sample"
                />
                <CardBody>
                    <CardText>
                        <p>Zapomnij o papierowym kalendarzu na ścianie, mając go na wyciągnięcie ręki w domu, pracy, czy w szkole</p>
                    </CardText>
                </CardBody>
            </Card>

        </div>
    )
}
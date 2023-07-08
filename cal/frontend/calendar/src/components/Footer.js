import React from "react";
import './css/Footer.css'


export default function Footer(props){
    return(
        <footer style={{backgroundColor: props.theme.background}} className="d-flex justify-content-center align-items-center">
            <p>Calendar by Michał Pilarski and Krzysztof Kasperek</p>
        </footer>
    )
}
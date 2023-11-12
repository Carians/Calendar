import './css/Footer.css'
import { ThemeContextType } from "../types/context/themeTypes";

export default function Footer(props: ThemeContextType){
    return(
        <footer style={{backgroundColor: props.theme.background}} className="d-flex justify-content-center align-items-center">
            <p className="footer-font-size">Calendar by Michał Pilarski and Krzysztof Kasperek</p>
        </footer>
    )
}
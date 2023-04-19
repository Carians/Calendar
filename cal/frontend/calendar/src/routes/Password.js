import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {FormGroup} from 'reactstrap';


function Password(props) {

  // Password strength
  const [strengthColors, setstrengthColors] = useState({low: false, medium: false, medium2: false, high: false, high2: false})
  useEffect(()=>{
    const strengthRegex = {
      low: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/, 
      medium: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      medium2: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{10,}$/,
      high: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?~_+-=/|]).{10,}$/,
      high2: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?~_+-=/|]).{12,}$/
    }

    for(const [key, val] of Object.entries(strengthRegex)){
      if(val.test(props.form.password)){
        setstrengthColors(prev=> {
          return{
            ...prev,
            [key]: true
          }
        })
      }
      else{
        setstrengthColors(prev=> {
          return{
            ...prev,
            [key]: false
          }
        })
      }
    }

  }, [props.form.password, props.form.password2])


  return (
    <>
        {(props.form.password || props.form.password2) && <FormGroup className='d-flex flex-row'>
            <p className='me-2'>Siła hasła:</p>
            <div style={{backgroundColor: 'rgb(179, 0, 0)', width: '7.5%', height: '2vh', border: '0.2px solid black', borderRadius: '5px'}} className='me-1'></div>
            <div style={{backgroundColor: strengthColors.low ? 'rgb(179, 0, 0)' : '', width: '7.5%', height: '2vh', border: '0.2px solid black', borderRadius: '5px'}} className='me-1' id='low'></div>
            <div style={{backgroundColor: strengthColors.medium ? 'rgb(237, 220, 28)' : '', width: '7.5%', height: '2vh', border: '0.2px solid black', borderRadius: '5px'}} className='me-1' id='medium'></div>
            <div style={{backgroundColor: strengthColors.medium2 ? 'rgb(237, 220, 28)' : '', width: '7.5%', height: '2vh', border: '0.2px solid black', borderRadius: '5px'}} className='me-1' id='medium2'></div>
            <div style={{backgroundColor: strengthColors.high ? 'rgb(13, 224, 28)' : '', width: '7.5%', height: '2vh', border: '0.2px solid black', borderRadius: '5px'}} className='me-1' id='high'></div>
            <div style={{backgroundColor: strengthColors.high2 ? 'rgb(13, 224, 28)' : '', width: '7.5%', height: '2vh', border: '0.2px solid black', borderRadius: '5px'}} className='me-1' id='high2'></div>
        </FormGroup>}

    </>
  );
}

export default Password;

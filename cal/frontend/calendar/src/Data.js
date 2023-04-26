import { getCookie } from "./components/functions/cookie"

const getUserData = async () =>{

    const url = window.location.origin + '/api/user/'
    const csrf = getCookie('csrftoken')
    const token = window.sessionStorage.getItem('sessionid')

    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Accept': 'application/json, application/x-www-form-urlencoded, multipart/form-data',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrf
            },
    })

    const data = await response.json();
    return data;
}

const registerUser = async (form) =>{
    const url = window.location.origin + '/api/register/'
    const csrf = getCookie('csrftoken')


    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, application/x-www-form-urlencoded, multipart/form-data',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf
      },
      body: JSON.stringify({
        'username': form.username,
        'email': form.email,
        'password': form.password,
        'first_name': form.first_name,
        'last_name': form.last_name
      })
    })
    
    const data = await response.json()
    return data
}

const loginUser = async(form) => {
    const url = window.location.origin + '/api/auth/'
    const csrf = getCookie('csrftoken')

    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, application/x-www-form-urlencoded, multipart/form-data',
          'Content-Type': 'application/json',
          'X-CSRFToken': csrf
        },
        body: JSON.stringify({
          'username': form.username,
          'password': form.password,
        })
      })
      
      const data = await response.json()
      if(data.token !== undefined){
        window.sessionStorage.setItem('sessionid', data.token)
      }
      return data
}

const logOutUser = async() =>{
    const url = window.location.origin + '/api/logout/'
    const csrf = getCookie('csrftoken')
    const token = window.sessionStorage.getItem('sessionid')

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json, application/x-www-form-urlencoded, multipart/form-data',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf
      }
    })
}

export {getUserData, registerUser, loginUser, logOutUser}
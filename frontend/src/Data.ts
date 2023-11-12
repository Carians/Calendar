import { getCookie } from "./components/functions/cookie"

const getUserDataAPI = async () =>{

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

const registerUserAPI = async (form: any) =>{
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

const loginUserAPI = async(form: any) => {
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

const logOutUserAPI = async() =>{
    const url = window.location.origin + '/api/logout/'
    const csrf = getCookie('csrftoken')
    const token = window.sessionStorage.getItem('sessionid')

    await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json, application/x-www-form-urlencoded, multipart/form-data',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf
      }
    })
}

const registerEventAPI = async (form: any) =>{
  const url = window.location.origin + '/api/events/'
  const csrf = getCookie('csrftoken')
  const token = window.sessionStorage.getItem('sessionid')

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/json, application/x-www-form-urlencoded, multipart/form-data',
      'Content-Type': 'application/json',
      'X-CSRFToken': csrf
    },
    body: JSON.stringify({
      'name': form.title,
      'description': form.description,
      'start_time': form.start,
      'end_time': form.end,
    })
  })
  
  const data = await response.json()
  return data
}

const getEventsAPI = async () =>{
  const url = window.location.origin + '/api/events/'
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

const getEventAPI = async (id: number) =>{
  const url = window.location.origin + `/api/events/${id}`
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

const registerCalendarAPI = async (calendar: any, events: any) =>{
  const url = window.location.origin + '/api/calendars/'
  const csrf = getCookie('csrftoken')
  const token = window.sessionStorage.getItem('sessionid')

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/json, application/x-www-form-urlencoded, multipart/form-data',
      'Content-Type': 'application/json',
      'X-CSRFToken': csrf
    },
    body: JSON.stringify({
      'name': calendar.title,
      'description': calendar.description,
      'events': events,
    })
  })
  
  const data = await response.json()
  return data
}

const getCalendarsAPI = async () =>{
  const url = window.location.origin + '/api/calendars/'
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
  
  const data = await response.json()
  return data
}

const getCalendarAPI = async (id: number) =>{
  const url = window.location.origin + `/api/calendars/${id}`
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
  
  const data = await response.json()
  return data
}

const deleteCalendarAPI = async (id: number) =>{
  const url = window.location.origin + `/api/calendars/${id}/delete`
  const csrf = getCookie('csrftoken')
  const token = window.sessionStorage.getItem('sessionid')

  await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/json, application/x-www-form-urlencoded, multipart/form-data',
      'Content-Type': 'application/json',
      'X-CSRFToken': csrf
    }
  })
}

const deleteEventAPI = async (id: number) =>{
  const url = window.location.origin + `/api/events/${id}/delete`
  const csrf = getCookie('csrftoken')
  const token = window.sessionStorage.getItem('sessionid')

  await fetch(url,{
      method: 'DELETE',
      headers: {
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json, application/x-www-form-urlencoded, multipart/form-data',
          'Content-Type': 'application/json',
          'X-CSRFToken': csrf
          },
  })
}

const updateEventAPI = async (form: any) =>{
  const url = window.location.origin + `/api/events/${form.id}/update`
  const csrf = getCookie('csrftoken')
  const token = window.sessionStorage.getItem('sessionid')

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/json, application/x-www-form-urlencoded, multipart/form-data',
      'Content-Type': 'application/json',
      'X-CSRFToken': csrf
    },
    body: JSON.stringify({
      'name': form.title,
      'description': form.description,
      'start_time': form.start,
      'end_time': form.end,
    })
  })
  
  const data = await response.json()
  return data
}

const updateCalendarAPI = async (calendar: any, events: any) =>{
  const url = window.location.origin + `/api/calendars/${calendar.id}/update`
  const csrf = getCookie('csrftoken')
  const token = window.sessionStorage.getItem('sessionid')

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/json, application/x-www-form-urlencoded, multipart/form-data',
      'Content-Type': 'application/json',
      'X-CSRFToken': csrf
    },
    body: JSON.stringify({
      'name': calendar.name,
      'description': calendar.description,
      'events': events,
    })
  })
  
  const data = await response.json()
  return data
}


export {getUserDataAPI, registerUserAPI, loginUserAPI, logOutUserAPI, registerEventAPI, registerCalendarAPI, getEventsAPI, getEventAPI, getCalendarsAPI, getCalendarAPI, deleteCalendarAPI, deleteEventAPI, 
  updateEventAPI, updateCalendarAPI}
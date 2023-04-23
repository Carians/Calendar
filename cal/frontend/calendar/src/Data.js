import React, { useState, useEffect } from "react";
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

export {getUserData}
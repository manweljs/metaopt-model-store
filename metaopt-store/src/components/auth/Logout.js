import React from 'react'
import cookie from 'react-cookies'
import { useResetRecoilState } from 'recoil'
import { authenticated } from '../../store'
function Logout() {
    const resetAuth = useResetRecoilState(authenticated)

    localStorage.removeItem("accessToken")
    cookie.remove("accessToken")
    cookie.remove('role')
    cookie.remove('userName')
    cookie.remove('_eat')

    resetAuth()
    window.location.href = "/"
    return (<></>)
}


export default Logout
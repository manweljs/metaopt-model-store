import { message } from "antd"
import { getToken } from "functions"
import { HOST } from "variables"



export const AccountLogin = async (data: any) => {
    const endpoint = HOST + "/api/Account/Login"
    const method = "POST"
    const headers = {
        'Content-Type': 'application/json'
    }

    const body = JSON.stringify(data)

    const response = await fetch(endpoint, { method, headers, body })
    if (response.status === 500) {
        message.error(response.statusText)
        return
    }

    return response.json()

}


export const AccountRegister = async (data: any) => {
    const endpoint = HOST + "/api/Account/Register"
    const method = "POST"
    const headers = {
        'Content-Type': 'application/json'
    }

    const body = JSON.stringify(data)
    const response = await fetch(endpoint, { method, headers, body })
        .then(r => r.json()).then((r) => { return r })

    return response


}


export const ResetPassword = async (data: any) => {
    const endpoint = HOST + `/api/Account/SendPasswordResetCode`
    const method = "POST"
    const response = await fetch(endpoint, { method, body: data })
    if (response.status === 500) {
        message.error(response.statusText)
        return
    }
    return response.json()
}

export async function GetUser() {
    const endpoint = HOST + '/api/Account/Profile'
    const method = "GET"
    const headers = { "Authorization": `Bearer ${getToken()}` }
    const response = await fetch(endpoint, { method, headers })
        .then(r => r.json()).then(r => { return r }).catch((err) => { console.error(err) })

    return response
}

export const GetAllModel = async () => {
    const endpoint = HOST + `/api/Partner/Packages`
    console.log('HOST', HOST)

    const method = "GET"
    const headers = {
        'Content-Type': 'application/json',
        // "X-MetaOpt-ApiKey": CLIENT_TOKEN
    }

    const response = await fetch(endpoint, { method, headers })
    if (response.status === 200) {
        return response.json()
    }

    message.error(response.statusText)
}

export const GetModelDetail = async (modelId: string) => {
    const endpoint = HOST + `/api/Package/Details?Id=${modelId}`

    const method = "GET"
    const headers = {
        'Content-Type': 'application/json',
        // "X-MetaOpt-ApiKey": CLIENT_TOKEN
    }

    const response = await fetch(endpoint, { method, headers })
    if (response.status === 200) {
        return response.json()
    }

    message.error(response.statusText)
}

export const PurchaseModel = async (data: any) => {
    const endpoint = HOST + `/api/Package/Purchase`
    const method = "POST"
    const headers = {
        'Content-Type': 'application/json',
        // "X-MetaOpt-ApiKey": CLIENT_TOKEN
    }
    const response = await fetch(endpoint, { method, headers, body: data })
        .then(r => r.json()).then(r => { return r })
        .catch(err => console.log(err))

    return response
}
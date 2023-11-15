import { message } from "antd"
import { HOST } from "../variables"

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
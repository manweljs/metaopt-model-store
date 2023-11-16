import React, { useEffect, useState } from 'react'
import { getProviders } from './AuthAPI'

import { GoogleOutlined, GithubFilled } from "@ant-design/icons"
import { Button } from 'antd'

import "./auth.css"
export default function ExternalAuth() {

    const [providers, setProfiders] = useState([])

    const handleGetProviders = async () => {
        const response = await getProviders()
        console.log('response', response)
    }

    useEffect(() => {
        handleGetProviders()
    }, [])

    return (
        <div className="external-auth">
            <AuthByGoogle />
            <AuthByGithub />

        </div>
    )
}


const AuthByGoogle = (props) => {

    const [loading, setLoading] = useState(false)
    const handleLogin = async () => {

    }
    return (
        <Button
            className='item'
            onClick={handleLogin}
            loading={loading}
        >
            <GoogleOutlined /> Login with Google
        </Button>

    )
}


const AuthByGithub = (props) => {

    const [loading, setLoading] = useState(false)
    const handleLogin = async () => {

    }
    return (
        <Button
            className='item'
            onClick={handleLogin}
            loading={loading}
        >
            <GithubFilled /> Login with Github
        </Button>

    )
}
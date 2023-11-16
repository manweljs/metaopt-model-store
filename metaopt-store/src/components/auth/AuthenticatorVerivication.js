import { Button, Input, message } from 'antd'
import React, { useState } from 'react'

export default function AuthenticatorVerivication(props) {

    const { email, password, handleLogin } = props;

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        emailAddress: email, // Retrieve from step 1
        password: password, // Retrieve from step 1
        twoFactorVerificationCode: "",   // This is 2FA code that user enters
        twoFactorRememberClientToken: ""  // Can ignore for now
    })

    const handleUpdate = ({ name, value }) => {
        setData(prev => ({
            ...prev, [name]: value
        }))
    }

    const handleSubmit = async () => {
        setLoading(true)
        const response = await handleLogin(data)

        console.log(response)
        if (!response.success) {
            message.error(response.error.message)
        }
        setLoading(false)
    }

    const handleKeyDown = (e) => {
        if (e.keyCode == 13) {
            handleSubmit()
        }
    }

    return (
        <div className="authenticator_verification">
            <div className="title is-4 mb-1">Varify Security Code</div>

            <p className='mb-4'>Please input number display on your Authenticator</p>

            <Input
                onKeyDown={handleKeyDown}
                value={data.twoFactorVerificationCode}
                onChange={e => handleUpdate({ name: "twoFactorVerificationCode", value: e.target.value })}
                className='mb-3'
            />
            <Button loading={loading} onClick={handleSubmit} type="primary">Login</Button>
        </div>
    )
}

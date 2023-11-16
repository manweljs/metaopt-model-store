import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { APPTerms, backendHOST } from '../../App';

import logoWhite from '../../img/logo-white.svg'
import logo from '../../img/logo.svg'
import PasswordStrengthBar from 'react-password-strength-bar';
import { theme } from '../../store';
import './auth.css'
import { register } from './AuthAPI';
import { Button, Checkbox, Input, Radio } from 'antd';

const initialRegisterData = {
    accountType: "customer",
    firstName: "",
    lastName: "",
    emailAddress: "",
    organization: "",
    password: "",
    password2: "",

}



export default function Register(props) {
    const navigate = useNavigate()
    const currentTheme = useRecoilValue(theme)
    const [loading, setloading] = useState(false)
    const [errors, setErrors] = useState([])
    const [registerData, setRegisterData] = useState(initialRegisterData)
    const [knowledge, setKnowledge] = useState(false)

    const handleRegister = async () => {
        const cek = validateRegisterData(registerData)
        // console.log(cek)
        setErrors(cek)
        if (!cek.length) {
            setloading(true)
            const response = await register(registerData)
            console.log(response);
            if (response.success) {
                return navigate("/login")
            } else {
                setErrors({ message: response.error.message })
            }
        }
        setloading(false)

    }

    const handleUpdate = async ({ name, value }) => {
        // console.log(name, value)
        setRegisterData(prev => ({
            ...prev,
            [name]: value
        }))
    }


    return (
        <div className='auth'>
            <section className="hero is-fullheight">
                <div className="auth-img"></div>
                <div className="container">
                    <div className="form-holder">

                        <Link to={'/'}>
                            <div className="auth-logo">
                                {currentTheme.currentTheme === "dark" ?
                                    <img src={logoWhite} alt="" /> :
                                    <img src={logo} alt="" />
                                }
                            </div>
                        </Link>

                        {/* FORM  */}
                        <form className='register-form'>

                            {errors.message &&
                                <div className="message-error mb-3">{errors.message}</div>
                            }
                            <div className="form-header mb-5">
                                <h3>Sign Up</h3>
                                <p>Please fill this form below</p>
                            </div>
                            {/* <div className="field">
                                <div className="label">Register as</div>
                                <Radio.Group value={registerData.accountType}
                                    onChange={e => handleUpdate({ name: "accountType", value: e.target.value })}
                                >
                                    <Radio.Button value={"customer"}>{APPTerms.customer}</Radio.Button>
                                    <Radio.Button value={"solver"}>Solver</Radio.Button>
                                </Radio.Group>
                                <div className="guide" style={{ color: "var(--primary)", fontSize: ".95em" }}>
                                    {registerData.accountType === "customer" ?
                                        "I looking for AI-powered solutions to my problem." : "I'm here to offer expert solutions."
                                    }
                                </div>
                            </div> */}

                            <div className="fields flex-row">

                                <div className="field pr-1">
                                    <label className="label">Firstname</label>
                                    <Input
                                        value={registerData.firstName}
                                        name='firstName'
                                        onChange={e => handleUpdate({ name: e.target.name, value: e.target.value })}
                                        autoComplete='off'
                                    />
                                    {errors && errors.firstName &&
                                        <div className="error">{errors.firstName}</div>
                                    }

                                </div>
                                <div className="field">
                                    <label className="label">Lastname</label>
                                    <Input
                                        value={registerData.lastName}
                                        name='lastName'
                                        onChange={e => handleUpdate({ name: e.target.name, value: e.target.value })}
                                        autoComplete='off'
                                    />
                                    {errors && errors.lastName &&
                                        <div className="error">{errors.lastName}</div>
                                    }
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Email</label>
                                <Input
                                    type="email"
                                    name='emailAddress'
                                    placeholder="Enter your email"
                                    onChange={e => handleUpdate({ name: e.target.name, value: e.target.value })}
                                />
                                {errors && errors.emailAddress &&
                                    <div className="error">{errors.emailAddress}</div>
                                }
                            </div>

                            <div className="field">
                                <label className="label">Organization</label>
                                <Input
                                    value={registerData.organization}
                                    name='organization'
                                    onChange={e => handleUpdate({ name: e.target.name, value: e.target.value })}
                                />
                                {errors && errors.organization &&
                                    <div className="error">{errors.organization}</div>
                                }
                            </div>

                            <div className="field password-field">
                                <label className="label">Password</label>

                                <Input.Password
                                    name='password'
                                    autoComplete='off'
                                    autoCorrect='false'
                                    onChange={e => handleUpdate({ name: e.target.name, value: e.target.value })}
                                />
                                {
                                    registerData.password &&
                                    <PasswordStrengthBar password={registerData.password} />
                                }
                                {errors && errors.password &&
                                    <div className="error">{errors.password}</div>
                                }
                            </div>

                            <div className="field">
                                <label className="label">Re-type your Password</label>
                                <Input.Password
                                    name='password2'
                                    onChange={e => handleUpdate({ name: e.target.name, value: e.target.value })}
                                />
                                {errors && errors.password2 &&
                                    <div className="error">{errors.password2}</div>
                                }
                            </div>

                            <div className="field">

                                <Checkbox
                                    onChange={e => setKnowledge(e.target.checked)}
                                >I agree to the <Link to={"/term-of-service"} target='_blank' >Terms of Service</Link>,
                                    <Link to={"/cookie-policy"} target='_blank'> Cookie Policy </Link>  and
                                    <Link to={"/privacy-policy"} target='_blank'> Privacy Policy</Link>.</Checkbox>
                            </div>

                            <Button type='primary'
                                className='mt-3'
                                loading={loading}
                                disabled={!knowledge}
                                onClick={handleRegister}
                            >Sign Up</Button>
                            <p className='form-footer'>Already have an account?
                                <Link to={'/login'}><span className='has-text-primary ml-2'>Login</span></Link></p>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}


function validateRegisterData(data) {
    const errors = {};
    const passlen = 8

    if (!data.firstName) {
        errors.firstName = "First Name is required";
    }

    if (!data.lastName) {
        errors.lastName = "Last Name is required";
    }

    if (!data.emailAddress) {
        errors.emailAddress = "Email Address is required";
    } else if (!validateEmail(data.emailAddress)) {
        errors.emailAddress = "Invalid email format";
    }

    if (!data.organization) {
        errors.organization = "Organization is required";
    }

    if (!data.password) {
        errors.password = "Password is required";
    } else if (data.password.length < passlen) {
        errors.password = `Password must be at least ${passlen} characters long`;
    }

    if (!data.password2) {
        errors.password2 = "Confirm Password is required";
    } else if (data.password !== data.password2) {
        errors.password2 = "Passwords do not match";
    }

    return errors;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
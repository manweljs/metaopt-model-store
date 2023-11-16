import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import cookie from 'react-cookies'
import './auth.css'
import emailIcon from '../../img/email.png'
import laptop from '../../img/laptop.png'
import { MailOutlined, LockOutlined } from "@ant-design/icons"
import { Button, Input, message } from 'antd';
import AuthenticatorVerivication from './AuthenticatorVerivication';
import { AccountLogin, GetUser, ResetPassword } from '../../api';
import { getToken, isPhone, isTablet } from '../../functions';
import { FormForgotPasswordProps } from 'interfaces';
import { useUserContext } from 'context/UserContext';

const logoWhite = 'https://meta-opt.s3.ap-southeast-1.amazonaws.com/files/logo-white.svg'
const logo = "https://meta-opt.s3.ap-southeast-1.amazonaws.com/files/logo.svg"


// require('dotenv').config()
export default function Login() {
    const page = "login"
    const { setPage, setWithNavbar, theme } = useUserContext()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loginError, setLoginError] = useState<any | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [displayAuthenticatorVerification, setDisplayAuthenTicatorVerification] = useState<boolean>(false)

    const [forgotPassword, setForgotPassword] = useState<boolean>(false)

    const [searhParams, setSearchParams] = useSearchParams()
    const next = searhParams.get("next")

    const messageError = document.querySelector(".message-error")
    const navigate = useNavigate();

    useEffect(() => {
        setPage(page)
        setWithNavbar(false)
        const accessToken = getToken()
        if (accessToken && !next) {
            navigate('/profile')
        }

    }, []);


    const handleLogin = async (loginData = null) => {
        setLoading(true)

        const data = {
            emailAddress: email,
            password: password

        }
        const finalData = loginData ? loginData : data

        // console.log(finalData)
        const response = await AccountLogin(finalData)

        if (loginData && !response.success) {
            return response
        }

        if (response.success && response.result.accessToken) {
            const rd = response.result
            console.log(response);
            let xuser = await GetUser()
            // console.log(xuser);
            cookie.save('role', xuser.result.roles[0], {
                maxAge: rd.expireInSeconds, path: "/"
            })

            cookie.save('_eat', rd.encryptedAccessToken, {
                maxAge: rd.expireInSeconds, path: "/"
            })
            // localStorage.setItem("accessToken", rd.accessToken)

            cookie.save('accessToken', rd.accessToken, {
                maxAge: rd.expireInSeconds, path: "/"
            })
            cookie.save('userName', `${xuser.result.firstName} ${xuser.result.lastName}`, {
                maxAge: rd.expireInSeconds, path: "/"
            })
            console.log(next)


            if (next) {
                window.location.href = next
            } else {
                xuser.result.roles[0] === "PlatformHolder" ? navigate('/admin') : navigate('/profile')
            }
        } else if (response.success && response.result.requiresTwoFactorVerification) {
            setDisplayAuthenTicatorVerification(true)
        } else {
            console.log("here")
            if (response.error.details === "Invalid user name or password") {
                setLoading(false)
                setLoginError(
                    <>
                        <p> <strong>Invalid user name or password.</strong></p>
                        <p className=''>If this is the first time accessing this site, then select Sign Up below to register.</p>
                    </>
                )

                return
            }
            setLoginError(response.error.details);
            messageError && messageError.classList.add("show")
        }
        setLoading(false)
        return response
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.keyCode === 13) {
            handleLogin(null)
        }
    }

    if (isPhone()) {
        return (
            <div className="desktop-size-required">
                <a href="/" className="auth-logo">
                    {theme === "dark" ?
                        <img src={logoWhite} alt="" /> :
                        <img src={logo} alt="" />
                    }
                </a>

                <img className="laptop" src={laptop} alt="laptop" />
                <p>Please login from desktop</p>

                <a href='/' className="button is-primary">Back to Home</a>
            </div>

        )

    } else {
        return (
            <div className={isTablet() ? 'auth is-tablet' : 'auth'}>
                <section className="hero is-fullheight">
                    <div className="auth-img"></div>
                    <div className="container">
                        <div className="form-holder">
                            <Link to={'/'}>
                                <div className="auth-logo">
                                    {theme === "dark" ?
                                        <img src={logoWhite} alt="" /> :
                                        <img src={logo} alt="" />
                                    }
                                </div>
                            </Link>

                            {displayAuthenticatorVerification
                                && <AuthenticatorVerivication
                                    email={email}
                                    password={password}
                                    handleLogin={handleLogin}
                                />
                            }

                            {loginError &&
                                <div className="message-error mb-3 show">{loginError}</div>
                            }

                            {!displayAuthenticatorVerification &&

                                <>
                                    {!forgotPassword &&
                                        <form className='login-form show' onKeyDown={e => handleKeyDown(e)}>
                                            <div className="form-header mb-5">
                                                <h3>Login</h3>
                                                <p>Log into your account</p>
                                            </div>
                                            <div className="field">
                                                <label className="label">Email</label>
                                                <Input
                                                    prefix={<MailOutlined className='pr-2' />}
                                                    value={email}
                                                    type='email'
                                                    onChange={(e) => setEmail(e.target.value)}
                                                >
                                                </Input>
                                            </div>

                                            <div className="field">
                                                <div className="is-flex is-justify-content-space-between">
                                                    <label className="label">Password </label>
                                                    <span className="forgot-password" onClick={() => setForgotPassword(true)}>Forgot password?</span>
                                                </div>
                                                <Input.Password
                                                    prefix={<LockOutlined className='pr-2' />}
                                                    value={password}
                                                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
                                                >
                                                </Input.Password>

                                            </div>

                                            <div className="field is-grouped mt-5">
                                                <Button
                                                    type='primary'
                                                    loading={loading}
                                                    onClick={() => handleLogin(null)}
                                                >Login
                                                </Button>

                                            </div>

                                        </form>
                                    }

                                    {forgotPassword &&
                                        <FormForgotPassword setForgotPassword={setForgotPassword} />
                                    }

                                    <div className='form-footer my-5'>Don't have account?
                                        <Link to={'/register'}><span className='has-text-primary ml-2'>Sign up</span></Link></div>


                                    {/* <ExternalAuth /> */}
                                </>

                            }

                        </div>
                    </div>
                </section>
            </div>
        )
    }

}


const FormForgotPassword = (props: FormForgotPasswordProps) => {
    const { setForgotPassword } = props;
    const [resetLinkSent, setResetLinkSent] = useState<boolean>(false)
    const [emailResetPassword, setEmailResetPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const handleResetPassword = async () => {
        setLoading(true)
        if (emailResetPassword) {
            const data = { emailAddress: emailResetPassword }
            try {
                const response = await ResetPassword(data)
                if (response.success) {
                    setResetLinkSent(true)
                }
            } catch (error) {
                console.log('error', error)
                message.error('An error occurred.');
            }
        }

        setLoading(false)
    }

    const navigate = useNavigate()
    return (
        <>
            <form className='forgot-password-form show mb-4'>
                {resetLinkSent ?
                    <div className="reset-link-sent">
                        <img src={emailIcon} alt="" />
                        <p>Reset password link has sent to your email</p>
                    </div> :
                    <>
                        <div className="form-header mb-5">
                            <h3>Forgot your password?</h3>
                            <p>No worries, let's set new one.</p>
                            <div className="field mt-4">
                                <label className="label">Email</label>
                                <Input
                                    value={emailResetPassword}
                                    onChange={(e) => setEmailResetPassword(e.target.value)}
                                    prefix={<MailOutlined />}
                                />

                                <p className='tip'>We'll send reset password link to your email address</p>
                            </div>
                        </div>
                        <Button
                            loading={loading}
                            type='primary'
                            onClick={handleResetPassword}
                        >
                            Send
                        </Button>

                    </>
                }
            </form>
            <Button
                onClick={() => setForgotPassword(false)}
                className='w-100'
            >Back to Login</Button>
        </>
    )
}
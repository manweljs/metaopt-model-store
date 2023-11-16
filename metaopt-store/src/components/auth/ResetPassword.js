import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import { backendHOST } from '../../App';
import Navbar from '../navbar/Navbar'



function ResetPassword() {

    const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false)

    const c = searchParams.get("c")

    const saveNewPassword = async () => {

        setIsLoading(true)
        let endpoint = backendHOST + `/api/Account/ResetPassword`

        let data = { password: newPassword, c: c }
        console.log(data);
        await fetch(endpoint, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(r => r.json())
            .then(r => {
                if (r.success) {
                    setResetPasswordSuccess(true)
                }
            })

    }

    return (
        <>
            <Navbar />
            <div className="section auth">
                <div className="containter reset-password-box">

                    <h1 className="title">Reset Password</h1>
                    {resetPasswordSuccess ?
                        <div className="reset-password-success">
                            <p>Great, your new password has saved!</p>

                            <Link to={"/login"}>
                                <div className="button is-primary mt-5">
                                    Back to login
                                </div>
                            </Link>
                        </div> :
                        <div className="reset-password-form">
                            <p className='label'>New Password</p>
                            <div className="control has-icons-left">
                                <input className="input" type="password" value={newPassword} placeholder="********" onChange={(e) => setNewPassword(e.target.value)} />
                                <span className="icon is-small is-left">
                                    <i className="fa-solid fa-lock"></i>
                                </span>
                            </div>
                            <div className={`button is-primary mt-5 ${isLoading ? "is-loading" : ""}`} onClick={saveNewPassword}>
                                {isLoading ? "" : "Save New Password"}
                            </div>
                        </div>
                    }
                </div>
            </div >



        </>
    )
}

export default ResetPassword
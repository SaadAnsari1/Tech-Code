import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

function Login() {
    const history = useHistory();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = async (e) => {
        e.preventDefault();

        const res = await fetch('/Adsignin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password
            }),
        })
        const data = res.json()

        if (data.status === 400 || !data) {
            window.alert("Invalid Registration");
        } else {
            window.alert("Registration Successful");
            history.push("/Admin");
        }
    }




    return (
        <>
            <div className="error-page">
                <div className="content">
                    <h5 className="header" data-text="Admin">Admin</h5>
                    <form method="POST">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            placeholder="Enter your Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            placeholder="Enter your Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="btns" >
                            <input type="Submit" value="Login" onClick={loginUser} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
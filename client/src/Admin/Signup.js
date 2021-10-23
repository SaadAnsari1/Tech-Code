import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
function SignUp() {
    const history = useHistory();
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        cpassword: "",
    });
    let name, value;
    const handleInputs = (e) => {
        console.log(e);

        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    };


    const postData = async (e) => {
        e.preventDefault();

        const { name, email, phone, password, cpassword } = user;

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                password,
                cpassword,
            }),
        });

        const data = await res.json();

        console.log(data);
        if (res.status === 422 || !data) {
            window.alert("Invalid Registration");
            // console.log("Invalid Registration");
        } else {
            window.alert("Registration Successful");
            // console.log("registeration successful");
            history.push("/");
        }
    };

    const callBackEnd = async () => {
        try {
            const res = fetch('/Admin', {
                method: "GET",
                headers: {
                    Accept: "appllication/json",
                    "Content-Type": "application/json",
                },
                credentials: "include"
            })
            const data = await (await res).json();
            console.log(data)

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error
            }

        } catch (err) {
            console.log(err)
            history.push("/");

        }
    }

    useEffect(() => {
        callBackEnd();
    }, [])


    return (
        <>
            <div className="error-page">
                <div className="content">
                    <h4 className="header" data-text="SignUp">
                        SignUp
                    </h4>
                </div>
                <form method="POST" >
                    <label>UserName</label>
                    <input type="text" placeholder="" onChange={handleInputs} name="name" value={user.name} />
                    <label>Email</label>
                    <input type="email" placeholder="" onChange={handleInputs} name="email" value={user.email} />
                    <label>Phone</label>
                    <input type="Number" placeholder="" maxLength="10" minLength="10" onChange={handleInputs} name="phone" value={user.phone} />
                    {/* <div className="form-check">
                        <input className="form-check-input" type="radio" name="role" id="flexRadioDefault1" />
                        <label className="form-check-label" for="role">
                            Default radio
                        </label>

                        <input className="form-check-input" type="radio" name="role" id="flexRadioDefault2" checked />
                        <label className="form-check-label" for="role">
                            Role
                        </label>
                    </div> */}
                    <label>Password</label>
                    <input type="password" placeholder="" onChange={handleInputs} name="password" value={user.password} />
                    <label>Confirm Password</label>
                    <input type="password" placeholder="" onChange={handleInputs} name="cpassword" value={user.cpassword} />
                    <div className="btns">
                        <input type="Submit" value="Submit" onClick={postData} />
                    </div>
                </form>
            </div>
        </>
    )
}

export default SignUp

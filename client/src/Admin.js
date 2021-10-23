import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import Nevbar from './Admin/Nevbar'

function Home() {
    const history = useHistory();
    const [userData, setUserData] = useState({});

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
            setUserData(data)
            // console.log(data)

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error
            }

        } catch (err) {
            console.log("post page", err)
            history.push("/Login/Admin");

        }
    }
    useEffect(() => {
        callBackEnd();
    }, [])


    return (
        <>
            <Nevbar />
            <nav className="navbar navbar-expand-lg navbar-light ">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" >
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <p className="text-start nav-link fw-bold">
                                    UsreName: {userData.name}
                                </p>
                            </li>
                            <li className="nav-item">
                                <p className="text-end nav-link fw-bold">
                                    Role : {userData.role}
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="error-page">
                <div className="content">
                    <h6 className="header" data-text="Home">
                        Home
                    </h6>
                    <h4>
                        wellcome To ||  Tech
                    </h4>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    </p>
                    <div>

                    </div>

                    {/* <NavLink className="blog-post__cta mb-2" to="/Business">
                        View-News
                    </NavLink>
                    <NavLink className="blog-post__cta ml-2" to="/Admin/SignUp">
                        SignUp
                    </NavLink>
                    <NavLink className="blog-post__cta ml-2" to="/Logout/Admin">
                        Logout
                    </NavLink> */}


                </div>
            </div>
        </>

    )
}

export default Home

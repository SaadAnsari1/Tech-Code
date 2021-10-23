import React, { useEffect, useState } from 'react'
import { useHistory, NavLink } from "react-router-dom";
import axios from "axios";
import ViewNews from '../Admin/News'

function UserView(props) {

    const history = useHistory();
    const [author, setAuthor] = useState("");
    const [userData, setUserData] = useState({});
    const [loadimage, setLoadImage] = useState([]);


    const callBackEnd = async () => {
        try {
            const res = await fetch('/user', {
                method: "GET",
                headers: {
                    Accept: "appllication/json",
                    "Content-Type": "application/json",
                },
                credentials: "include"
            })
            const data = await (await res).json();
            await setUserData(data)
            await setAuthor(data.name)
            // console.log("name", data.name)


            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error
            }

        } catch (err) {
            console.log("post page", err)
            history.push("/Login");

        }
    }
    // 
    console.log(author, "s")

    const NameUser = author
    const Newsauthor = async () => {
        //     const result = await axios.get(`/news/author/$`);{NameUser}
        const result = await axios.get(`/news/author/${NameUser ? NameUser : alert("404")}`);
        setLoadImage((await result).data.reverse());
        console.log((await result).status)
    }

    useEffect(() => {
        callBackEnd(); console.log("2")
        const timeoutID = window.setTimeout(() => {
            console.log(author, "u")
            console.log("1")
            Newsauthor();
        }, 1500);



        // eslint-disable-next-line
    }, []);
    console.log(author, "d")

    // 
    // console.log(userData)

    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light fixed-top ">
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
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link fw-bold" to="/">
                                    Back
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {loadimage.map((name) => (
                <><div key={name._id}>
                    <ViewNews image={name.image} title={name.title} subtitle={name.subtitle} date={name.date} author={name.author} id={name._id} category={name.category}
                    />
                </div>

                    {/* <button className="blog-post__cta" onClick={deleteNews} _id={name._id}>Delete</button> */}


                </>
            ))
            }



        </>
    )
}

export default UserView
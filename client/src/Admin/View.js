import React, { useEffect, useState } from 'react'
import { useHistory, NavLink } from "react-router-dom";
import axios from "axios";
import ViewNews from './News'

function View({ category }) {
    const history = useHistory();
    const [adminData, setAdminData] = useState({});
    const [userData, setUserData] = useState({});
    const [loadimage, setLoadImage] = useState([]);

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
            setAdminData(data)
            // console.log(data)

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error
            }

        } catch (err) {
            console.log("post page", err)
            history.push("/");

        }
    }

    useEffect(() => {
        callBackEnd(); console.log("2")
        Newscategory(); console.log("1")

        //  NewsGET();console.log("3")
    }, []);
    //
    const Newscategory = async () => {
        const result = await axios.get(`/news/category/${category}`);
        setLoadImage(result.data.reverse());
        console.log(result.data.reverse())
    };
    // const NewsGET = async () => {
    //     const result = await axios.get(`/news`);
    //     setLoadImage(result.data.reverse());
    //     console.log(result.data.reverse())
    // };
   
    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light fixed-top ">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" >
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <p className="text-start nav-link fw-bold">
                                    UsreName: {adminData.name}
                                </p>
                            </li>
                            <li className="nav-item">
                                <p className="text-end nav-link fw-bold">
                                    Role : {adminData.role}
                                </p>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link fw-bold" to="/Admin">
                                    Back
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {loadimage.map((name) => (
                <>
                    <ViewNews image={name.image} title={name.title} subtitle={name.subtitle} date={name.date} author={name.author} id={name._id} category={name.category}
                          />
                    {/* <button className="blog-post__cta" onClick={deleteNews} _id={name._id}>Delete</button> */}


                </>
            ))
            }



        </>
    )
}

export default View
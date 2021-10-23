// import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";


function Update(props) {
    const history = useHistory();
    console.log(props)
    // const [selectedFile, setSelectedFile] = useState();
    const [userData, setUserData] = useState({});
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [data, setData] = useState("");

    useEffect(async () => {

        let result = await axios.get("/news/" + props.match.params.id);
        result = await result.data
        setData(result);
        setName(result.title)
        setDesc(result.subtitle)
        // setSelectedFile(result.image)
        // console.log(
        //     // "result",result,
        //     // "data",result.data.title,
        //     // "reverse",result.data.reverse
        // )

    }, [])

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
            history.push("/");

        }
    }

    useEffect(() => {
        callBackEnd();
    }, []);

    const Edit = async (e) => {
        // alert(props.match.params.id)
        try {
            const formData = new FormData();
            // formData.append("image", selectedFile);
            formData.append("title", name);
            formData.append("subtitle", desc);

            console.log(formData)

            await fetch(`/news/${props.match.params.id}`, {
                method: "PATCH",
                body: formData,
            })
            alert('Done')
        } catch (error) {
            alert('Error in the Code');
            console.log(error)
        }
    };

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
                            <li className="nav-item">
                                <p className="text-end nav-link fw-bold">
                                    Category : {data.category}
                                </p>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link fw-bold" to="/Admin">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link fw-bold" to="/Logout/Admin">
                                    Logout
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>


            <div className="blog-post">
                <div className="blog-post__img">
                    <img src={data.image} alt="" />
                </div>
                <div className="blog-post__info">
                    <div className="content">
                        <h5 className="header" data-text="Edit Post">Edit Post</h5>
                    </div>
                    <form>

                        <div className="mb-3">
                            <input type="text" name="title" className="form-control" onChange={(e) => setName(e.target.value)} defaultValue={data.title} />

                        </div>
                        <div className="mb-3">
                            <textarea type="text" name="subtitle" className="form-control" onChange={(e) => setDesc(e.target.value)} defaultValue={data.subtitle} rows="10" />

                        </div>
                        {/* <div className="mb-3">
                            <input type="file" name="image" className="form-control" onChange={(e) => setSelectedFile(e.target.files[0])} defaultValue={data.image} />
                        </div> */}

                        <div className="input-container">
                            <input className="btn btn-outline-success" type="submit" value="SUBMIT" onClick={Edit} />
                        </div>
                    </form>

                </div>
            </div>

            <div className="blog-post">
                {/* <div className="blog-post__info">
                    <div className="content">
                        <h5 className="header" data-text="------------------------------">------------------------------</h5>
                    </div>
                </div> */}
            </div>

        </>
    )
}
export default withRouter(Update)


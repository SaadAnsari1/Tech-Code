import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from 'react-router-dom';

function Post() {
    const history = useHistory();
    const [selectedFile, setSelectedFile] = useState();
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [author, setAuthor] = useState("");
    const [userData, setUserData] = useState({});
    const [category, setCategory] = useState("");
    const [userTag, setUserTag] = useState({});



    const callBackEnd = async () => {
        try {
            const res = fetch('/user', {
                method: "GET",
                headers: {
                    Accept: "appllication/json",
                    "Content-Type": "application/json",
                },
                credentials: "include"
            })
            const data = await (await res).json();
            setUserData(data)
            setAuthor(data.name)
            setUserTag(data.name)


            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error
            }

        } catch (err) {
            console.log("post page", err)
            history.push("/Login");

        }
    }


    useEffect(() => {
        callBackEnd();
    }, []);



    const handleSubmission = async (e) => {
        try {
            const formData = new FormData();
            formData.append("image", selectedFile);
            formData.append("title", name);
            formData.append("subtitle", desc);
            formData.append("author", author);
            formData.append("category", category);
            console.log(formData)
            await fetch("/news", {
                method: "POST",
                body: formData,
            })
            alert('Done')
        } catch (error) {
            // alert('Error in the Code');
            console.log(error)
        }
    };

    return (
        <>

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
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link fw-bold" to={"/User/News/" + userTag}>
                                    YourNews
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link fw-bold" to="/Logout">
                                    Logout
                                </NavLink>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>

            <div className="error-page">
                <div className="form-container">
                    <div className="content">
                        <h5 className="header" data-text="New Post">New Post</h5>
                    </div>

                    <form className="form" >
                        <div className="mb-3">
                            <input type="text" name="title" className="form-control" onChange={(e) => setName(e.target.value)} placeholder="Title is hare" />

                        </div>
                        <div className="mb-3">
                            <textarea type="text" name="subtitle" className="form-control" onChange={(e) => setDesc(e.target.value)} placeholder="Write SubTitle" rows="5" />

                        </div>
                        <div className="mb-3">
                            <input type="file" name="image" className="form-control" onChange={(e) => setSelectedFile(e.target.files[0])} />

                        </div>
                        <div className="mb-3">
                            <select className="form-select form-select-sm" name="category" onChange={(e) => setCategory(e.target.value)}>
                                <option value="0" disabled>Category</option>
                                <option value="Business" name="category" >Business News</option>
                                <option value="Breaking" name="category" >Breaking News</option>
                                <option value="Entertainment" name="category">Entertainment News</option>
                                <option value="Political" name="category" >Political News</option>
                                <option value="Technology" name="category" >Technology News</option>
                                <option value="Sport" name="category" >Sport News</option>
                            </select>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Featured News
                            </label>
                        </div>
                        <div className="input-container">

                            <input className="btn btn-outline-success" type="submit" onClick={handleSubmission} value="SUBMIT" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
export default Post;
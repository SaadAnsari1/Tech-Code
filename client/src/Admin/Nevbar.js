import React from 'react'

import { NavLink } from 'react-router-dom';

export default function View() {

    return (



        <>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top ">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" >
                        <ul className="navbar-nav ml-auto">
                            {/* <li className="nav-item"><NavLink className="nav-link" exact to="/News">All News</NavLink></li> */}
                            <li className="nav-item"><NavLink className="nav-link" exact to="/Business">Business</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" exact to="/Entertainment">Entertainment</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" exact to="/Political">Political</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" exact to="/Breaking">Breaking</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" exact to="/Sports">Sports</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" exact to="/Technology">Technology</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link fw-bold" to="/Logout/Admin">Logout</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link fw-bold" to="/Admin/SignUp">SignUp</NavLink></li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}
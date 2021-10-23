import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom";

const Logout = () => {
    const history = useHistory();

    useEffect(() => {
        fetch('/Admin/Logout', {
            method: "GET",
            headers: {
                Accept: "appllication/json",
                "Content-Type": "application/json",
            },
            credentials: "include"
        }).then((res) => {
            history.push("/");
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error
            }
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <>

        </>
    )
}

export default Logout;
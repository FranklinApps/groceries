import React from "react";
import "./header.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Header(){
    const navigate = useNavigate();

    const logout = (e) => {
        axios
        .post(
            "http://localhost:8000/api/users/logout",
            {}, // As a post request, we MUST send something with our request.
                // Because we're not adding anything, we can send a simple MT object
                {
                    withCredentials: true,
                },
            )
            .then((res)=> {
                console.log(res);
                console.log(res.data)
                navigate("/")
            })
            .catch((err) => {
                console.log(err)
            })
};
    return(
    <div className='headerContainer'>
            <ul className='headerLinkList'>
                <li><a href='/home'>Home</a></li>
                <li><a href='/newDew'>Add</a></li>
                <li><a href='/' onClick={logout}>Logout</a></li>
            </ul>
        </div>);
};

export default Header;
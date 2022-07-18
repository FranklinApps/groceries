import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import './home.css';
import axios from 'axios';

function Home(props){
    const [user, setUser] = useState({});
    const [honeyDewItems, setHoneyDewItems] = useState({});

    useEffect(()=> {
        axios.get("http://localhost:8000/api/loggedInUser",
        {withCredentials: true}
        )
            .then((res)=> {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err)=> {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:8000/api/",
        {

        })
        .then((res) => {
            console.log(res);
            console.log(res.data);
            setHoneyDewItems(res.data);
        })
    })

    return(
        <div className="homeContainer">
            <Header />
            <h1 id = "welcomeFirstName"> Welcome, {user.firstName + " "} {user.lastName} </h1>
            <div className="container" id="container">
                <table>
                    <thead>Tasks</thead>
                </table>
            </div>
        </div>
    )
}

export default Home;
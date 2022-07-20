import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import './home.css';
import axios from 'axios';


function Home(props){
    const [user, setUser] = useState({});
    const [dews, setDews] = useState([]);

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
        axios.get("http://localhost:8000/api/dews",
        {})
        .then((res) => {
            console.log(res);
            console.log(res.data);
            setDews(res.data);
        })
        .catch((err)=> {
            console.log(err);
        })
    } , [])

    return(
        <div className="homeContainer">
            <Header />
            <h1 id = "welcomeFirstName"> Welcome, {user.firstName + " "} {user.lastName} </h1>
            <div className="container" id="container">
                {
                    dews.map((dew, index) => (
                        <div>
                            <div id="dewList" key={dew._id}><h1> {dew.task} </h1> <span>{dew.notes}</span> <br/>
                            <Link to={`/dew/edit/${dew._id}`} style={{textDecoration:"none"}}><button className="btn"> Edit {dew.task}</button> </Link></div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Home;
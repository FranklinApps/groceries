import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/header";
import './home.css';
import axios from 'axios';

function Home(props){
    const [user, setUser] = useState({});
    const [groceryItems, setGroceryItems] = useState({});

    useEffect(()=> {
        axios.get("htt[://localhost:8000/api/loggedInUser",
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
            setGroceryItems(res.data);
        })
    })

    return(
        <div className="homeContainer">
            <Header />
        "ahoy sailor"
        </div>
    )
}

export default Home;
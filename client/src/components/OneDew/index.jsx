import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from '../Header';
import "./OneDew.css"

const OneDew = (props) => {
    const {id} = useParams();
    const [dew, setDew]= useState("");
    const [dewList, setDewList] = useState("");
    const navigate = useNavigate();
    const [user, setUser] = useState("");

    useEffect(()=>{
        axios.get("http://localhost:8000/api/loggedInUser", {withCredentials: true})
        .then((res) => {
            console.log(res);
            console.log(res.data);
            setUser(res.data);
        })
    }, [])
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/dews/${id}`)
            .then((res)=> {
                console.log(res);
                console.log(res.data);
                setDew(res.data);
                console.log(res.data.createdBy);
            })
            .catch((err)=> {
                console.log(err)
            })
    }, [id])
    const deleteDew = (idFromBelow) => {
        axios.delete(`http://localhost:8000/dews/${idFromBelow}`)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setDewList(dewList.filter(dew=>dew._id !== idFromBelow));
                navigate('/home');
            })
            .catch((err)=>{
                console.log(err);
            })
    }
    const editDew = () => {
        navigate(`edit/${dew._id}`);
    }
    
    return(
        <div>
            <Header/>
            <div className="editContainer">
                <div id="dewTitleImageDescription">
                    <h1 id="oneDewName">{dew.task}</h1>
                    <img id="oneDewImage" src={dew.image} className="oneImg" alt=''/>
                    <h4 id="oneDewUsername">by {dew.createdBy?.email}</h4>
                    <p id="oneDewDescription">{dew.notes}</p>
                </div>
            </div>
            {
                user._id === dew.createdBy?._id ? 
                    <div id="editAndDeleteButtons" className="btnContainer">
                        <button className="btn" onClick={() => editDew()}>Edit</button>
                        <button className="btn" onClick={() => deleteDew(dew._id)}>Delete</button>
                    </div>:
                    ""
            }
        </div>
    )
}

export default OneDew;
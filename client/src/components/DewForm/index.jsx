import React, { useState, useEffect } from "react";
import "./DewForm.css";
import Header from "../Header"
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


function DewForm(props){
    const navigate = useNavigate();
    const [errors, setErrors]= useState([]);
    const {id} = useParams();
    const {view} = props;
    const [task, setTask] = useState("");
    const [image, setImage] =useState("");
    const [completed, setCompleted] = useState(false);
    const [notes, setNotes]= useState("");

    useEffect(()=>{
        if(view === "edit"){
            axios.get(`http://localhost:8000/api/dews/${id}`)
                .then((res)=>{
                    console.log(res.data);
                    setTask(res.data.task);
                    setImage(res.data.image);
                    setCompleted(res.data.completed);
                    setNotes(res.data.notes);
                })
                .catch((err)=>{console.log(err);})
        }
    }, [])
    
    const submitHandler = (e) => {
        e.preventDefault();
        if(view==="edit"){
            axios.put(`http://localhost:8000/api/dews/${id}`, 
            {
                task,
                image,
                completed,
                notes
            })
            .then(res=>{
                console.log(res);
                navigate("/home")
            })
            .catch((err)=>{
                const errorResponse = err.response.data.errors;
                    const errorArr = [];
                    for (const key of Object.keys(errorResponse)) {
                        errorArr.push(errorResponse[key].message)
                    }
                    setErrors(errorArr);
            })
        } else {
            axios.post('http://localhost:8000/api/dews', {
                task,
                image,
                completed,
                notes
            }, { withCredentials: true })
                .then(res=>{
                    console.log(res);
                    console.log(res.data);
                    navigate('/home');
                })
                .catch((err)=>{
                    const errorResponse = err.response.data.errors;
                    const errorArr = [];
                    for (const key of Object.keys(errorResponse)) {
                        errorArr.push(errorResponse[key].message)
                    }
                    setErrors(errorArr);
                })
        }
    }
    return(
        <div className='dewFormContainer'>
            <Header />
            {
                view === 'edit' ?
                <h1 className='dewFormH1'>Edit</h1> :
                <h1 className='dewFormH1'>Add A Task!</h1>
            }
            <form className='dewForm' onSubmit={submitHandler}>
                <div className='dewFormErrorBox'>
                    {errors.map((err, index) => <p key={index} className='errorMsg'>{err}</p>)}
                </div>
                <div className='formColContainer'>
                    <div className='formCol'>
                        <label>
                            Task:
                            <input
                            type="text"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            />
                        </label>
                        <label>
                            Image:
                            <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            />
                        </label>
                        <label>
                            Notes:
                            <input
                            type="text"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            />
                        </label>
                        <label>
                            Completed:
                            <input
                            type="checkbox"
                            value={completed}
                            onChange={(e) => setCompleted(e.target.value)}
                            />
                        </label>
                        <input  
                            type="submit"
                            value="Add Task"
                            className="submitBtn"
                            />  
                        </div>
                </div>
            </form>
        </div>
    );
};

export default DewForm;


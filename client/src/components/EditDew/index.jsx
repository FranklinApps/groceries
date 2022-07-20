import React, { useEffect, useState } from 'react';
import Header from '../Header'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditDew.css'



const EditDew = (props) => {

    const [task, setTask] = useState('');
    const [image, setImage] = useState('');
    const [completed, setCompleted] = useState('');
    const [notes, setNotes] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/dews/${id}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setTask(res.data.name);
                setImage(res.data.image);
                setCompleted(res.data.cookTime);
                setNotes(res.data.serves);
            })
            .catch((err) => console.log(err));
    }, [id])

    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/dews/${id}`,
            {
                task,
                image,
                completed,
                notes
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate('/home');
            })
            .catch((err) => console.log(err));
    }

    const deleteHandler = () => {
        axios.delete(`http://localhost:8000/api/dews/${id}`)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                navigate('/');
            })
            .catch((err)=>{
                console.log(err);
            })
    };

    return (

        <div className='pageContainer'>
            <Header />

            <form onSubmit={submitHandler}>
                <div className='formContainer'>
                <div>
                    <label>Task: </label>
                    <input value={task} onChange={(e) => setTask(e.target.value)} type='text' />
                </div>

                <div>
                    <label>Image: </label>
                    <input value={image} onChange={(e) => setImage(e.target.value)} type='text' />
                </div>

                <div>
                    <label>completed: </label>
                    <input value={completed} onChange={(e) => setCompleted(e.target.value)} type='checkbox' />
                </div>

                <div>
                    <label>notes: </label>
                    <input value={notes} onChange={(e) => setNotes(e.target.value)} type='text' />
                </div>

                </div>

                <button className='btn'> Update Task </button>
                <button onClick={deleteHandler} className="btn"> Remove </button>
            </form>

        </div>
    )
}

export default EditDew;

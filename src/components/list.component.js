import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function TutorsList() {

    

    const [Tutors, setTutors] = useState([])
    

    useEffect(() => {
        fetchTutors();
    }, [])

    const fetchTutors = async () => {
        await axios.get('http://127.0.0.1:8000/api/tutors').then(({ data }) => {setTutors(data)}) 
    }

    const deleteTutors = async (id) => {
        await axios.delete('http://127.0.0.1:8000/api/tutors/' + id)
            .then(({ data }) => {
                console.log(data.message)
                fetchTutors();
            }).catch(({ response: { data } }) => {
                console.log(data.message)
            })
    }

   

 

    return (
        <div className="container">
            <div className="row">
                <div className="conl-12">
                    <Link className="btn btn-primary mb-2 float-end" to={"/tutor/create"}>Create</Link>
                    <div className="col-12">
                       

                        <table className="table">
                            <thead>
                                <tr> 
                                    <th scope="col">nom et prenom</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Tutors.length > 0 && (
                                        Tutors.map((row,key)=>(
                                            <tr key={key}> 
                                                <td>{row.nometprenom}</td>
                                                <td>{row.description}</td>
                                                <td>
                                                    <img width="100px" src={`http://127.0.0.1:8000/storage/tutor/image/${row.image }`} /> 
                                                </td>
                                                <td>
                                                    <Link className="btn btn-success mb-2 float-end" to={`/tutor/edit/${row.id}`}>Edit</Link>
                                                </td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={() => deleteTutors(row.id)}>  Delete</button>
                                                    </td>
                                            </tr> 
                                        ))
                                    )
                                }
                               
                            </tbody>
                        </table>



                    </div>
                </div>

            </div>

        </div>
    )




}
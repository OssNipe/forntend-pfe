import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateTutor(){

    const navigate = useNavigate();

    const [nometprenom,setNometprenom] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')

    const changeHandler = (e)=>{
        setImage(e.target.files[0]);
        console.log(e.target.files[0])
    }

    const createTutor = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('nometprenom', nometprenom)
        formData.append('description', description)
        formData.append('image', image)

        console.log(formData)
        await axios.post('http://127.0.0.1:8000/api/tutors', formData)
        .then(({data})=>{
            console.log(data.message)
            navigate('/')
        }).catch(({response})=>{
            if (response.status ==422) {
                console.log(response.data.errors)
            } else {
                console.log(response.data.message)
            }
        })
    }

    return(
        <div className="container">
            <div className="row justify-content-center">
                <div className="conl-12 col-sm-12 col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title"> Create Form</h3>
                            <hr></hr>
                            <div className="from-wrapper">

                                <form onSubmit={createTutor}>

                                    <div className="mb-3">
                                        <label className="form-label">nometprenom  </label>
                                        <input type="text" className="form-control" 
                                        value={nometprenom}
                                        onChange={(e)=>{setNometprenom(e.target.value)}}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Example textarea</label>
                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                            value={description}
                                            onChange={(e) => { setDescription(e.target.value) }}
                                        ></textarea>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">image  </label>
                                        <input type="file" className="form-control"
                                            onChange={changeHandler}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <button type="submit" className="btn btn-primary mb-3">  Save</button>
                                    </div>

                                </form>



                            </div>


                        </div>
                    </div>
                </div>

            </div>

        </div>
    )




}
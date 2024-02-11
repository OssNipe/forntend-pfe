import React, { useState ,useEffect} from "react";
import axios from "axios";
import { useNavigate ,useParams} from "react-router-dom";

export default function EditTutor() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [nometprenom, setNometprenom] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null)

    useEffect(()=>{
        fetchTutors();
    },[])

    const fetchTutors = async() =>{
        await axios.get(`http://127.0.0.1:8000/api/tutors/${id}`)
            .then(({ data }) => {
                const { nometprenom, description } = data.tutor
                setNometprenom(nometprenom)
                setDescription(description)
            }).catch(({ response: {data} }) => {
                console.log(data.message)
            })
    }

    const changeHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const updateTutor = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PATCH')
        formData.append('nometprenom', nometprenom)
        formData.append('description', description)
        if (image !== null) {
            formData.append('image', image)
        }
        

        await axios.post('http://127.0.0.1:8000/api/tutors/' + id, formData)
            .then(({ data }) => {
                console.log(data.message)
                navigate('/')
            }).catch(({ response }) => {
                if (response.status == 422) {
                    console.log(response.data.errors)
                } else {
                    console.log(response.data.message)
                }
            })
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="conl-12 col-sm-12 col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-nometprenom"> Edit Form</h3>
                            <hr></hr>
                            <div className="from-wrapper">

                                <form onSubmit={updateTutor}>

                                    <div className="mb-3">
                                        <label className="form-label">nom et prenom  </label>
                                        <input type="nometprenom" className="form-control"
                                            value={nometprenom}
                                            onChange={(e) => { setNometprenom(e.target.value) }}
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
                                        <button type="submit" className="btn btn-primary mb-3">  Update</button>
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
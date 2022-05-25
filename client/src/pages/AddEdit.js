import React, {useEffect, useState, useRef} from 'react';
import { useHistory, Link, useNavigate, useParams} from 'react-router-dom';
import "./AddEdit.css";
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState ={
    name: "",
    email: "",
    contact: "",
};

const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const {name, email, contact} = state;
    const history = useNavigate();
    // const history = useHistory();
    const [search,setSearch] =useState ("");
    
    const {id} = useParams();
    useEffect (() =>  {
        axios
        .get(`http://localhost:5000/api/get/${id}`)
        .then((resp) => setState({...resp.data[0]}))
    } ,[id] )

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log("h");
        // history.push(`/search?name=${search}`);
        // setSearch("");

        if (!name || !email || !contact ) {
            toast.error(" Please provide value into each input field");  
        }else{
            axios
            .post("http://localhost:5000/api/post" ,{
                name: name,
                email: email,
                contact: contact,
            }).then ((res)=>{
                console.log(res);
                setState({name:"", email: "", contact:""})
            }).catch((err) => console.log(err))
        }
    };


    const handleInputChange =(e) =>{
        const{name, value} = e.target;
        setState({...state, [name]: value});
    };

    const saveData = () => {
        console.log("h");
    }
    
  return (
    <div style={{ marginTop: "100px"}}>

        <form 
         style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center"
        }}
        onSubmit = {(e) => handleSubmit(e)}
        >
             {/* <input
            type="text"
            className='inputField'
            placeholder='Search'
            onChange={(e) => setSearch(e.target.value)}
            value= {search}
            
            /> */}

            <label htmlFor='name'> Name</label>
            <input
            type="text"
            id='name'
            name="name"
            placeholder =" Your Name ...."
            value={name || ""}
            onChange= {handleInputChange}
            />
             <label htmlFor='email'> Email</label>
            <input
            type="email"
            id='email'
            name="email"
            placeholder =" Your Email ...."
            value={email || ""}
            onChange= {handleInputChange}
            />
             <label htmlFor='contact'> Contact</label>
            <input
            type="number"
            id='contact'
            name="contact"
            placeholder =" Your Contact No ...."
            value={contact || ""}
            onChange= {handleInputChange}
            />

<button type="submit">SUBMIT</button>
            <Link to="/">
                < input type="button " value="Go Back"/>
            
            </Link>

        </form>
        
    </div>
  );
};

export default AddEdit; 
import React, { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JavaScript




function Register() {
    const navigate = useNavigate()
    const [name , setName] = useState()
    const [email , setEmail] = useState()
    const [password , SetPassword] = useState()
const HandleRegister = (e) =>{
    e.preventDefault();
    axios.post("http://localhost:3001/Register", {name,email,password})
    .then(result => {
        console.log(result)
        navigate('/')}
    )
    .catch(err => console.log(err))
    
    

}

    return(

  <form action="" onSubmit={HandleRegister}><div>
         <div>
    <label htmlFor="name">Name:</label>
    <input
      type="text"
      id="name"
      name="name"
      required
      onChange={ (e) => setName(e.target.value)}
    />
  </div>
  <div>
    <label htmlFor="email">Email:</label>
    <input
      type="email"
      id="email"
      name="email"
      required
      onChange={ (e) => setEmail(e.target.value)}
    />
  </div>
  <div>
    <label htmlFor="password">Password:</label>
    <input
      type="password"
      id="password"
      name="password"
      required
      onChange={ (e) => SetPassword(e.target.value)}
    />
  </div>
  <button type="submit">Register</button>
 


</div></form> 

   
    )
    
}
export default Register;
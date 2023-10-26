// rafce
import React, { useState } from "react";
// functions
import { register } from "../../functions/auth";
import "./login.css"
//React router
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    password1: "",
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.password !== value.password1) {
      alert("Password not match");
    } else {
      register(value)
        .then((res) => {
          console.log(res.data);
          
          alert("Register Success");
          navigate("/login"); 
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
    
  };
  return (
    <div className="container-login">
        <div className="form-register">
          <h1 >Register Page</h1>

          <form  onSubmit={handleSubmit}>
            <div className="form-group">
              <h4>Username</h4>
              <input
                className="form-control"
                type="text"
                name="username"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <h4>Email</h4>
              <input
                className="form-control"
                type="text"
                name="email"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <h4>Password</h4>
              <input
                className="form-control"
                type="password"
                name="password"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <h4>Confirm Password</h4>
              <input
                className="form-control"
                type="password"
                name="password1"
                onChange={handleChange}
              />
            </div>

            <br />
            
            <button style={{background:"#444F6C",color:"white"}} className="btnRG btn   border w-100  "
            disabled={value.password.length < 6} >
              Submit
            </button>

          </form>
      </div>
      </div>
    
  );
};

export default Register;

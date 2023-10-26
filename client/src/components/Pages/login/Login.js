import React, { useState } from "react";
import "./login.css";
// functions
import { login } from "../../functions/auth";
// ⁡⁣⁡⁣⁣⁢redux⁡⁡
import { useDispatch } from "react-redux";
//React router
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = useState({
    username: "",
    password: "",
  });
  
  //function check Role User for navigat to  URL-User,URL-Admin
  const roleBaseRedirect = (role) => {
    console.log(role);
    if (role === "admin") {
      navigate("/admin/index");
    } else {
      navigate("/user/index");
    }
  };

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(value)
      .then((res) => {
        alert(res.data.payload.user.username + " Login Success");
        //set res.data in  REDUX  ⁡⁡⁡
        dispatch({
          type: "LOGIN",
          payload: {
            token: res.data.token,
            username: res.data.payload.user.username,
            role: res.data.payload.user.role,
          },
        });
        //set token in localStorage
        localStorage.setItem("token", res.data.token);
        //check Roule User
        roleBaseRedirect(res.data.payload.user.role);
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data);
      });
  };
  return (
    <div className="container-login">
      <div className="form-login">
        <h1>Login Page</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <h4>Username</h4>
            <input
              placeholder="Username"
              className="form-control"
              type="text"
              name="username"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
          <h4>Password</h4>
            <input
              placeholder="Password"
              className="form-control"
              type="password"
              name="password"
              onChange={handleChange}
            />
          </div>

          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

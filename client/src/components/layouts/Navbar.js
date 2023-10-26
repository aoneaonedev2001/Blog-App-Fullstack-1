import React from "react";
import "./Navbar.css"
// Router
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaUser,FaUserPlus } from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  
  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/");
  };
  return (
    <div className="Navbar">
   
      <div className="navbar-left">
        <Link to={user ? (user.role === "admin" ? "/admin/index" : "/user/index") : "/"}>
          <h1>Aone Blog</h1>
        </Link>
      </div>

      <div className="navbar-right">
        {user ? (
          <div className="content">
            <h3 className="nameuser" >{user.username}</h3>
            <button onClick={logout} >
              Logout
            </button>
          </div>
        ) : (
          <> 
          <div className="content">
          <Link  to="/login">
              <FaUser className="icons"/> Login
            </Link>
            <Link  to="/register">
              <FaUserPlus className="icons"/> Register
            </Link>
          </div>
            
          </>
        )}
      </div>
    </div>
  
  );
};

export default Navbar;

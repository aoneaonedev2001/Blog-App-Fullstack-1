// Route
import { Routes, Route } from "react-router-dom";
// redux
import { useDispatch } from "react-redux";
// functions
import { currentUser } from "./components/functions/auth";
// Layout
import Navbar from "./components/layouts/Navbar";
// Page
import  Home  from './components/Pages/home/Home'
import  Login from './components/Pages/login/Login'
import  Register from './components/Pages/login/Register'
import  SinglePage from "./components/Pages/singglePage/SinglePage";
import  HomeUser  from './components/Pages/user/HomeUser'
import  HomeAdmin  from './components/Pages/admin/HomeAdmin'
import  ManageAdmin  from './components/Pages/admin/ManageAdmin'
import Write from "./components/Pages/createPost/Write";
//Protect Routes
import UserRoute from "./components/Protect_Rout/UserRoute"; 
import AdminRoute from "./components/Protect_Rout/AdminRoute";


function App() {
  const dispatch = useDispatch();
  const idtoken = localStorage.token;     //get Token from LocalStorage
  if (idtoken) {                          //if have Token
    currentUser(idtoken)                  //Is function send Token to decoded  before check Token
      .then((res) => {   
        //console.log(res.data);          // get res.data (Is Data of User  passed decoded or verify) 
        dispatch({  
          type: "LOGIN",
          payload: {
            token: idtoken,              //set idtoken in REDUX
            username: res.data.username, //set res.data in REDUX
            role: res.data.role,        
          },
        });
      })
      .catch((err) => {   
        console.log(err);
      });
  }
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:id" element={<SinglePage />} />
        <Route path="/write" element={<Write />} />
        

        {/* Protect URL Routes */}
        <Route path="/user/index" element={         <UserRoute>  <HomeUser />    </UserRoute>} />
        <Route path="/admin/index" element={        <AdminRoute> <HomeAdmin />   </AdminRoute>} />
        <Route path="/admin/manage-admin" element={ <AdminRoute> <ManageAdmin /> </AdminRoute>} />

      </Routes>
    </div>
  );
}

export default App;

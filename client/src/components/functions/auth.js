import axios from "axios";

//----REGISTER---- 
export const register = async (value) =>  //get  value   
  await axios.post(process.env.REACT_APP_API + "/register", value); // send value to server



//----LOGIN----    
export const login = async (value) => 
  await axios.post(process.env.REACT_APP_API +"/login", value); 



//----currentUser----   (Check token user)
export const currentUser = async (authtoken) => {  //get  token
  return await axios.post(process.env.REACT_APP_API + "/current-user",
    {},
    {
      headers: {   // send token from headers
        authtoken, //token
      },
    }
  );
}

//----currentAddmin----    (Check token admin)
export const currentAdmin = async (authtoken) => { 
  return await axios.post(process.env.REACT_APP_API + "/current-admin",
    {},
    {
      headers: {  
        authtoken,
      },
    }
  );
}

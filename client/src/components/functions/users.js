import axios from "axios";

//----listUser----  
export const listUser = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/users", {
    headers: {
      authtoken, 
    },
  });
};

//----changeRole----  
export const changeRole = async (authtoken, value) => { //get Token and Value
  return await axios.post(process.env.REACT_APP_API + "/change-role", value, {
    headers: {
      authtoken,
    },
  });
};

//----removeUser---- 
export const removeUser = async (authtoken, id) => { //get Token and id
  return await axios.delete(process.env.REACT_APP_API + "/users/" + id, {
    headers: {
      authtoken,
    },
  });
};

//----resetPassword---- 
export const resetPassword = async (authtoken, id, values) => {//get Token ,id, values
  return await axios.put(process.env.REACT_APP_API + "/users/" + id, values, {
    headers: {
      authtoken,
    },
  });
};

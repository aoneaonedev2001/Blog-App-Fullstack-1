import axios from "axios";

//----listPost All----    
export const listPostr = async () =>                   
await axios.get(process.env.REACT_APP_API + "/posts"); 

//----readPost---- 
export const readPost = async (id) =>  
await axios.get(process.env.REACT_APP_API + "/posts/"+ id); 

//----createPost----  
export const createPost = async (authtoken, value) => { 
  return await axios.post(process.env.REACT_APP_API + "/posts", value, {
    headers: {
      authtoken,
    },
  });
};

//----deletePost---- 
export const deletePost = async (authtoken, Id, username) => { 
  return await axios.delete(process.env.REACT_APP_API + `/posts/${Id}`,{
    headers: {
      authtoken,
    },
    data: {
      username,
    },
  });
};


//----updatePost---- 
export const updatePost= async (authtoken, Id, username, title, desc) => {
  return await axios.put(`${process.env.REACT_APP_API}/posts/${Id}`, {
    username,
    title,
    desc
  }, {
    headers: {
      authtoken
    }
  });
};

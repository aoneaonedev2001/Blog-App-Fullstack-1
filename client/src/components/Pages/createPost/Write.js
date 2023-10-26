import React, { useState } from "react";
//redux store
import { useSelector } from "react-redux";
import axios from "axios";
// functions
import { createPost } from "../../functions/post";
//React router
import { useNavigate } from "react-router-dom";
import "./Write.css"
import { FaFileImage } from "react-icons/fa";
const Write = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      username: user.username,
      title,
      desc,
      file,
    };
   
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;

      try {
        await axios.post("http://localhost:8080/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    createPost(user.token, newPost)
      .then((res) => {
        console.log(res.data);
        alert("Upload Success");
        navigate("/post/" + res.data._id);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div className="container-write ">
      <div className='container-boxItems'>
      <h1 className="text-center mt-4 ">Upload Your Post <FaFileImage/></h1>
      <div className='img '>{file && <img src={URL.createObjectURL(file)} alt='images' />}</div>
  
          <form className="m-5" onSubmit={handleSubmit}>
            <div className="form-group">
              <h3>Upload Image </h3>
              <input
                className="form-control"
                type="file"
                name="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            <div className="form-group">
              <h3>Title</h3>
              <input
                className="form-control"
                type="text"
                name="title"
                maxLength={35}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <h3>Desc</h3>
              <textarea  onChange={(e) => setDesc(e.target.value)}></textarea>
            </div>
            
           
            <button>Submit</button>
          </form>
        </div>
        
      </div>
  );
};

export default Write;

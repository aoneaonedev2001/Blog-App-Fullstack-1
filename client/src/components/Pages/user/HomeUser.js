import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { listPostr } from "../../functions/post";
import { useSelector } from "react-redux";
import "./HomeUser.css"
import { FaFileSignature,FaRegEye } from "react-icons/fa";
const HomeUser = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    listPostr()
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);


  // create file URL of Photo for posts.photo
  const URLPhoto = "http://localhost:8080/images/";

  return (
    <div className="HomeUser">
      
      {user?.role === "admin" ? (
            <Link to="/admin/manage-admin">
            <div className="write-post">
              <h2>Edit User <FaFileSignature /></h2>
            </div>
          </Link>
          ) : (null)}
  
      {user ? (
          <Link className="link" to={"/write"}>
          <div className="write-post">
            <h2>Create Post <FaFileSignature/></h2>
          </div>
        </Link>
        ) : (null)}                
      
      {posts.map((posts) => (
        <Link to={`/post/${posts._id}`} key={posts.id} className="box-post">
          <div className="left-post">
            {posts.photo && <img src={URLPhoto + posts.photo} alt="" />}
          </div>
          <div className="right-post">
            <div className="head-post">
              <h3>{posts.title}</h3>
            </div>
            <div className="detail">
              <p>{posts.desc.slice(0, 180)}...</p>
            </div>
            <div className="footter">
              <p><FaRegEye/> จำนวนการเข้าชม....ครั้ง</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HomeUser;

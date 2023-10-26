import { useEffect, useState } from "react";
// functions
import { readPost, updatePost, deletePost } from "../../functions/post";
//router
import { useParams, useNavigate } from "react-router-dom";
//redux store
import { useSelector } from "react-redux";
// moment time
import moment from "moment";
import "moment/locale/th";
import "./SinglePage.css"
import { FaUserAlt,FaRegCalendarAlt,FaRegEdit,FaTrashAlt } from "react-icons/fa";

const Singgle = () => {
  //params
  const params = useParams();
  const navigate = useNavigate();
  const ID = params.id;

  //get User from redux store
  const { user } = useSelector((state) => ({ ...state }));
  
  // getPost
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    readPost(ID)
      .then((res) => {
        setPosts(res.data);
        //for update
        setTitle(res.data.title);
        setDesc(res.data.desc);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [ID]);

  //function  DeletePost
  const handleDelete = () => {
    deletePost(user.token, posts._id, user.username)
      .then((res) => {
        console.log(res);
        alert("Delete Success");
        navigate("/user/index");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //function UpdatePost
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [update, setUpdate] = useState(false);

  const handleUpdate = () => {
    updatePost(user.token, posts._id, user.username, title, desc)
      .then((res) => {
        console.log(res);
        alert("Upload Success");
        window.location.reload()
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // function for calculating time
  const calculateElapsedTime = (createdAt) => {
    const now = moment();
    const created = moment(createdAt);
    const duration = moment.duration(now.diff(created));
    const minutes = Math.floor(duration.asMinutes());
    moment.locale("th");
    const formattedDateTime = created.format("LL LTS");
    return formattedDateTime;
  };

  // create file URL of Photo for posts.photo
  const URLPhoto = "http://localhost:8080/images/";

  return (
    <div className="Container-Singgle">
      <div className="content-Singgle">
        {posts.photo && <img className="img-container" src={URLPhoto + posts.photo} alt="" />}
        <div className="detail-Singgle">
          <span><FaUserAlt/> Post by {posts.username}</span>
          <p><FaRegCalendarAlt/> {calculateElapsedTime(posts.createdAt)}</p>
        </div>

        {posts.username === user?.username && (
          <div className="buttons">
            <button className="button" onClick={() => setUpdate(true)}>
            <FaRegEdit/>
            </button>
            <button className="button" onClick={handleDelete}>
              <FaTrashAlt/>
            </button>
            {update && (
              <button className="button" onClick={handleUpdate}>
                Update
              </button>
            )}
          </div>
        )}
        {update ? (
          <input
            type="text"
            value={title}
            className="updateInput"
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="title">{posts.title}</h1>
        )}
        {update ? (
          <textarea
            value={desc}
            cols="30"
            rows="10"
            className="updateInput"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        ) : (
          <div className="desc">
          <p>{posts.desc}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Singgle;

import React, { useState, useEffect } from "react";
import { Select, Tag, Modal } from "antd";
import { FaEdit,FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";  
import moment from "moment";
import "./ManageAdmin.css"
// functions
import { listUser, changeRole, removeUser, resetPassword} from "../../functions/users";

const ManageAdmin = () => {
  const { user } = useSelector((state) => ({ ...state })); 
  
  // function listUser and loadData
  const [data, setData] = useState([]);         
  const loadData = (authtoken) => { 
    listUser(authtoken)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.response.data); 
      });
  };  

  useEffect(() => {       
    loadData(user.token);  
  }, []);

  // function resetPassword
  const [values, setValues] = useState({   
    id: "",
    password: "",
  });
  const handleChangePassword = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = (id) => {   
    setIsModalVisible(true);     
    setValues({ ...values, id: id }); 
  };
  const handleOk = () => { 
    setIsModalVisible(false);    
    resetPassword(user.token,values.id,{values})
    .then(res=>{
     // console.log(res)
      loadData(user.token); // loadData after resetPassword
    }).catch(err=>{
      console.log(err.response)
    })
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };


 // function changeRole toggle ( admin, user) 
 const roleData = ["admin", "user"];
  const handleChangeRole = (e, id) => {
    let values = {                   
      id: id,
      role: e,    //e= admin,user
    };
    changeRole(user.token, values)   
      .then((res) => {                
        //console.log(res);
        loadData(user.token);  // loadData after ChangeRole
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  //function handleRemove
  const handleRemove = (id) => {
    if (window.confirm("Are You Sure Delete!!")) { 
      removeUser(user.token, id)                   
        .then((res) => {                           
          //console.log(res);
          loadData(user.token);  // loadData after handleRemove                
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };
  
  return (
    <div className="container-ManageAdmin">
           <div className="head-content">
           <h1>ManageAdmin Page</h1>
           </div> 
          
          <table class="table">
            <thead>
              <tr >
                <th >username</th>
                <th >role</th>
                <th >created</th>
                <th >updated</th>
                <th >actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr>
                  <td scope="row">{item.username}</td>
                  <td>
                    <Select
                      style={{ width: "100%" }}
                      value={item.role}
                      onChange={(e) => handleChangeRole(e, item._id)}
                    >
                      {roleData.map((item, index) => (
                        <Select.Option value={item} key={index}>
                          {item == "admin" ? (
                            <Tag color="green">{item}</Tag>
                          ) : (
                            <Tag color="red">{item}</Tag>
                          )}
                        </Select.Option>
                      ))}
                    </Select>
                  </td>
               
                  <td>{moment(item.createdAt).locale("th").format("ll")}</td>
                  <td>
                    {moment(item.updatedAt)
                      .locale("th")
                      .startOf(item.updatedAt)
                      .fromNow()}
                  </td>
                  <td>
                    <FaTrash className="icon1" onClick={() => handleRemove(item._id)} />
                    <FaEdit className="icon2" onClick={() => showModal(item._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Modal
            title="Basic Modal"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>New Password :</p>
            <input
              onChange={handleChangePassword}
              type="text"
              name="password"
            />
          </Modal>
        </div>
    
  );
};

export default ManageAdmin;

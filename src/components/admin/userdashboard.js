import { TextField,Button } from "@mui/material";
import { Formik } from "formik";
import { useEffect, useState } from "react"
import Swal from "sweetalert2";
import app_config from "../../config"
const UserUpdate=(props)=>{
    const url=app_config.api_url
    const userObj = props.userObj;
    
      const usersubmit = (values) => {
        console.log(values);
    
        const reqtion = {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: { 'Content-Type': 'application/json' }
        }

        fetch(url + '/user/update/' + values._id, reqtion)
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                if (data.message) {
                    Swal.fire({
                        icon: 'success',
                        title: 'UPDATED',
                        text: 'Data has been updated'
                    })
                    props.refreshUser();
                }
            })
    }
      return (
        <div>
          <Formik initialValues={props.userObj} 
          onSubmit={usersubmit}>
            {({                 values,
                                handleChange,
                                handleSubmit }) => (
              <form
                style={{ width: "20rem", margin: "auto",marginTop:'5em' }}
                onSubmit={handleSubmit}
              >
                <h1 className="text-center">Update User</h1>
    
                <TextField
                  className="form-control"
                  margin="normal"
                  id="name"
                  label="Name"
                  variant="filled"
                  onChange={handleChange}
                  value={values.name}
                />
                <TextField
                  className="form-control"
                  margin="normal"
                  id="email"
                  label="Email"
                  variant="filled"
                  onChange={handleChange}
                  value={values.email}
                />
                <TextField
                  className="form-control"
                  margin="normal"
                  id="username"
                  label="Username"
                  variant="filled"
                  onChange={handleChange}
                  value={values.username}
                />
               
                <div class="text-center">
                  <Button type="submit" variant="contained" color="success">
                    Update
                  </Button>
    
                </div>
               
               
              </form>
            )}
          </Formik>
        </div>
      );
}

const UserDetail=(props)=>{
    const url=app_config.api_url
    const data = props.userData;

    const deleteUser = (id) => {
        console.log(id);

        fetch(url + '/user/delete/' + id, { method: 'DELETE' })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                props.refreshUser();
            })

    }
    const updateproduct = (data) => {
        console.log(data);
        props.setCurrentObject(data);
        props.toggleUpdateForm();
    }
    return (
        <tr>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.username}</td>
            <td>{data.created}</td>
            <td>
                <button className="btn btn-dark"onClick={(e) => { updateproduct(data) }} ><i class="fas fa-pen-alt"></i> </button>
            </td>
            <td>
                <button className="btn btn-danger" onClick={(e) => { deleteUser(data._id) }}> <i class="fas fa-trash-alt"></i>  </button>
            </td>
        </tr>
    )
}

const UserDash=()=>{

    const url=app_config.api_url
    const [Userlist, setUserlist] = useState()
    const [loading, setloading] = useState(true)

    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [currentObject, setCurrentObject] = useState({});

    const toggleUpdateForm = () => {
        setShowUpdateForm(true);
    }
    const displayUpdateForm = () => {
        if (showUpdateForm && currentObject) {
            return <UserUpdate userObj={currentObject} refreshUser={fetchUserData}></UserUpdate>
        }
    }

    const fetchUserData = () => {
     fetch(url + '/user/getall')
    .then(res => res.json())
    .then((data) => {
        console.log(data);
        setUserlist(data);
        setloading(false);
    })}
    useEffect(() => {
        fetchUserData(setloading);
    }, [])

    const Showproduct=()=>{
        if(!loading){
return(
    <table className="table " style={{color:'black',background:'#dff7df'}}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Created</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Userlist.map((user) => {
                                return (
                                    <UserDetail userData={user} refreshUser={fetchUserData}setCurrentObject={setCurrentObject} toggleUpdateForm={toggleUpdateForm}></UserDetail>
                                )
                            })
                        }
                    </tbody>
                </table>
)
        }
        else{
            return(
                <h1>Still Loading</h1>
            )
        }
    }
    return(
        <div>
            <h1 style={{color:'GrayText', textAlign:'center',background:'white',boxShadow:'1px 5px 5px 1px gray'}} >USER DETAIL</h1>
            
            
            {Showproduct()}
            {displayUpdateForm()}
        </div>
        
    )

}

export default UserDash
import { TextField,Button } from "@mui/material";
import { Formik } from "formik";
import { useEffect, useState } from "react"
import Swal from "sweetalert2";
import app_config from "../../config"
const ProductUpdate=(props)=>{
    const url=app_config.api_url
    const userObj = props.userObj;
    
      const prodsubmit = (values) => {
        console.log(values);
    
        const reqOpt = {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: { 'Content-Type': 'application/json' }
        }

        fetch(url + '/product/update/' + values._id, reqOpt)
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
          onSubmit={prodsubmit}>
            {({                 values,
                                handleChange,
                                handleSubmit }) => (
              <form
                style={{ width: "20rem", margin: "auto",marginTop:'5em' }}
                onSubmit={handleSubmit}
              >
                <h1 className="text-center">Update Products</h1>
    
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
                  id="brand"
                  label="Brand"
                  variant="filled"
                  onChange={handleChange}
                  value={values.brand}
                />
                <TextField
                  className="form-control"
                  margin="normal"
                  id="price"
                  label="Price"
                  variant="filled"
                  onChange={handleChange}
                  value={values.price}
                />
                <TextField
                  className="form-control"
                  margin="normal"
                  id="category"
                  label="Category"
                  variant="filled"
                  onChange={handleChange}
                  value={values.category}
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
const ProductDetail=(props)=>{
    const url=app_config.api_url
    const data = props.userData;

    const deleteUser = (id) => {
        console.log(id);

        fetch(url + '/product/delete/' + id, { method: 'DELETE' })
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
            <td>{data.brand}</td>
            <td>{data.price}$</td>
            <td>{data.category}</td>
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

const Dash=()=>{
    const url=app_config.api_url
    const [Productlist, setProductlist] = useState()
    const [loading, setloading] = useState(true)

    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [currentObject, setCurrentObject] = useState({});

    const toggleUpdateForm = () => {
        setShowUpdateForm(true);
    }
    const displayUpdateForm = () => {
        if (showUpdateForm && currentObject) {
            return <ProductUpdate userObj={currentObject} refreshUser={fetchUserData}></ProductUpdate>
        }
    }

    const fetchUserData = () => {
     fetch(url + '/product/getall')
    .then(res => res.json())
    .then((data) => {
        console.log(data);
        setProductlist(data);
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
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Productlist.map((user) => {
                                return (
                                    <ProductDetail userData={user} refreshUser={fetchUserData}setCurrentObject={setCurrentObject} toggleUpdateForm={toggleUpdateForm}></ProductDetail>
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
            <h1 style={{color:'GrayText', textAlign:'center',background:'white',boxShadow:'1px 5px 5px 1px gray'}} >PRODUCT DETAIL</h1>
            
            
            {Showproduct()}
            {displayUpdateForm()}
        </div>
        
    )
}
export default Dash
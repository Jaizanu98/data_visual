import { Button,  TextField } from "@mui/material";
import { Formik } from "formik";
import Swal from "sweetalert2";
import app_config from "../config";
import "./login.css";
// import { browserHistory } from 'react-router'
const Login = () => {
 
  const url= app_config.api_url

  const signupform = {
    
    email: "",
   
    psword: "",
    
  };

  const formsubmit = (values) => {
    console.log(values);

    fetch(url+'/user/getbyemail/'+values.email)
    .then(res=>res.json())
    .then((userdata)=>{
      console.log(userdata)
      if(userdata){
        if(userdata.psword==values.psword){
          Swal.fire({
            icon:'success',
            title:'ok!',
            text:'loged in successfully'
          })
          .then((data)=>{
            window.location.replace('/admin/userdashboard')

          })
          return
        }
      }
      Swal.fire({
        icon: 'error',
        title: 'OOps!',
        text: 'Email or Password Invalid!!'
    })

    })
  };
  return (
    <div>
      <Formik initialValues={signupform} 
      onSubmit={formsubmit}>
        {({                 values,
                            handleChange,
                            handleSubmit }) => (
          <form
            style={{ width: "20rem", margin: "auto",marginTop:'5em' }}
            onSubmit={handleSubmit}
          >
            <h1 className="text-center">Log In</h1>

           
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
              id="psword"
              label="Password"
              variant="filled"
              onChange={handleChange}
              value={values.psword}
            />
            <div class="text-center">
              <Button type="submit" variant="contained" color="success">
                SUBMIT
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
export default Login;

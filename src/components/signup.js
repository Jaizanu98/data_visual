import { Button,  TextField } from "@mui/material";
import { Formik } from "formik";
import { Link,} from "react-router-dom";

import Swal from "sweetalert2";

import app_config from "../config";
import Login from "./login";

import "./signup.css";
const Signup = () => {

  const url= app_config.api_url
  const signupform = {
    name: "",
    email: "",
    username: "",
    psword: "",
    created: new Date(),
  };

  const formsubmit = (values) => {
    console.log(values);

    const reqopt={
       method:'POST',
       body:JSON.stringify(values),
       headers:{'Content-Type':'application/json'}

     }

     fetch(url+'/user/add',reqopt)
     .then(res=>res.json())
     .then((data)=>{
       console.log(data)
       if (data.message == 'success') {
        Swal.fire({
            icon: 'success',
            title: 'Welldone!',
            text: 'You have successfully registered'
        })
}

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
            <h1 className="text-center">Sign up</h1>

            <TextField
              className="form-control"
              margin="normal"
              id="name"
              label="Full Name"
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
              label="User Name"
              variant="filled"
              onChange={handleChange}
              value={values.username}
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
export default Signup;

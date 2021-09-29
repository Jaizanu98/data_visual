import { Formik } from "formik";
import app_config from "../../config";
import { Button,  TextField } from "@mui/material";
import Swal from "sweetalert2";


const Addprod=()=>{
    const url= app_config.api_url
  const prodform = {
    name:'',
    brand:'',
    price:'',
    category:'',
    created:new Date()
  };

  const prodsubmit = (values) => {
    console.log(values);

    const reqopt={
       method:'POST',
       body:JSON.stringify(values),
       headers:{'Content-Type':'application/json'}

     }

     fetch(url+'/product/insert',reqopt)
     .then(res=>res.json())
     .then((data)=>{
       console.log(data)
       if (data.message == 'success') {
        Swal.fire({
            icon: 'success',
            title: 'Done!',
            text: 'Product Saved '
        })
}

     })
  };
  return (
    <div>
      <Formik initialValues={prodform} 
      onSubmit={prodsubmit}>
        {({                 values,
                            handleChange,
                            handleSubmit }) => (
          <form
            style={{ width: "20rem", margin: "auto",marginTop:'5em' }}
            onSubmit={handleSubmit}
          >
            <h1 className="text-center">Add Products</h1>

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
                ADD
              </Button>

            </div>
           
           
          </form>
        )}
      </Formik>
    </div>
  );
}
export default Addprod
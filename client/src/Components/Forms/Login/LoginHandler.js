import * as Yup from "yup";

export const initialValues={  
  email: "",
  password: "",
};

export const validationSchema = Yup.object({ 
  email: Yup.string().email("Invalid Email").required("Email shouldn't be empty"),
  password: Yup.string()
    .min(4, "Password must be 4 characters or more")
    .max(30, "Password must be 30 characters or less").required("Password shouldn't be empty"),
});


export const handleSubmit = (values)=>{

    console.log(values); 
}
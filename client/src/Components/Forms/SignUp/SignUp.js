import  React,{useState} from "react";
import { Formik, Field, Form } from "formik";
import { initialValues, validationSchema, handleSubmit } from "./SignUpHandler";
import {
  CustomInputComponentForText,
  CustomInputComponentForSelect,
  CustomInputComponentForPassword
} from "../Common";
import "../Common.css";

export default function SignUp(props) {
let {subCategories} = props;

    if(typeof subCategories == "undefined" || subCategories.length < 2){
      return <h1>Loading</h1>
    }
  return (
    <div className="container-fluid ">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, {resetForm})=>handleSubmit(values, subCategories, resetForm)}
      >
        <Form>
          <div className="container-fluid formsMain" style={{marginTop:"2rem"}}>
            <Field
              name="name"
              component={CustomInputComponentForText}
              placeholder="Enter Name"
              className="formsInput"
            />
            <Field
              name="userName"
              component={CustomInputComponentForText}
              placeholder="Enter UserName"
              className="formsInput"
            />
            <Field
              name="email"
              component={CustomInputComponentForText}
              placeholder="Enter Email"
              className="formsInput"
            />
            <Field
              name="password"
              component={CustomInputComponentForPassword}
              placeholder="Enter Password"
              className="formsInput"
            />
           
            <Field
              name="favouriteSubCategories"
              component={CustomInputComponentForSelect}
              placeholder="Favourite Subjects"
              className="formsInput"
              data={props.subCategories.map(s=>s.name)}
              multiple
              
            />
            <button type="submit" className="formsBtn">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

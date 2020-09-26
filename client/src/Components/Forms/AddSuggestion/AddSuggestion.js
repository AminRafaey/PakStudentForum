import  React,{useEffect} from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { initialValues, validationSchema,  handleSubmit } from "./AddSuggestionHandler";
import {
  CustomInputComponentForText,
  CustomInputComponentForSelect,

} from "../Common";
import "../Common.css";


export default function AddSuggestion(props) {
  const options = ["a", "b", "c", "d"];
let {user} = props;
console.log(user);
  return (
    <div className="container-fluid" >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, {resetForm})=>handleSubmit(values, user._id, resetForm)}
      >
        <Form>
          <div  className="container-fluid formsMain" style={{marginTop:"2rem"}}>
          <div className="row">
            <div className="col-md-3">
                <label htmlFor="statement" style={{fontSize:"1.5rem", marginTop:"1.5rem"}}>
                  Statement
                </label>
                </div>
                <div className="col-md-6">
                <Field
                  name="statement"
                  as="textarea"
                  placeholder="Enter statement"
                  className=".formsTextArea"
                  style={{display:"inline"}}
                />
                </div>
                <div style={{ color: "red" }}>
                  <ErrorMessage name="statement" />
                </div>
            </div>

            <Field
              name="a"
              component={CustomInputComponentForText}
              placeholder="Option-A"
              className="formsInput"
            />
            <Field
              name="b"
              component={CustomInputComponentForText}
              placeholder="Option-B"
              className="formsInput"
            />
            <Field
              name="c"
              component={CustomInputComponentForText}
              placeholder="Option-C"
              className="formsInput"
            />
            <Field
              name="d"
              component={CustomInputComponentForText}
              placeholder="Option-D"
              className="formsInput"
            />
           
            <Field
              name="correct"
              component={CustomInputComponentForSelect}
              placeholder="Correct"
              className="formsInput"
              data={options}
              
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

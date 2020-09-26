import React, { useEffect } from "react";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import { CustomInputComponentForSubCat } from "./Common";
import {
  subCategories,
  handleSubmit,
  validationSchema,
} from "./HandlerForSubCat";
import { fetchSubCategories } from "../../Services/FetchSubCategories";
import {
  CustomInputComponentForText,
  CustomInputComponentForSelect,
} from "../../Components/Forms/Common";
import {
  initialValues as initialValuesForCat,
  validationSchema as validationSchemaForCat,
  handleSubmit as handleSubmitForCat,
} from "./HandlerForCat";

export const UI = (props) => {
  useEffect(() => {
    if (!(props.subCategories.length > 1)) {
      fetchSubCategories().then((res) => props.setSubCategories(res));
    }
  }, [props]);

  
  return (
    <div className = "row">
    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
      {addCat(props)}
      </div>
      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12" >
      <Formik
        initialValues={subCategories}
        validationSchema={validationSchema}
        onSubmit={(values) =>
          handleSubmit(values, props.subCategories, props.setSubCategories)
        }
      >
        <Form>
          <FieldArray
            name="name"
            component={(fieldArrayProps) =>
              CustomInputComponentForSubCat(fieldArrayProps)
            }
            className="form-control"
          />
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-success"
            style={{ marginLeft: "10%", marginBottom: "1rem" }}>
              Submit
            </button>
          </div>
        </Form>
      </Formik>
      </div>
    </div>
  );
};

const addCat=({subCategories, categories, setCategories})=>
   (
    <div className="container-fluid mb-2 jumbotron">
      <Formik
        initialValues={initialValuesForCat}
        validationSchema={validationSchemaForCat}
        onSubmit={(values)=>handleSubmitForCat(values, subCategories, categories, setCategories)}
      >
        <Form>
          <div className="">
            <Field
              name="name"
              component={CustomInputComponentForText}
              placeholder="Name"
              className="form-control"
            />
            <div className="row">
              <div className="col-md-3">
                <label
                  htmlFor="statement"
                  style={{ fontSize: "1.5rem", marginTop: "1.5rem" }}
                >
                  Description
                </label>
              </div>
              <div className="col-md-6">
            <Field
            name="description"
            as="textarea"
            placeholder="Enter Description"
            className=".formsTextArea"
            style={{ display: "inline" }}
          />
          </div>
        <div style={{ color: "red" }}>
          <ErrorMessage name="description" />
        </div>
        </div>
            <Field
              name="subCategories"
              component={CustomInputComponentForSelect}
              placeholder="Sub-Category"
              className="form-control"
              data={subCategories.map((s) => s.name)}
              multiple
            />
          </div>
          <div className=" pt-2 d-flex justify-content-center">
            <button type="submit" className="btn btn-success"
            style={{ marginLeft: "10%", marginBottom: "1rem" }}>
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );


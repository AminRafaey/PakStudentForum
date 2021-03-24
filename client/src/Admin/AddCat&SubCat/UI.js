import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Spinner from "../../UIHandlers/Spinner";

import {
  subCategories,
  handleSubmit,
  validationSchema,
} from "./HandlerForSubCat";
import {
  CustomInputComponentForText,
  CustomInputComponentForSelect,
} from "../../Components/Forms/Common";
import {
  initialValues as initialValuesForCat,
  validationSchema as validationSchemaForCat,
  handleSubmit as handleSubmitForCat,
} from "./HandlerForCat";
import { initialValues } from "../AddMcq/Handler";

export const UI = (props) => {
  const [open, setOpen] = useState(false);
  // useEffect(() => {
  //   if (!(props.subCategories.length > 1)) {
  //     fetchSubCategories().then((res) => props.setSubCategories(res));
  //     setOpen(false);
  //   }
  // }, [props]);

  return (
    <div className="row">
      <Spinner open={open} setOpen={setOpen} />
      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
        {addCat(props, setOpen)}
      </div>

      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) =>
            handleSubmit(
              values,
              props.subCategories,
              props.setSubCategories,
              resetForm,
              setOpen
            )
          }
        >
          <Form>
            <h1>Add SubCategory</h1>
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
            </div>

            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-success"
                style={{ marginLeft: "10%", marginBottom: "1rem" }}
              >
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

const addCat = (
  { subCategories, categories, setCategories, categoryInitVal },
  setOpen
) => (
  <div
    className="container-fluid mb-2"
    style={{ borderRight: "1px solid gray" }}
  >
    <Formik
      initialValues={
        categoryInitVal
          ? {
              name: categoryInitVal.name,
              description: categoryInitVal.description,
              subCategories: categoryInitVal.subCategories.map(
                (c) => subCategories.find((s) => s._id === c).name
              ),
            }
          : initialValuesForCat
      }
      validationSchema={validationSchemaForCat}
      onSubmit={(values, { resetForm }) =>
        handleSubmitForCat(
          values,
          subCategories,
          categories,
          setCategories,
          categoryInitVal,
          resetForm,
          setOpen
        )
      }
    >
      <Form>
        <h1>Add Category</h1>
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
          <button
            type="submit"
            className="btn btn-success"
            style={{ marginLeft: "10%", marginBottom: "1rem" }}
          >
            Submit
          </button>
        </div>
      </Form>
    </Formik>
  </div>
);

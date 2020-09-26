import React from "react";
import { Field } from "formik";

export const CustomInputComponentForSubCat = ({
  form: {
    values: { name },
  },
  form: { touched, errors },
  ...props
}) => (
  <div>
    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
      <div className="form-group">
        <label htmlFor="name" className="h5">
          Sub-Category Name:
        </label>
        {name.map((n, index) => (
          <div key={index}>
            <Field name={`name[${index}]`} />
            {index > 0 && (
              <button
                type="button"
                onClick={() => props.remove(index)}
                className="btn btn-success"
            style={{ marginLeft: "10%", marginBottom: "1rem" }}
                
              >
                {""}Remove{""}
              </button>
            )}
            <button
              type="button"
              onClick={() => props.push("")}
              className="btn btn-success"
            style={{ marginLeft: "10%", marginBottom: "1rem" }}
            >
              {""}Add{""}
            </button>
            <br />
          </div>
        ))}
        {touched["name"] && errors["name"] && (
          <div className="error" style={{ color: "red" }}>
            {errors["name"]}
          </div>
        )}
      </div>
    </div>
  </div>
);

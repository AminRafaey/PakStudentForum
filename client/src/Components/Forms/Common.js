import React from "react";

export const CustomInputComponentForText = ({
  field,
  form: { touched, errors },
  ...props
}) => (
  <div>
  <div className="row">
  <div className="col-md-3">
        <label htmlFor={field.name} style={{marginTop:"0.7rem", fontSize:"1.5rem"}}>
          {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
        </label>
        </div>
        <div className="col-md-4">
        <input {...field} {...props} />
        </div>
        {touched[field.name] && errors[field.name] && (
          <div style={{color:"red"}}>{errors[field.name]}</div>
        )}
      </div>
    </div>
);


export const CustomInputComponentForSelect = ({
    field, 
    form: { touched, errors }, 
    data,
    ...props
  }) => (
    <div className="">
    <div className="row">
    <div className="col-md-3">
          <label htmlFor={field.name} style={{marginTop:"0.7rem", fontSize:"1.5rem"}}>
            {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
          </label>
          </div>
          <div className="col-md-4">
          <select {...field} {...props}>
          {data.map((d) => (
            <option key={d} value={d}>
              {d}{" "}
            </option>
          ))}
          </select>
          </div>
          {touched[field.name] && errors[field.name] && (
            <div style={{color:"red"}}>{errors[field.name]}</div>
          )}
      </div>
      </div>
  );

  export const CustomInputComponentForPassword = ({
    field,
    form: { touched, errors },
    ...props
  }) => (
    <div>
    <div className="row">
    <div className="col-md-3">
          <label htmlFor={field.name} style={{marginTop:"0.7rem", fontSize:"1.5rem"}}>
            {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
          </label>
          </div>
          <div className="col-md-4">
          <input {...field} {...props} type="password"/>
          </div>
          {touched[field.name] && errors[field.name] && (
            <div style={{color:"red"}}>{errors[field.name]}</div>
          )}
        </div>
      </div>
  );
  
import React from "react";
import { Formik, Field, Form } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import { initialValues, validationSchema } from "./LoginHandler";
import {
  CustomInputComponentForText,
  CustomInputComponentForPassword,
} from "../Common";
import "../Common.css";
import { Auth } from "../../../Services/Auth";

export default function Login(props) {
  const { setUser } = props;
  let location = useLocation();
  let history = useHistory();
  let { from } = location.state || { from: { pathname: "/" } };

  async function auth(values) {
    try {
      const res = await Auth(values);
      localStorage.setItem("token", res.token);
      setUser(res.data);
      history.replace(from);
    } catch {}
  }
  return (
    <div style={{height:window.innerHeight, width:window.innerWidth}}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={auth}
        className="d-flex justify-content-center"
      >
        <Form>
          <div
            className="container-fluid formsMain"
            style={{ marginTop: "2rem" }}
          >
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

            <button type="submit" className="formsBtn">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
      </div>
  );
}

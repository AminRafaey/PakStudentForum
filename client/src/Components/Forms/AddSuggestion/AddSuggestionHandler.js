import * as Yup from "yup";
import {suggestion} from "../../../Services/Suggestion"

export const initialValues={
  
 
  statement: "",
  a: "",
  b: "",
  c: "",
  d: "",
  correct: "",
};


export const validationSchema = Yup.object({
  statement: Yup.string()
    .min(5, "Statement must be 5 characters or more")
    .max(600, "Statement must be 600 characters or less")
    .required("Statement shouldn't be empty"),
  a: Yup.string()
    .min(1, "Option-A must be 1 characters or more")
    .max(300, "Option-A must be 300 characters or less")
    .required("Option-A shouldn't be empty"),
  b: Yup.string()
    .min(1, "Option-B must be 1 characters or more")
    .max(300, "Option-B must be 300 characters or less")
    .required("Option-B shouldn't be empty"),
  c: Yup.string()
    .min(1, "Option-C must be 1 characters or more")
    .max(300, "Option-C must be 300 characters or less"),
  d: Yup.string()
    .min(1, "Option-D must be 1 characters or more")
    .max(300, "Option-D must be 300 characters or less"),
  correct: Yup.string()
    .oneOf(["a", "b", "c", "d"])
    .required("Correct option Field shouldn't be empty"),
});

export const handleSubmit = (values, learnerId, resetForm)=>{
suggestion({learnerId:learnerId,
  statement:values.statement,
  options:{
    a:values.a,
    b:values.b,
    c:values.c,
    d:values.d,
    correct:values.correct
  }}, resetForm);
}
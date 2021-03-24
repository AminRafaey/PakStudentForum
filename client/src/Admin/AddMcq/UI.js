import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { fetchSubCategories } from "../../Services/FetchSubCategories";
import Spinner from "../../UIHandlers/Spinner";
import { initialValues, validationSchema, handleSubmit } from "./Handler";
import {
  CustomInputComponentForText,
  CustomInputComponentForSelect,
} from "../../Components/Forms/Common";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function UI({
  subCategories,
  setSubCategories,
  mcqInitVal,
  setMcqInitVal,
  categories,
  ...rest
}) {
  const options = ["a", "b", "c", "d"];
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  const classes = useStyles();
  const [selectedCategory, setSelectedCategory] = React.useState("");

  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    console.log(event.target.value);
    setSelectedSubCategories(
      subCategories.filter((s) =>
        event.target.value.subCategories.includes(s._id)
      )
    );
  };
  console.log(mcqInitVal);
  return (
    <div className="container-fluid mb-2 ">
    <Spinner open={open} setOpen={setOpen} />
      <Formik
        initialValues={
          mcqInitVal
            ? {
                statement: mcqInitVal.statement,
                a: mcqInitVal.a,
                b: mcqInitVal.b,
                c: mcqInitVal.c,
                d: mcqInitVal.d,
                correct: mcqInitVal.correct,
                subCategories: mcqInitVal.subCategories,
                difficultyLevel: mcqInitVal.difficultyLevel,
              }
            : initialValues
        }
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) =>
          handleSubmit(
            values,
            subCategories,
            mcqInitVal,
            setMcqInitVal,
            resetForm,
            setOpen
          )
        }
      >
        <Form>
          <div className="container" style={{ marginTop: "2rem" }}>
            {mcqInitVal.errorCategory ? (
              <div>
                <h4>{"Error Category: " + mcqInitVal.errorCategory}</h4>
                <br />
                <h4>{"Statement: " + mcqInitVal.errorStatement}</h4>
                <br />
                <br />
              </div>
            ) : null}
            <div className="row">
              <div className="col-md-3">
                <label
                  htmlFor="statement"
                  style={{ fontSize: "1.5rem", marginTop: "1.5rem" }}
                >
                  Statement
                </label>
              </div>
              <div className="col-md-6">
                <Field
                  name="statement"
                  as="textarea"
                  placeholder="Enter statement"
                  className=".formsTextArea"
                  style={{ display: "inline" }}
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
              className="form-control"
            />
            <Field
              name="b"
              component={CustomInputComponentForText}
              placeholder="Option-B"
              className="form-control"
            />
            <Field
              name="c"
              component={CustomInputComponentForText}
              placeholder="Option-C"
              className="form-control"
            />
            <Field
              name="d"
              component={CustomInputComponentForText}
              placeholder="Option-D"
              className="form-control"
            />

            <Field
              name="correct"
              component={CustomInputComponentForSelect}
              placeholder="Correct"
              className="form-control"
              data={options}
            />
            <Field
              name="difficultyLevel"
              component={CustomInputComponentForSelect}
              placeholder="Difficulty Level"
              className="form-control"
              data={["Eazy", "Normal", "Difficult"]}
            />

            <br />
            <br />
            <div className="row">
              <div className="col-md-4 h5">Select Category</div>

              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={selectedCategory}
                  onChange={handleChange}
                  label="selectedSubCategories"
                >
                  {categories.map((c) => (
                    <MenuItem value={c} key={c._id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <Field
              name="subCategories"
              component={CustomInputComponentForSelect}
              placeholder="Sub-Category"
              className="form-control"
              data={selectedSubCategories.map((s) => s.name)}
              multiple
            />
          </div>
          <div className=" pt-2 d-flex justify-content-end">
            <button type="submit" className="formsBtn">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
      {mcqInitVal.userName ? <h5>Suggested By {mcqInitVal.userName}</h5> : null}
    </div>
  );
}

import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import Spinner from "../../../UIHandlers/Spinner";

import { initialValues, validationSchema, handleSubmit } from "./SignUpHandler";
import {
  CustomInputComponentForText,
  CustomInputComponentForPassword,
} from "../Common";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";

import "../Common.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, categoryName, theme) {
  return {
    fontWeight:
      categoryName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SignUp(props) {
  let { categories } = props;

  const classes = useStyles();
  const theme = useTheme();
  const [categoryName, setCategoryName] = React.useState([]);

  const [categoryNameError, setCategoryNameError] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setCategoryName(event.target.value);
  };

  if (typeof categories == "undefined" || categories.length < 1) {
    return <Spinner open={true} setOpen={setOpen} />;
  }
  return (
    <div style={{ backgroundColor: "#f2f2f2" }}>
      {open === true ? <Spinner open={true} setOpen={setOpen} /> : ""}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) =>
          handleSubmit(
            values,
            categoryName,
            resetForm,
            setCategoryNameError,
            setOpen
          )
        }
      >
        <Form>
          <div
            className="container-fluid formsMain"
            style={{ marginTop: "2rem" }}
          >
            {console.log(categoryName)}
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

            <div className="row">
              <div className="col-md-3">
                <label style={{ marginTop: "0.7rem", fontSize: "1.5rem" }}>
                  Major Subjects
                </label>
              </div>
              <div className="col-md-4">
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-mutiple-chip-label">Subjects</InputLabel>
                  <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={categoryName}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                      <div className={classes.chips}>
                        {selected.map((value) => (
                          <Chip
                            key={value._id}
                            label={value.name}
                            className={classes.chip}
                          />
                        ))}
                      </div>
                    )}
                    MenuProps={MenuProps}
                  >
                    {categories.map((name) => (
                      <MenuItem
                        key={name._id}
                        value={name}
                        style={getStyles(name, categoryName, theme)}
                      >
                        {name.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {categoryName.length < 1 ? (
                  <div style={{ color: "red" }}>{categoryNameError}</div>
                ) : (
                  ""
                )}
              </div>
            </div>

            <button type="submit" className="formsBtn">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

import { baseUrl } from "../config.json";
import axios from "axios";

const apiEndpointForSubCat = baseUrl + "/subCategory";
const apiEndpointForCat = baseUrl + "/category";

export async function addSubCat(
  values,
  subCategories,
  setSubCategories,
  resetForm,
  setOpen
) {
  try {
    setOpen(true);
    axios.defaults.headers.common["x-auth-token"] = await localStorage.getItem(
      "token"
    );
    const res = await axios.post(apiEndpointForSubCat, values);
    if (res.status === 200) {
      alert("Successfully Added: \n");
      resetForm({});
      setOpen(false);
      setSubCategories(subCategories.concat(res.data.field.data));
    }
  } catch (ex) {
    console.log("=> exception => ", ex);
    if (!ex.response) {
      setOpen(false);
      alert("Please check your internet connection");
    } else if (ex.response && ex.response.status < 500) {
      setOpen(false);
      const { field } = ex.response.data;
      alert("Server Validation Error: \n" + field.name + " : " + field.message);
    } else {
      setOpen(false);
      alert("Server Validation Error: Invalid Data Poted!");
    }
  }
}

export async function addCat(values, resetForm, setOpen) {
  try {
    setOpen(true);
    const res = await axios.post(apiEndpointForCat, values);
    if (res.status === 200) {
      resetForm({});
      setOpen(false);
      alert("Successfully Added: \n");
    }
  } catch (ex) {
    if (!ex.response) {
      setOpen(false);
      alert("Please check your internet connection");
    } else if (ex.response && ex.response.status < 500) {
      setOpen(false);
      const { field } = ex.response.data;
      alert("Server Validation Error: \n" + field.name + " : " + field.message);
    } else {
      setOpen(false);
      alert("Server Validation Error: Invalid Data Poted!");
    }
  }
}

export async function updateCat(values, resetForm, setOpen) {
  try {
    setOpen(true);
    const res = await axios.put(apiEndpointForCat, values);
    if (res.status === 200) {
      resetForm({});
      setOpen(false);
      alert("Successfully Updated: \n");
    }
  } catch (ex) {
    if (!ex.response) {
      setOpen(false);
      alert("Please check your internet connection");
    } else if (ex.response && ex.response.status < 500) {
      setOpen(false);
      const { field } = ex.response.data;
      alert("Server Validation Error: \n" + field.name + " : " + field.message);
    } else {
      setOpen(false);
      alert("Server Validation Error: Invalid Data Poted!");
    }
  }
}

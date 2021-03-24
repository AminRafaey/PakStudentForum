import { baseUrl } from "../config.json";
import axios from "axios";

const apiEndpoint = baseUrl + "/learner";

export async function postLearner(value, resetForm, setOpen) {
  try {
    setOpen(true);
    axios.defaults.headers.common["x-auth-token"] = await localStorage.getItem(
      "token"
    );
    const res = await axios.post(apiEndpoint, value);
    setOpen(false);
    alert(res.data.field.message);
    resetForm({});
  } catch (ex) {
    if (!ex.response) {
      setOpen(false);
      alert("Please check your internet connection");
    } else {
      setOpen(false);
      alert("Server Error" + "\n" + ex.response.data.field.message);
      console.log(ex.response.data.field.error);
    }
  }
}

export async function verifyLearner(_id) {
  try {
    const res = await axios.put(apiEndpoint + "/verified", { _id: _id });
    console.log(res);
    alert("Successfully Verified");
    return res;
  } catch (ex) {
    if (!ex.response) {
      alert("Please check your internet connection");
      return null;
    } else {
      alert("Server Error" + "\n" + ex.response.data.field.message);
      return null;
    }
  }
}

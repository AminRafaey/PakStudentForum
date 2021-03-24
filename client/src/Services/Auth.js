import { baseUrl } from "../config.json";
import axios from "axios";
const apiEndpointForAuth = baseUrl + "/auth";

export async function Auth(values) {
  try {
    const res = await axios.post(apiEndpointForAuth, values);
    if (res.status === 200) {
      return { token: res.headers["x-auth-token"], data: res.data.field.data };
    }
  } catch (ex) {
    console.log("=> exception => ", ex);
    if (!ex.response) {
      alert("Please check your internet connection");
      return null;
    } else if (ex.response && ex.response.status < 500) {
      const { field } = ex.response.data;
      alert("Server Validation Error: \n" + field.name + " : " + field.message);
      return null;
    } else {
      alert("Server Validation Error: Invalid Data Poted!");
      return null;
    }
  }
}

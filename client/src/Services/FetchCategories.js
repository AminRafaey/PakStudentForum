import { baseUrl } from "../config.json";
import axios from "axios";

const apiEndpoint = baseUrl + "/home";

export async function fetchCategories() {
  try {
    axios.defaults.headers.common["x-auth-token"] = await localStorage.getItem(
      "token"
    );
    const res = await axios(apiEndpoint);
    if (res.status === 200) return res.data.field.data;
  } catch (ex) {
    console.log(ex);
    if (!ex.response) {
      alert("Please check your internet connection");
      return [];
    } else {
      alert("Server Error", ex.response.data.field.message);
      return [];
    }
  }
}

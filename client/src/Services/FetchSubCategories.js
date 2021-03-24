import { baseUrl } from "../config.json";
import axios from "axios";

const apiEndpoint = baseUrl + "/subCategory";

export async function fetchSubCategories(subCategories) {
  try {
    axios.defaults.headers.common["x-auth-token"] = await localStorage.getItem(
      "token"
    );
    const res = await axios(apiEndpoint);
    if (res.status === 200) return res.data.field.data;
  } catch (ex) {
    if (!ex.response) {
      alert("Please check your internet connection");
      return { _id: "", name: "" };
    } else {
      alert("Server Error", ex.response.data.field.message);
      return { _id: "", name: "" };
    }
  }
}

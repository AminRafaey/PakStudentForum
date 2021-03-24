import { baseUrl } from "../config.json";
import axios from "axios";
const apiEndpoint = baseUrl + "/feedback";

export async function FetchSuggestionsOrProblems(start, pageSize, pageNumber) {
  try {
    axios.defaults.headers.common["x-auth-token"] = await localStorage.getItem(
      "token"
    );
    const res = await axios(
      `${apiEndpoint}/${start}/${pageSize}/${pageNumber}`
    );
    if (res.status === 200) return res.data.field.data;
  } catch (ex) {
    if (!ex.response) {
      alert("Please check your internet connection");
      return [];
    } else if (ex.response && ex.response.status < 500) {
      const { field } = ex.response.data;
      alert("Server Validation Error: \n" + field.name + " : " + field.message);
      return [];
    } else {
      alert("Server Error", ex);
      return [];
    }
  }
}

export async function DeleteSuggestionOrProblem(start, _id) {
  try {
    const res = await axios.delete(`${baseUrl}/${start}/${_id}`);
    alert("Successfully Deleted");
  } catch (ex) {
    if (!ex.response) {
      alert("Please check your internet connection");
    } else if (ex.response && ex.response.status < 500) {
      const { field } = ex.response.data;
      alert("Server Validation Error: \n" + field.name + " : " + field.message);
    } else {
      alert("Server Error", ex);
    }
  }
}

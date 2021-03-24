import { baseUrl } from "../config.json";
import axios from "axios";
import jwtDecode from "jwt-decode";
const apiEndpoint = baseUrl + "/feedBack";

export async function fetchComments(mcqId, setComments) {
  try {
    axios.defaults.headers.common["x-auth-token"] = await localStorage.getItem(
      "token"
    );
    const res = await axios(`${apiEndpoint}/comments/${mcqId}`);
    setComments(res.data.field.data);
  } catch (ex) {
    if (!ex.response) {
      alert("Please check your internet connection");
    } else {
      alert("Server Error" + "\n" + ex.response.data.field.message);
    }
  }
}

export async function PostComment(value, setOpen, setComments, comments) {
  try {
    let user = jwtDecode(localStorage.getItem("token"));
    const res = await axios.post(`${apiEndpoint}/comment`, value);
    setComments(
      [...comments].concat({
        statement: value.statement,
        learnerId: { name: user.name },
        date: "" + new Date(),
      })
    );
    document.getElementById("templateTextArea").value = "";
  } catch (ex) {
    if (!ex.response) {
      alert("Please check your internet connection");
    } else {
      alert("Server Error" + "\n" + ex.response.data.field.message);
    }
  }
}

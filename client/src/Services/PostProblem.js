import { baseUrl } from "../config.json";
import axios from "axios";
const apiEndpoint = baseUrl + "/feedBack/problem";

export async function PostProblem(value, setOpen) {
  try {
    axios.defaults.headers.common["x-auth-token"] = await localStorage.getItem("token");
    const res = await axios.post(apiEndpoint, value);
    alert(res.data.field.message) ;
    setOpen(false);
    
  } catch (ex) {
    if (!ex.response) {
      alert("Please check your internet connection");
    
    } else {
      alert("Server Error"+"\n"+ ex.response.data.field.message);
     
    }
  }
}
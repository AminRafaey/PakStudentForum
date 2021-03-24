import { baseUrl } from "../config.json";
import axios from "axios";


const apiEndpoint = baseUrl + "/mcq/suggestion";

export async function suggestion(value, resetForm, setOpen){
  try {
    setOpen(true);
    axios.defaults.headers.common["x-auth-token"] = await localStorage.getItem("token");
    const res = await axios.post(apiEndpoint, value);
    setOpen(false);
    alert(res.data.field.message) ;
    resetForm({})
  } catch (ex) {
    if (!ex.response) {
      setOpen(false);
      alert("Please check your internet connection");
    
    } else {
      setOpen(false);
      alert("Server Error"+"\n"+ ex.response.data.field.message);
     
    }
  }
}
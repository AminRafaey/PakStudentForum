import { baseUrl } from "../config.json";
import axios from "axios";
const apiEndpoint = baseUrl + "/dailyTest";

export async function fetchTestMcq(
  _id,
  setMcqs,
  setSubCategoryName,
  setAlreadyAttempWarning
) {
  try {
    axios.defaults.headers.common["x-auth-token"] = await localStorage.getItem(
      "token"
    );
    const res = await axios(`${apiEndpoint}/${_id}/${10}`);
    setMcqs(res.data.field.data);
    setSubCategoryName(res.data.field.subCategoryName.name);

  } catch (ex) {
    if (!ex.response) {
      console.log("no response");
      alert("Please check your internet connection");
    } else {
      if (
        ex.response.data &&
        ex.response.data.field.message === "Already Attempted"
      ) {
        setAlreadyAttempWarning(
          "You already have been attempted today's test. You can only attempt one test in 24 hours. Now you can attempt after 12 midnight"
        );
        setAlreadyAttempWarning(
          "You already have been attempted today's test. You can only attempt one test in 24 hours. Now you can attempt after 12 midnight"
        );
        return;
      }
      alert("Server Error" + "\n" + ex.response.data.field.message);
    }
  }
}

export async function storeResult(data) {
  try {
    const res = await axios.post(`${apiEndpoint}`, data);
    console.log(res);
  } catch (ex) {
    if (!ex.response) {
      alert("Please check your internet connection");
    } else {
      alert("Server Error" + "\n" + ex.response.data.field.message);
    }
  }
}

import { baseUrl } from "../config.json";
import axios from "axios";
const apiEndpoint = baseUrl + "/mcq";

export async function fetchMcq(
  difficultyLevel,
  subCategoryId,
  pageSize,
  pageNumber,
  setMcqs,
  isMcqCountNeeded,
  setLAPCount, setOpen
) {
  try {
    axios.defaults.headers.common["x-auth-token"] = await localStorage.getItem(
      "token"
    );
    setOpen(true);
    const res = await axios(
      `${apiEndpoint}/${difficultyLevel}/${subCategoryId}/${pageSize}/${pageNumber}/${isMcqCountNeeded}`
    );
    if (res.status === 200) {
      setMcqs(res.data.field.data);
      if (res.data.field.count) {
        setLAPCount(res.data.field.count);
      }
      if (res.data.field.count == 0) {
        setLAPCount(0);
      }
    }
    setOpen(false);
  } catch (ex) {
    if (!ex.response) {
      setOpen(false);
      alert("Please check your internet connection");
      setMcqs([
        {
          statement: "",
          options: {
            a: "",
            b: "",
            c: "",
            d: "",
            correct: "",
          },
        },
      ]);
    } else {
      setOpen(false);
      alert("Server Error" + "\n" + ex.response.data.field.message);
      setMcqs([
        {
          statement: "",
          options: {
            a: "",
            b: "",
            c: "",
            d: "",
            correct: "",
          },
        },
      ]);
    }
  }
}

export async function AdminFetchMcqs(subCategoryId, pageSize, pageNumber) {
  try {
    const res = await axios(
      `${apiEndpoint}/${subCategoryId}/${pageSize}/${pageNumber}/${false}`
    );
    if (res.status === 200) return res.data.field.data;
  } catch (ex) {
    if (!ex.response) {
      alert("Please check your internet connection");
      return null;
    } else if (ex.response && ex.response.status < 500) {
      const { field } = ex.response.data;
      alert("Server Validation Error: \n" + field.name + " : " + field.message);
      return null;
    } else {
      alert("Server Error", ex);
      return null;
    }
  }
}

export async function addMcq(mcq, resetForm, setOpen) {
  try {
    setOpen(true);
    const res = await axios.post(apiEndpoint, mcq);
    if (res.status === 200) {
      alert("Successfully Added");
      resetForm({});
      setOpen(false);
    }
  } catch (ex) {
    console.log("=> exception => ", ex);
    if (!ex.response) {
      setOpen(false);
      alert("Please check your internet connection");
    } else if (ex.response.data.field.name === "statement") {
      setOpen(false);
      alert("Mcq with the same statement already exist");
    } else if (ex.response && ex.response.status < 500) {
      setOpen(false)
      const { field } = ex.response.data;
      alert("Server Validation Error: \n" + field.name + " : " + field.message);
    } else {
      setOpen(false);
      alert("Server Validation Error: Invalid Data Poted!");

    }
  }
}

export async function updateMcq(mcq, resetForm, setOpen) {
  try {
    setOpen(true);
    const res = await axios.put(apiEndpoint, mcq);
    console.log(res);

    if (res.status === 200) {
      alert(res.data.field.message);
      resetForm({});
      setOpen(false)
    }
  } catch (ex) {
    console.log("=> exception => ", ex);
    if (!ex.response) {
      setOpen(false);
      alert("Please check your internet connection");
    } else if (ex.response.data.field.name === "statement") {
      setOpen(false);
      alert("Mcq with the same statement already exist");
    } else if (ex.response && ex.response.status < 500) {
      setOpen(false)
      const { field } = ex.response.data;
      alert("Server Validation Error: \n" + field.name + " : " + field.message);
    } else {
      setOpen(false);
      alert("Server Validation Error: Invalid Data Poted!");

  }
  }
}

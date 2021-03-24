import React, { useState } from 'react';
import "./ReportProblem.css";
import {handleSubmit} from "./ReportProblemHandler";

export default function ReportProblem(props) {
const [errorCategory, setErrorCategory] = useState("");
  let {mcq_id, setOpen} = props;

    const errorType = ["The Options are wrong",
    "I caught a typo",
    "MCQ statement is not valid"];
    const [errorTypeMsg, setErrorTypeMsg] = useState("");
    const [message, setMessage] = useState("");
    const [messageError, setMessageError] = useState("");

  return (
    <div style={{width:window.innerWidth-(window.innerWidth/2)}}>
   
    <label htmlFor="errorType" className="h5">
      Error Type:
    </label>

    <div style={{ color: "red", marginBottom:"1rem" }}>{errorTypeMsg}</div>
    
    {errorType.map((e) => (
      <div key={e}>
        <input type="radio" id={e} value={e} name="errorType" style={{marginBottom:"2rem", marginRight:"1rem"}} onClick={()=>setErrorCategory(e)}/>
        {e}
      </div>
    ))}
 
  <textarea
        id="templateTextArea"
        placeholder="Write an description about error"
        onChange={(e) => setMessage(e.target.value)}
      />
      <div style={{ color: "red", marginBottom:"1rem" }}>{messageError}</div>
      <div className=" d-flex justify-content-end">
      <button type="button" className="btn btn-success" onClick={()=>handleSubmit(errorCategory, message,  setErrorTypeMsg, mcq_id,setMessageError, setOpen)}>Submit</button>
      </div>
    </div>
  );
};
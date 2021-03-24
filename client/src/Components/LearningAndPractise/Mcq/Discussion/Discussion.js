
import  React, { useState, useEffect } from 'react';
import "./Discussion.css";
import {fetchComments} from "../../../../Services/Comment";
import {handleSubmit} from "./DiscussionHandler"

export default function Discussion(props) {
  let {mcqId, userId ,setOpen} = props;
  const [comments, setComments] = useState([{statement:"",date:" ", learnerId:{name:""}}]);
console.log(mcqId);
useEffect(()=>{async function fetchData() {
  await fetchComments(mcqId,setComments);
}
fetchData()},[])
const [message, setMessage] = useState("");
const [messageError, setMessageError] = useState("")

  return (
    <div style={{width:window.innerWidth-(window.innerWidth/2)}}>
    {
      comments.map(c=><div style={{marginBottom:"2rem"}}>
      {console.log(c)}
        <img src="/person-placeholder-image.jpg" style={{width:"5rem", height:"5rem"}}/>
        <p className="ml-2" style={{display:"inline"}}>{c.statement}</p>
        <h6 className="ml-4">{c.learnerId.name}</h6>
        <h6 className="ml-2">{(" "+c.date).slice(0,11)}</h6>
        {console.log(typeof c.date)}
        </div>)
    }
    <textarea
    id="templateTextArea"
    className="DiscussionTextArea"
    placeholder="Write Something"
    onChange={(e) => setMessage(e.target.value)}
  />
  <div style={{ color: "red", marginBottom:"1rem" }}>{messageError}</div>
  <div className=" d-flex justify-content-end">
  <button type="button" className="btn btn-success" onClick={()=>handleSubmit(message, setMessageError, mcqId, userId, setOpen, setComments, comments)}>Submit</button>
  </div>
    </div>
  );
};
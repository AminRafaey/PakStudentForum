import  React from 'react';
import "./PractiseMcqCard.css";
import "../../../DailyTest/DailyTest.css";
import {useRouteMatch} from "react-router-dom";
export default function PractiseMcqCard(props) {
    let {mcq, setMarkedOptions, index, markedOptions, totalMcq} = props;
    const { url}  = useRouteMatch();
    function handleOptionSelect(option, id){
      if (url[1] === "l") {
        document.getElementById(mcq._id+"a").classList.remove("bg-danger");
        document.getElementById(mcq._id+"b").classList.remove("bg-danger");
        document.getElementById(mcq._id+"c").classList.remove("bg-danger");
        document.getElementById(mcq._id+"d").classList.remove("bg-danger");
        if(option == mcq.options.correct){
          document.getElementById(id).classList.add("bg-success");
        }
        else
          {
            document.getElementById(id).classList.add("bg-danger");
            document.getElementById(mcq._id+mcq.options.correct).classList.add("bg-success");
          }
      }
    else {
        let temp = [...markedOptions];
        temp[index] = option;
        setMarkedOptions(temp);
        document.getElementById(index).classList.remove("simple");
        document.getElementById(index).classList.add("attempted");
      }

    }
  return (
      
    <div key={mcq._id} className="card" style={{ marginTop: "3rem", border:"0px" }}>
    <div className="card-body">
      <h5 className="card-title">{mcq.statement}</h5>
      <br />
      <div className="row ">
      <div className="col-md-6 card_Options" id={`${mcq._id}${"a"}`}>
      <input type="radio" value="a" name={`optionsfor${index}`} onClick={(e)=>handleOptionSelect(e.target.value, mcq._id+"a")} /><h6>A:</h6>
        <p>{mcq.options.a}</p>
        </div>
        <div className="col-md-6 card_Options" id={`${mcq._id}${"b"}`}>
        <input type="radio" value="b" name={`optionsfor${index}`} onClick={(e)=>handleOptionSelect(e.target.value, mcq._id+"b")} /> <h6>B:</h6>
        <p>{mcq.options.b}</p></div>
        <br /> <br />
        <div className="col-md-6 card_Options" id={`${mcq._id}${"c"}`}>
        <input type="radio" value="c" name={`optionsfor${index}`}  onClick={(e)=>handleOptionSelect(e.target.value, mcq._id+"c")}/> <h6>C:</h6>
        <p>{mcq.options.c}</p>
        </div>
        <div className="col-md-6 card_Options" id={`${mcq._id}${"d"}`}>
        <input type="radio" value="d" name={`optionsfor${index}`} onClick={(e)=>handleOptionSelect(e.target.value, mcq._id+"d")}/> <h6>D:</h6>
        <p>{mcq.options.d}</p>
        </div>
      </div>
    </div>
 </div>
  );
};
import React from "react";
import "./McqCard.css";
import { useRouteMatch } from "react-router-dom";
export default function McqCard(props) {
  const { mcq, markedOptions, index } = props;
  let { url } = useRouteMatch();
  function GetOption(optionValue, option) {
     if (url[1] === "p" || url[1] === "d") {
      let classes = "";
      if (option === markedOptions[index] && option !== mcq.options.correct) {
        classes += "bg-danger";
      } else if (
        option === markedOptions[index] &&
        option === mcq.options.correct
      ) {
        classes += "bg-success";
      } else if (option === mcq.options.correct) {
        classes += "bg-success";
      } else {
        classes += "null";
      }

      return (
        
          <p className={classes} style={{display:"inline"}}>{optionValue}</p>
        
      );
    }
    else {
      return <p>{optionValue}</p>;
    }
  }

  return (
    <div
      key={mcq._id}
      className="card"
      style={{ marginTop: "3rem", border: "0px" }}
    >
      <div className="card-body">
        {(typeof markedOptions !== "undefined" && ( !markedOptions[index] && 
          <h4>Unmarked</h4>
        ))}
        <h5 className="card-title" style={{fontFamily:"Jameel Noori Nastaleeq", fontSize:"1.5rem"}}>{mcq.statement}</h5>
        <br />
        <div className="row ">
          <div className="col-md-6 card_Options">
            <h6>A:</h6>
            {GetOption(mcq.options.a, "a")}
          </div>
          <div className="col-md-6 card_Options">
            <h6>B:</h6>
            {GetOption(mcq.options.b, "b")}
          </div>
          <br /> <br />
          <div className="col-md-6 card_Options">
            <h6>C:</h6>
            {GetOption(mcq.options.c, "c")}
          </div>
          <div className="col-md-6 card_Options">
            <h6>D:</h6>
            {GetOption(mcq.options.d, "d")}
          </div>
          <br /> <br />
          {(url[1] !== "p" && url[1] !== "d") && (
            <div className="col-md-6 card_Options">
              <h6>Correct:</h6>
              <p>{mcq.options.correct}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

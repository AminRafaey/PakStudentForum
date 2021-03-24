import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";
export default function Card(props) {
  let { mcq, subCategoryId } = props;
  if (!mcq) {
    return <h1>Loading</h1>;
  }
  let heading = "Learning Example";
  return (
    <div className="card_Main mt-4" style={{ padding: "1rem", height: "auto" }}>
      <h2>{heading}</h2>
      <div
        className="card pb-4 "
        style={{
          margin: "1rem",
          marginTop: "4rem",
        }}
      >
        <div className="card-body">
          <h5
            className="card-title"
            style={{ fontFamily: "Jameel Noori Nastaleeq", fontSize: "1.5rem" }}
          >
            {mcq.statement}
          </h5>
          <br />
          <div className="card_Options">
            <h6>A:</h6>
            <p>{mcq.options.a}</p>
            <h6>B:</h6>
            <p>{mcq.options.b}</p>
            <br /> <br />
            <h6>C:</h6>
            <p>{mcq.options.c}</p>
            <h6>D:</h6>
            <p>{mcq.options.d}</p>
            <br /> <br />
            <h6>Correct:</h6>
            <p>{mcq.options.correct}</p>
            <br />
            <br />
            <button type="button" className="btn btn-success">
              <Link
                to={`/learning/Eazy/${subCategoryId}`}
                style={{ color: "white" }}
              >
                Learn More!
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

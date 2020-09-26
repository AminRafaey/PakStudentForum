import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FetchSuggestionsOrProblems, DeleteSuggestionOrProblem} from "../Services/SuggestionOrProblem";
import { Link } from "react-router-dom";
import McqCard from "../Components/LearningAndPractise/McqCard/McqCard";

export default function Problem(props) {
const {setMcqInitVal} = props;
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  let pageSize = 5;

  useEffect(() => {
    FetchSuggestionsOrProblems("problems",pageSize, 1).then((res) => {
      setItems(res);
      setHasMore(true);
      if (res.length < pageSize) {
        setHasMore(false);
      }
    });
  }, []);

  const fetchMoreData = () => {
    FetchSuggestionsOrProblems("problems",pageSize, (items.length + pageSize) / pageSize).then(
      (res) => {
        if (res.length < pageSize) {
          setHasMore(false);
        }
        setItems(items.concat(res));
      }
    );

    console.log(items);
  };

  return (
    <div className="container">
      <h1>Problems</h1>
      <hr />
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>END...</b>
          </p>
        }
      > 
        {items.map((i, index) => (
          <div
          key={index}
          style={{
            border: "0.01rem solid",
            margin: "4rem",
            borderRadius: "1rem",
          }}
        >
          
          <div key={index}>
         <McqCard mcq={i.mcqId} />
         <div className="row">
         <div className="col-md-12 mt-2 ml-2">
         <p className="h6" style={{display:"inline", color:"#4caf50"}}>Error Category: </p>
         {" "+i.errorCategory}
         </div>
         </div>
         <div className="row">
         <div className="col-md-12 mt-2 ml-2">
         <p className="h6" style={{display:"inline", color:"#4caf50"}}>Statement: </p>{i.statement}</div></div>
         <div className="row">
         <div className="col-md-12 mt-2 ml-2 mb-3">
         <p className="h6" style={{display:"inline", color:"#4caf50"}}>Date: </p>{i.date.slice(0,10)}
         </div></div>   
         <button
              type="button"
              className="btn btn-success"
                  style={{ marginLeft: "10%", marginBottom: "1rem" }}
                  
              onClick={() => {
                DeleteSuggestionOrProblem("feedback",i._id);
                setItems(items.filter((it) => it._id !== i._id));
              }}
            >
              Delete</button>
             <Link to="/admin/addMcq"> <button className="btn btn-success"
             style={{ marginLeft: "10%", marginBottom: "1rem" }}
             onClick={()=>setMcqInitVal({
              _id:i.mcqId._id,
              statement: i.mcqId.statement,
            a: i.mcqId.options.a,
            b: i.mcqId.options.b,
            c: i.mcqId.options.c,
            d: i.mcqId.options.d,
            correct: i.mcqId.options.correct,
            subCategories: i.mcqId.subCategories.map(s=>s.name),
            errorCategory:i.errorCategory,
            errorStatement:i.statement
            })}>Edit</button></Link>
          </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}


import  React, {useEffect} from 'react';
import McqCard from "../McqCard/McqCard";
import {useRouteMatch} from "react-router-dom";
import {storeResult} from "../../../Services/DailyTest";

export default function Result(props) {
  let {mcqs,markedOptions, learnerId} = props;
  const {url} = useRouteMatch();
  
  useEffect(() => {
    async function storeTestMarks() {
      await storeResult({
        learnerId,
        total:mcqs.length,
        obtained:totalMarks
      });
    }
    if(url === "/dailyTest"){
      storeTestMarks();
    } 
  }, []);

  let totalMarks = 0;
  for(let c1=0; c1<mcqs.length; c1++){
    if(mcqs[c1].options.correct === markedOptions[c1]){
      totalMarks++;
    }
  }
  
  return (
    <div>
    <h3>Your total marks are {totalMarks} out of {mcqs.length}</h3>
    {mcqs.map((mcq,i) => (
      <div key={mcq._id} className="card" style={{ marginTop: "3rem" }}>
      <McqCard mcq={mcq} markedOptions={markedOptions} index={i}/>
      </div>
    ))}
    </div>
  );
};
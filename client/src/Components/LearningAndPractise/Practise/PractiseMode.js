import React, { useState, useEffect } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import { fetchMcq } from "../../../Services/Mcq";
import LAPSideBar from "../LAPSideBar/LAPSideBar";
import LAPHeader from "../LAPHeader/LAPHeader";
import PractiseMcqCard from "./PractiseMcqCard/PractiseMcqCard";
import PractiseModel from "./PractiseModel";
import Spinner from "../../../UIHandlers/Spinner";



export default function PractiseMode(props) {
  const {subCategories} = props;
  let {difficultyLevel, subCategoryId } = useParams();
  const [open, setOpen] = useState(false);
  const [LAPCount, setLAPCount] = useState(0);
  const [mcqs, setMcqs] = useState([]);
 const [markedOptions, setMarkedOptions] = useState([]);
 const {url, path} = useRouteMatch();

 const [Spinneropen, setSpinnerOpen] = React.useState(true);

  useEffect(() => {
    console.log(url, path);
    async function test() {
      await fetchMcq(difficultyLevel,subCategoryId, 10, 1, setMcqs, true, setLAPCount, setSpinnerOpen);
    }
    test();
  }, [subCategoryId, difficultyLevel]);
  // if(mcqs.length < 1){
  //     return <Spinner open={Spinneropen} setOpen={setSpinnerOpen}/>
  // }

  return (
    <div className="row">
    <Spinner open={Spinneropen} setOpen={setSpinnerOpen} />
      <div className="col-sm-8 col-md-8 col-lg-8 ">
        <LAPHeader origin={"practise"}/>
        <div style={{width:"100%", margin: "1rem", marginTop: "4rem" }}>
        <span className="ml-4 h5">{subCategories.length>1?subCategories.find(s=>s._id == subCategoryId).description:""}</span>
          {mcqs.map((mcq,i) => (
            <div key={mcq._id} className="card" style={{ marginTop: "3rem" }}>
            <PractiseMcqCard mcq={mcq} setMarkedOptions={setMarkedOptions} index={i} markedOptions={markedOptions} totalMcq={mcqs.length}/>
            </div>
          ))}
          </div>
     <div className="d-flex justify-content-end">
          <button className="btn btn-success"
          style={{ marginBottom: "1rem" }} onClick={()=>setOpen(true)}> Submit</button>
          </div>
          
          </div>

      <div className="col-md-4">
        <LAPSideBar
          subCategoryId={subCategoryId}
          LAPCount={LAPCount}
          setMcqs={setMcqs}
          setLAPCount={setLAPCount}
        />
      </div>
      <PractiseModel
              open={open}
              setOpen={setOpen}
              markedOptions={markedOptions}
              mcqs={mcqs}
            />
    </div>
  );
}

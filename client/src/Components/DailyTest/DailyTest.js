import React, { useState, useEffect } from "react";
import { fetchTestMcq } from "../../Services/DailyTest";
import PractiseMcqCard from "../LearningAndPractise/Practise/PractiseMcqCard/PractiseMcqCard";
import InstructionModel from "./InstructionModel";
import PractiseModel from "../LearningAndPractise/Practise/PractiseModel";
import Timer from "./Timer";
import jwtDecode from "jwt-decode";
import Spinner from "../../UIHandlers/Spinner";



export default function DailyTest(props) {
  //const {user} = props;
  const  user  = jwtDecode(localStorage.getItem("token"));
  const [open, setOpen] = useState(true);
  const [openResult, setOpenResult] = useState(false);
  const [mcqs, setMcqs] = useState([]);
  const [markedOptions, setMarkedOptions] = useState([]);
  const [mcqIndex, setMcqIndex] = useState(0);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [alreadyAttemptwarning, setAlreadyAttempWarning] = useState("");

  const [Spinneropen, setSpinnerOpen] = React.useState(true);
  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      await fetchTestMcq(user._id, setMcqs, setSubCategoryName, setAlreadyAttempWarning);
    }
    fetchData();
  }, []);

  if (mcqs.length < 1) {
    return(
      <div>
    {alreadyAttemptwarning.length > 2 ?
       <div>{alreadyAttemptwarning}</div>:
       <Spinner open={Spinneropen} setOpen={setSpinnerOpen}/>
    }
    </div>
    )
  }

  return (
    <div>
      {console.log(mcqs)}
      <InstructionModel
        subCategoryName={subCategoryName}
        open={open}
        setOpen={setOpen}
        onOpenModal={onOpenModal}
        onCloseModal={onCloseModal}
      />
      <Timer startingMinutes={10} finishHandler={()=>setOpenResult(true)}/>
      <PractiseMcqCard
        mcq={mcqs[mcqIndex]}
        setMarkedOptions={setMarkedOptions}
        index={mcqIndex}
        markedOptions={markedOptions}
      />
      <div className="d-flex justify-content-center">
        {mcqIndex + 1 === mcqs.length ? (
          <button
            className="btn btn-success"
            style={{ marginBottom: "1rem" }}
            disabled={mcqIndex + 1 === markedOptions.length ? false : true}
            onClick={() => setOpenResult(true)}
          >
            Submit
          </button>
        ) : (
          <button
            className="btn btn-success"
            style={{ marginBottom: "1rem" }}
            disabled={mcqIndex + 1 === markedOptions.length ? false : true}
            onClick={() => setMcqIndex(mcqIndex + 1)}
          >
            Next
          </button>
        )}
      </div>
      <PractiseModel
        open={openResult}
        setOpen={setOpenResult}
        markedOptions={markedOptions}
        mcqs={mcqs}
        learnerId={user._id}
      />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import config from "../../../config.json";
import Model from "./Model";
import { useParams } from "react-router-dom";
import { fetchMcq } from "../../../Services/Mcq";
import LAPSideBar from "../LAPSideBar/LAPSideBar";
import LAPHeader from "../LAPHeader/LAPHeader";
import McqCard from "../McqCard/McqCard";
import Spinner from "../../../UIHandlers/Spinner";
import { FacebookShareButton, FacebookIcon } from "react-share";

import "./ReadingMode.css";

export default function ReadingMode(props) {
  let {difficultyLevel, subCategoryId } = useParams();
  let { user, subCategories } = props;
  const [open, setOpen] = useState(false);
  const [choseComponent, setChooseComponent] = useState("");
  const [mcq_id, setMcq_id] = useState("");
  const [LAPCount, setLAPCount] = useState(0);
  const [mcqs, setMcqs] = useState([]);

  const [Spinneropen, setSpinnerOpen] = React.useState(true);
  useEffect(() => {
    async function test() {
      await fetchMcq(difficultyLevel,subCategoryId, 10, 1, setMcqs, true, setLAPCount, setSpinnerOpen);
    }
    test();
  }, [subCategoryId, difficultyLevel]);

  // if (mcqs.length < 1) {
  //   return <Spinner open={Spinneropen} setOpen={setSpinnerOpen} />;
  // }
  return (
    <div className="row">
    <Spinner open={Spinneropen} setOpen={setSpinnerOpen} />
      <div className="col-sm-8 col-md-8 col-lg-8 ">
        <LAPHeader />
       
        <div style={{ width: "100%", marginTop: "4rem" }}>
        <span className="ml-4 h5">{subCategories.length>1?subCategories.find(s=>s._id == subCategoryId).description:""}</span>
          {mcqs.map((mcq) => (
            <div key={mcq._id} className="card" style={{ marginTop: "3rem" }}>
              <McqCard mcq={mcq} />
              <div>
                <button
                  className="btn btn-success"
                  style={{ marginLeft: "10%", marginBottom: "1rem" }}
                  onClick={() => {
                    setMcq_id(mcq._id);
                    setChooseComponent("Report");
                    setOpen(true);
                  }}
                >
                  Report a problem
                </button>
                <button
                  className="btn btn-success"
                  style={{ marginLeft: "1%", marginBottom: "1rem" }}
                  onClick={() => {
                    setMcq_id(mcq._id);
                    setChooseComponent("Discussion");
                    setOpen(true);
                  }}
                  disabled={user ? false : true}
                >
                  Discussion
                </button>

                <div className="some-network ml-2">
                  <FacebookShareButton
                    quote={`${mcq.statement} \n\n\n A:  ${mcq.options.a} \n B:  ${mcq.options.b} \n C:  ${mcq.options.c} \n D:  ${mcq.options.d}`}
                    url={config.baseUrl}
                    className="share-button"
                    windowWidth={760}
                    windowHeight={700}
                  >
                    <FacebookIcon size={40} round />
                  </FacebookShareButton>
                </div>
                {user ? (
                  ""
                ) : (
                  <h6>Create account to get involve in discussion</h6>
                )}
              </div>{" "}
            </div>
          ))}
          {open && choseComponent === "Report" ? (
            <Model
              open={open}
              setOpen={setOpen}
              choseComponent={choseComponent}
              mcqId={mcq_id}
            />
          ) : (
            ""
          )}
          {open && choseComponent === "Discussion" ? (
            <Model
              open={open}
              setOpen={setOpen}
              choseComponent={choseComponent}
              mcqId={mcq_id}
              userId={user._id}
            />
          ) : (
            ""
          )}
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
    </div>
  );
}

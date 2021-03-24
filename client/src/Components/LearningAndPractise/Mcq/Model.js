import React, { useState, useEffect } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
import Rotate from "react-reveal/Rotate";
import Flip from "react-reveal/Flip";
import ReportProblem from "./ReportProblem/ReportProblem";

import Discussion from "./Discussion/Discussion";

export default function Model(props) {
  let { open, setOpen, choseComponent, mcqId, userId } = props;
  console.log(mcqId);
useEffect(()=>console.log("reload"),[])
  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal open={open} onClose={onCloseModal} center>
   
          {choseComponent === "Report" ? <ReportProblem mcq_id={mcqId} setOpen={setOpen}/> : <Discussion mcqId={mcqId} userId={userId} setOpen={setOpen}/>}
      
      </Modal>
    </div>
  );
}

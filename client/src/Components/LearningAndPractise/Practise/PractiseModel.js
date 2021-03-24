import React, { useState, useEffect } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
import Rotate from "react-reveal/Rotate";
import Flip from "react-reveal/Flip";
import Result from "./Result";
import {useRouteMatch, Redirect} from "react-router-dom";


export default function PractiseModel(props) {
  const { open, setOpen, markedOptions, mcqs, learnerId } = props;
const {url} = useRouteMatch();
console.log(url);
  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
    if(url === "/dailyTest"){
      window.history.go(-1);
    }
  };

  return (
    <div>
      <Modal open={open} onClose={onCloseModal} center>
      <Result mcqs={mcqs} markedOptions={markedOptions} learnerId={learnerId}/>
      </Modal>
    </div>
  );
}

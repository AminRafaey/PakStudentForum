import React, { useState, useEffect } from "react";
import { fetchTestMcq } from "../../Services/DailyTest";
import PractiseMcqCard from "../LearningAndPractise/Practise/PractiseMcqCard/PractiseMcqCard";
import InstructionModel from "./InstructionModel";
import PractiseModel from "../LearningAndPractise/Practise/PractiseModel";
import Timer from "./Timer";
import jwtDecode from "jwt-decode";
import Spinner from "../../UIHandlers/Spinner";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import "./DailyTest.css";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DailyTest(props) {
  const user = jwtDecode(localStorage.getItem("token"));
  const [open, setOpen] = useState(true);
  const [openResult, setOpenResult] = useState(false);
  const [mcqs, setMcqs] = useState([]);
  const [markedOptions, setMarkedOptions] = useState([]);
  const [mcqIndex, setMcqIndex] = useState(0);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [alreadyAttemptwarning, setAlreadyAttempWarning] = useState("");
  const classes = useStyles();
  const [mainDailogueOpen, setMainDailogueOpen] = React.useState(false);
  const [
    confirmationDailogueOpen,
    setConfirmationDailogueOpen,
  ] = React.useState(false);


  const [Spinneropen, setSpinnerOpen] = React.useState(true);
  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
    setMainDailogueOpen(true);
  };

  useEffect(() => {
    async function fetchData() {
      await fetchTestMcq(
        user._id,
        setMcqs,
        setSubCategoryName,
        setAlreadyAttempWarning
      );
    }
    fetchData();
  }, []);

  if (mcqs.length < 1) {
    return (
      <div>
        {alreadyAttemptwarning.length > 2 ? (
          <div>{alreadyAttemptwarning}</div>
        ) : (
          <Spinner open={Spinneropen} setOpen={setSpinnerOpen} />
        )}
      </div>
    );
  }
  const handleMainDailogueClose = () => {
    setConfirmationDailogueOpen(true);
  };

  const handleConfirmationDailogueOpen = () => {
    setConfirmationDailogueOpen(false);
    setMainDailogueOpen(false);
  };

  const handleConfirmationDailogueClose = () => {
    setConfirmationDailogueOpen(false);
  };

  return (
    <div>
      <InstructionModel
        subCategoryName={subCategoryName}
        open={open}
        setOpen={setOpen}
        onOpenModal={onOpenModal}
        onCloseModal={onCloseModal}
      />
      <Dialog
        fullScreen
        open={mainDailogueOpen}
        onClose={handleMainDailogueClose}
        TransitionComponent={Transition}
      >
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleMainDailogueClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Timer
          startingMinutes={10}
          finishHandler={() => {
            setMainDailogueOpen(false);
            setOpenResult(true);
          }}
        />
        <List>
          <div className="fluid-container">
            <div className="row m-1">
              <div className="col-md-9 col-lg-9">
                <PractiseMcqCard
                  mcq={mcqs[mcqIndex]}
                  setMarkedOptions={setMarkedOptions}
                  index={mcqIndex}
                  markedOptions={markedOptions}
                />

                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-success"
                    style={{ margin: "1rem" }}
                    onClick={() => setMcqIndex(mcqIndex - 1)}
                    disabled={mcqIndex === 0 ? true : false}
                  >
                    Previous
                  </button>
                  <button
                    className="btn btn-success"
                    style={{ margin: "1rem" }}
                    onClick={() => setMcqIndex(mcqIndex + 1)}
                  >
                    Next
                  </button>
                  {mcqIndex + 1 === mcqs.length ? (
                    <button
                      className="btn btn-success"
                      style={{ margin: "1rem" }}
                      disabled={
                        mcqIndex + 1 === markedOptions.length ? false : true
                      }
                      onClick={() => {
                        setMainDailogueOpen(false);
                        setOpenResult(true);
                      }}
                    >
                      Submit
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="col-md-3 col-lg-3">
                <h3>Question Palette</h3>

                <div className="d-flex">
                  <div className="notAttempted" />
                  <p className="h6 mt-4">Not Attempted</p>
                </div>
                <div className="d-flex">
                  <div className="attempted" />
                  <p className="h6 mt-4">Attempted</p>
                </div>
                <Divider />
                <h3>Performance Review</h3>
                <div className="row">
                  {mcqs.map((m, i) => (
                    <div
                      className="simple"
                      key={i}
                      id={i}
                      onClick={() => setMcqIndex(i)}
                    >
                      <span style={{ margin: "1rem" }}>{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </List>
      </Dialog>

      <Dialog
        open={confirmationDailogueOpen}
        onClose={handleConfirmationDailogueClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to dismiss the test ? Your progress will get
            lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationDailogueClose} color="primary">
            No
          </Button>
          <Button
            onClick={handleConfirmationDailogueOpen}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

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

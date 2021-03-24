import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
export default function InstructionModel(props) {
  const { subCategoryName, open, setOpen, onOpenModal, onCloseModal } = props;

  return (
    <div>
      <Modal open={open} onClose={onCloseModal} center>
        <div style={{ width: window.innerWidth / 2 }}>
          <h3>{subCategoryName}</h3>
          <p>Time: Approximately 10 minutes</p>
          <br />
          <h4>INFORMATION FOR CANDIDATES</h4>
          <ul>
            <li>There are 40 questions in this test.</li>
            <li>Each question carries one mark.</li>
            <li>You will hear each part once.</li>
          </ul>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-success"
              style={{ marginBottom: "1rem" }}
              onClick={onCloseModal}
            >
              Start!!!
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

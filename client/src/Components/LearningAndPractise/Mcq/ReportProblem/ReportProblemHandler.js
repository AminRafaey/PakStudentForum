import {PostProblem} from "../../../../Services/PostProblem"

export function handleSubmit(errorCategory, message, setErrorTypeMsg, mcq_id,setMessageError, setOpen,){
      if (!errorCategory) {
        setErrorTypeMsg("Select atleast one option");
        return;
      }
      setErrorTypeMsg("");
      if(message.length<10){
        setMessageError("Description lenght is too short. It should be atleast 10 characters long.");
        return;
      }
      setMessageError("");
      PostProblem({statement:message, errorCategory, type:"Problem", mcqId:mcq_id}, setOpen)
}
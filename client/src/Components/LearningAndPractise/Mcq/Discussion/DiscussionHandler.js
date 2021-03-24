import { PostComment } from "../../../../Services/Comment";

export function handleSubmit(message, setMessageError, mcqId, userId, setOpen, setComments, comments){
    if(message.length <10){
        setMessageError("Comment lenght is too short. It should be atleast 10 characters long.");
        return;
    }setMessageError("")
    PostComment({mcqId, statement:message, type:"Comment", learnerId:userId}, setOpen, setComments, comments)
}
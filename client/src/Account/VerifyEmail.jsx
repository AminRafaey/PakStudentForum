import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { verifyLearner } from "../Services/Learner";
import Spinner from "../UIHandlers/Spinner.js";

function VerifyEmail() {
  const { token } = useParams();
  useEffect(() => {
    async function verify() {
      localStorage.setItem("token", token);
      const res = await verifyLearner(jwtDecode(token)._id);

      window.location = "/";
    }
    try {
      verify();
    } catch (err) {
      alert(err);
    }
  }, []);

  return <Spinner open={true} setOpen={() => console.log("Spinner")} />;
}

export default VerifyEmail;

import React, { useEffect } from 'react';
import {  useParams, Redirect } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import {verifyLearner} from "../Services/Learner"

function VerifyEmail() {
    const {token} = useParams();
    useEffect(() => {
        async function verify(){
            localStorage.setItem("token", token);
            const res = await verifyLearner(jwtDecode(token)._id);

window.location = "/"
        };
        try{
            verify()
        }
        catch(err){
            alert(err)
        }
    }, []);

    return (
        <div>
            <h3 className="card-header">Verify Email</h3>
        </div>
    )
}

export default VerifyEmail; 
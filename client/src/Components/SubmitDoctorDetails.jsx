import { useEffect, useState } from "react"
import axios from 'axios';
import {be_url} from "/config"
import {Navigate, useNavigate} from "react-router-dom";

function SubmitDoctorDetails(){

    let navigate = useNavigate() ;

    function handleSubmit(){
        navigate("/doctor-dashboard") ;
    }

    return(
        <div id="submit-doctor-details">
            submit doctor details

        <button onClick={handleSubmit}>
            Submit
        </button>
        </div>

    )
}

export default SubmitDoctorDetails
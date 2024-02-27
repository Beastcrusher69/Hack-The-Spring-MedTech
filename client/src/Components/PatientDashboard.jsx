import { useEffect, useState } from "react"
import axios from 'axios';
import {be_url} from "/config"
import {useNavigate} from "react-router-dom";
import "../CSS/PatientDashboard.css";
import Chatbox from "./Chatbox.jsx";

function PatientDashboard(){

    let [displayChatbox , setDisplayChatbox] = useState(false) ;

    return (

        <>
        <button 
        onClick={()=>{setDisplayChatbox(!displayChatbox)}}
        >
            chat
        </button>
        {displayChatbox ? <Chatbox props={{displayChatbox , setDisplayChatbox}}></Chatbox> : null}
            </>
    )
}

export default PatientDashboard
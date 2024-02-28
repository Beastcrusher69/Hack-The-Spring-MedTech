import { useEffect, useState } from "react"
import axios from 'axios';
import {be_url} from "/config"
import {useNavigate} from "react-router-dom";
import "../CSS/PatientDashboard.css";
import Chatbox from "./Chatbox.jsx";

function PatientDashboard(){

    let [displayChatbox , setDisplayChatbox] = useState(false) ;
    let navigate = useNavigate();
    const lastVisitedPage = localStorage.getItem('lastVisitedPage');

    useEffect(()=>{
        window.addEventListener('beforeunload', () => {
          localStorage.setItem('lastVisitedPage', window.location.pathname);
        });
      })

    useEffect(()=>{

        axios.get(be_url + "/patient-dashboard" , {withCredentials : true} )
             .then((res)=>{
                if(res.data.code == 2 && res.data.role == "patient"){

                    console.log(res.data) ;

                }

                else{
                    if (lastVisitedPage) {
                        navigate(lastVisitedPage);
                    } else {
                        navigate("/");
                    }
                }
             })
             .catch((err)=>{
                console.log(err) ;
                navigate("/");
             })

    }, [])

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
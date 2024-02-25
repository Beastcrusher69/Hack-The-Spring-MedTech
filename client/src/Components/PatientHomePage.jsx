import { useEffect, useState } from "react"
import axios from 'axios';
import {be_url} from "/config"
import {useNavigate} from "react-router-dom";
import "../CSS/PatientHomePage.css";

// useEffect(()=>{

//     axios.get(be_url + "/" , {withCredentials : true} )
//          .then((res)=>{
//             if(res.data.code == 2){
//                 console.log(res.data) ;

//                 let data = JSON.parse(window.localStorage.getItem("user")) ;

//                 if(data){
//                     setUser(data) ;
//                 }
//             }
//          })
//          .catch((err)=>{
//             console.log(err) ;
//             navigate("/login");
//          })

// }, [])

function PatientHomePage(){
     
    return(
        <div>
            patient home page
        </div>
    )
}

export default PatientHomePage
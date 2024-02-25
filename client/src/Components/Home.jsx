import { useState , useEffect } from 'react'
import axios from 'axios'
import { be_url } from '/config.js' ;
import {useNavigate} from "react-router-dom";

function Home() {

  let navigate = useNavigate() ;

  useEffect(()=>{

    axios.get(be_url + "/home" , {withCredentials : true})
         .then((res)=>{
          console.log(res.data) ;
         })
         .catch((err)=>{
          console.log("/home Error : " , err) ;
         }) ;
  } , [])

  return (
    <div className="Home">
      home page
      <button onClick={()=>{navigate("/login")}}>login</button>
      <button onClick={()=>{navigate("/signup")}}>signup</button>
    </div>
  )
}

export default Home

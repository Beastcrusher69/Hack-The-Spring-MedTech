import { useState , useEffect } from 'react'
import axios from 'axios'
import { be_url } from '/config.js' ;

function Home() {

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
      
    </div>
  )
}

export default Home

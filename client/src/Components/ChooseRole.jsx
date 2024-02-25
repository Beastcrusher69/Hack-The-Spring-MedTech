import { useEffect, useState } from "react"
import axios from 'axios';
import {be_url} from "/config"
import {useNavigate} from "react-router-dom";
import "../CSS/ChooseRole.css";

function ChooseRole(){

    let navigate = useNavigate() ;
    let [user , setUser] = useState("") ;

    useEffect(()=>{

        axios.get(be_url + "/choose-role" , {withCredentials : true} )
             .then((res)=>{
                if(res.data.code == 2){

                    let data = JSON.parse(window.localStorage.getItem("user")) ;

                    if(data){
                        setUser(data) ;
                    }
                }
             })
             .catch((err)=>{
                console.log(err) ;
                navigate("/login");
             })

    }, [])

    return (
        <div id = "choose-role">

            <div id="choose-role-wrap">

                <h1>Welcome , {user.firstName} {user.lastName}  </h1>
                <h2>How do you want to use projectname?</h2>

                <div id="choose-role-option-wrap">

                    <div className="choose-role-option-div" onClick={()=>{navigate("/submit-medical-history")}}>
                        <span className="choose-role-option-span" >Patient</span>
                        <p className="choose-role-option-p">I am here to seek medical diagnosis</p>
                    </div>

                    <div className="choose-role-option-div" onClick={()=>{}}>
                        <span className="choose-role-option-span" >Doctor</span>
                        <p className="choose-role-option-p">I am a medical practitioner</p>
                    </div>

                </div>


            </div>

        </div>
    )
}

export default ChooseRole 
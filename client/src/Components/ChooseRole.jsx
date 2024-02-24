import { useEffect } from "react"
import axios from 'axios';
import {be_url} from "/config"

function ChooseRole(){

    useEffect(()=>{

        axios.get(be_url + "/choose-role")
             .then((res)=>{
                if(res.data.code == 2){
                    console.log(res.data) ;
                }
             })
             .catch((err)=>{
                console.log(err) ;
                navigate("/login");
             })

    }, [])

    return (
        <div id = "choose-role">
            doctor / patient ?
        </div>
    )
}

export default ChooseRole 
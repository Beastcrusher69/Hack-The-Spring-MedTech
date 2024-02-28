import { useEffect, useState } from "react"
import axios from 'axios';
import {be_url} from "/config"
import {Navigate, useNavigate} from "react-router-dom";
import "../CSS/SubmitDoctorDetails.css";
import {AiOutlineExclamationCircle} from "react-icons/ai";

function SubmitDoctorDetails(){

    let [address , setAddress] = useState("");
    let [city , setCity] = useState("");
    let [birthdate , setBirthdate] = useState("");
    let [state , setState] = useState("");
    let [age , setAge] = useState("");
    let [gender , setGender] = useState("");
    let [education, setEducation] = useState("");
    let [personalID, setPersonalID] = useState("");
    let [isFilled , setIsFilled] = useState(true) ;
    const lastVisitedPage = localStorage.getItem('lastVisitedPage');

    let navigate = useNavigate() ;

    useEffect(()=>{
        window.addEventListener('beforeunload', () => {
          localStorage.setItem('lastVisitedPage', window.location.pathname);
        });
      })

    useEffect(()=>{

        axios.get(be_url + "/submit-doctor-details" , {withCredentials : true} )
             .then((res)=>{
                if(res.data.code == 2 ){

                    if(res.data.role){
                        if (lastVisitedPage) {
                            navigate(lastVisitedPage);
                        } else {
                            navigate("/");
                        }
                    }
                    else{
                        console.log(res.data) ;
                    }
                }
    
             })
             .catch((err)=>{
                console.log(err) ;

                navigate("/");
             })

    }, [])

    useEffect(()=>{

        calculateAge() ;

    }, [birthdate])

    function calculateAge() {
        var today = new Date();
        var birthdateObj = new Date(birthdate) ;

        var ageTemp = today.getFullYear() - birthdateObj.getFullYear();
        var monthDiff = today.getMonth() - birthdateObj.getMonth();
    
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdateObj.getDate())) {
            ageTemp--;
        }

        setAge(ageTemp) ;

    }

    function handleSubmit(e){

        e.preventDefault() ;

        if(address !== "" && city !== "" && state !== "" && birthdate !== "" && gender !== "" && education !== "" && personalID !== ""){ // change

            axios.post(be_url + "/submit-doctor-details" , { address , city , state , birthdate , age , gender , education , personalID} , {withCredentials : true})
            .then((res)=>{

                console.log("res.data" , res.data) ;
                navigate("/doctor-dashboard") ;

            })
            .catch((err)=>{
                console.log(err) ;
            })

        }
        else{
            console.log("false") ;
            setIsFilled(false) ;
        }

        console.log("address : " , address , typeof(address));
        console.log("city : " , city , typeof(city));
        console.log("state : " , state , typeof(state));
        console.log("birthdate : " , birthdate , typeof(birthdate));
        console.log("age : " , age , typeof(age));
        console.log("gender : " , gender , typeof(gender));
        console.log("education : " , education , typeof(education));
        console.log("personalID : " , personalID , typeof(personalID));


    }

    return(
        <div id="submit-doctor-details">
            <h1 id="submit-doctor-details-h1">Doctor Data Input</h1>
    <hr/>
    <form id="doctor-form" onChange={()=>{setIsFilled(true)}}>

    <p className='error-box' style={{ display : isFilled ? "none" : "block"}}>
                    <span className='error-icon-span'><AiOutlineExclamationCircle/></span>
                    please fill the fields
    </p>
    
        <label htmlFor="address">Street Address:</label>
        <input type="text" id="address" name="address" onChange={(e)=>{setAddress(e.target.value)}} required=""/><br/>

        <label htmlFor="city">City:</label>
        <input type="text" id="city" name="city" onChange={(e)=>{setCity(e.target.value)}} required=""/><br/>

        <label htmlFor="state">State:</label>
        <select id="doctor-form-state" name="state" onChange={(e)=>{setState(e.target.value)}}>
        <option value="">Select State</option>
        <option value="Andhra Pradesh">Andhra Pradesh</option>
        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
        <option value="Assam">Assam</option>
        <option value="Bihar">Bihar</option>
        <option value="Chhattisgarh">Chhattisgarh</option>
        <option value="Goa">Goa</option>
        <option value="Gujarat">Gujarat</option>
        <option value="Haryana">Haryana</option>
        <option value="Himachal Pradesh">Himachal Pradesh</option>
        <option value="Jharkhand">Jharkhand</option>
        <option value="Karnataka">Karnataka</option>
        <option value="Kerala">Kerala</option>
        <option value="Madhya Pradesh">Madhya Pradesh</option>
        <option value="Maharashtra">Maharashtra</option>
        <option value="Manipur">Manipur</option>
        <option value="Meghalaya">Meghalaya</option>
        <option value="Mizoram">Mizoram</option>
        <option value="Nagaland">Nagaland</option>
        <option value="Odisha">Odisha</option>
        <option value="Punjab">Punjab</option>
        <option value="Rajasthan">Rajasthan</option>
        <option value="Sikkim">Sikkim</option>
        <option value="Tamil Nadu">Tamil Nadu</option>
        <option value="Telangana">Telangana</option>
        <option value="Tripura">Tripura</option>
        <option value="Uttar Pradesh">Uttar Pradesh</option>
        <option value="Uttarakhand">Uttarakhand</option>
        <option value="West Bengal">West Bengal</option>
        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
        <option value="Chandigarh">Chandigarh</option>
        <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
        <option value="Daman and Diu">Daman and Diu</option>
        <option value="Lakshadweep">Lakshadweep</option>
        <option value="Delhi">Delhi</option>
        <option value="Puducherry">Puducherry</option>
        </select>

        <label htmlFor="birthdate">Birthdate:</label>
        <input type="date" id="birthdate" name="birthdate" required onChange={(e)=>{setBirthdate(e.target.value) ; calculateAge()}}/><br />

        <label htmlFor="age">Age:</label>
        <input type="text" id="age" name="age" value={age}/><br/>
    
        <label htmlFor="gender">Gender:</label>
        <select id="doctor-form-gender" name="gender"  onChange={(e)=>{setGender(e.target.value)}}>
            <option value="" >Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Transgender</option>
        </select><br/>

        <label htmlFor="occupation">Education:</label>
        <input type="text" id="education" name="education"  onChange={(e)=>{setEducation(e.target.value)}}/><br/>
        <label htmlFor="occupation">Personal ID:</label>
        <input type="text" id="personalID" name="personalID" required=""  onChange={(e)=>{setPersonalID(e.target.value)}}/><br/>
    
        <input type="submit" value="Submit" onClick={handleSubmit}/>
    </form>

        </div>

    )
}

export default SubmitDoctorDetails
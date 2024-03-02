import React, { useEffect, useState } from "react";
import axios from 'axios';
import { be_url } from "/config"; 
import { useNavigate , useLocation } from "react-router-dom";
import "../CSS/AppointmentBooking.css";
import {AiOutlineExclamationCircle} from "react-icons/ai";


function AppointmentBooking() {

    let navigate = useNavigate() ;
    let location = useLocation() ;
    let [doctor , setDoctor] = useState("") ;
    let [isFilled , setIsFilled] = useState(true) ;

    let [date , setDate] = useState("") ;
    let [time , setTime] = useState("") ;
    let [reason , setReason] = useState("") ;
    let [description , setDescription] = useState("") ;

    useEffect(()=>{
        
            setDoctor(JSON.parse(window.localStorage.getItem("doctor"))) ;
      } ,[])

    useEffect(()=>{
        window.addEventListener('beforeunload', () => {
          localStorage.setItem('lastVisitedPage', window.location.pathname);
        });
      })

    useEffect(()=>{

        axios.get(be_url + "/appointment-booking" , {withCredentials : true} )
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

    useEffect(() => {
        // Set min date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        document.getElementById('AppoinBooking-date').min = tomorrow.toISOString().split('T')[0];
    }, []);

    function handleSubmit(e){

        e.preventDefault() ;
        if(date !== "" && time !== "" && reason !== "" && description !== "" ){

            axios.post(be_url + "/appointment-booking" ,{date , time , reason , description , docEmailId : doctor.docEmailId}, {withCredentials : true} )
             .then((res)=>{
                console.log(res.data) ;
                navigate("/patient-dashboard") ;
             })
             .catch((err)=>{
                console.log(err) ;
             })



        }
        else{
            setIsFilled(false) ;
        }
    }

    return (
        <div id='AppoinBooking-body'>
            <h1 id='AppoinBooking-h1'>Book an Appointment</h1>
            <hr />
            <form onChange={()=>{setIsFilled(true)}} id="AppoinBooking-appointmentForm">

            <p className='error-box' style={{ display : isFilled ? "none" : "block"}}>
                    <span className='error-icon-span'><AiOutlineExclamationCircle/></span>
                    please fill the fields
    </p>
                <label htmlFor="AppoinBooking-doctor">Doctor:</label>
                <p id = "docName">
                {doctor.docName}
                </p>

                <label htmlFor="AppoinBooking-date">Date:</label>
                <input type="date" id="AppoinBooking-date" onChange={(e)=>{ setDate(e.target.value)}} name="date" min="" /><br />

                <label htmlFor="AppoinBooking-time">Time:</label>
                <select id="AppoinBooking-time" name="time" onChange={(e)=>{ setTime(e.target.value)}} >
                    <option value="">Select Time</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    {/* Add more time slots as needed */}
                </select><br />
                
                <label htmlFor="AppoinBooking-mode">Reason for Checkup:</label>
                <select id="AppoinBooking-mode" name="mode" onChange={(e)=>{ setReason(e.target.value)}} >
                    <option value="">Select Reason</option>
                    <option value="RoutineCheckup">Routine Checkup</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Vaccination">Vaccination</option>
                    <option value="MedicationAdjustment">Medication Adjustment</option>
                    <option value="MentalHealthConsultation">Mental Health Consultation</option>
                </select><br />

                <label htmlFor="AppoinBooking-reason">Additional description:</label>
                <textarea id="AppoinBooking-reason" onChange={(e)=>{ setDescription(e.target.value)}} name="reason" rows="4"></textarea><br />

                <input type="submit" onClick = {handleSubmit} value="Schedule Appointment" />
            </form>
        </div>
    );
}

export default AppointmentBooking;

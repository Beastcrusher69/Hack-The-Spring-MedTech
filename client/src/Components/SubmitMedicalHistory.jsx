import { useEffect, useState } from "react"
import axios from 'axios';
import {be_url} from "/config"
import {useNavigate} from "react-router-dom";
import "../CSS/SubmitMedicalHistory.css";
import {AiOutlineExclamationCircle} from "react-icons/ai";

function SubmitMedicalHistory(){

    let [address , setAddress] = useState("");
    let [city , setCity] = useState("");
    let [birthdate , setBirthdate] = useState("");
    let [state , setState] = useState("");
    let [age , setAge] = useState("");
    let [gender , setGender] = useState("");
    let [files , setFiles] = useState("");
    let [previousMedicalHistory , setPreviousMedicalHistory] = useState("");
    let [isFilled , setIsFilled] = useState(true) ;
    let [occupation , setOccupation] = useState("");

    let navigate = useNavigate() ;
    // let [user , setUser] = useState("") ;

    useEffect(()=>{

        axios.get(be_url + "/submit-medical-history" , {withCredentials : true} )
             .then((res)=>{
                if(res.data.code == 2){

                    // let data = JSON.parse(window.localStorage.getItem("user")) ;

                    // if(data){
                    //     setUser(data) ;
                    // }
                }
             })
             .catch((err)=>{
                console.log(err) ;
                navigate("/login");
             })

    }, [])

    useEffect(()=>{

        calculateAge() ;

    }, [birthdate])

    // useEffect(()=>{

    //     var today = new Date() ;

    //     setBirthdate(today) ;

    // }, [])

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

    function uploadimage(i){

        let image = new FormData();
        image.append('file', files[i]);
        image.append('upload_preset','expense-tracker')
        image.append('cloud_name','dgqba5trl')

        return axios.post("https://api.cloudinary.com/v1_1/dgqba5trl/image/upload",image)
    }

    async function handleSubmit(e){

        e.preventDefault() ;

        if(address != "" && city != "" && state != "" && birthdate != "" && gender != "" && occupation != "" ){

            let URLarray = [] ;

            for(let i = 0 ; i < files.length ; i++){
                await uploadimage(i)
                .then((res)=>{
                    console.log(res.data.url) ;
                    URLarray.push(res.data.url) ;
                })
                .catch((err)=>{
                    console.error(err) ;
                })
            }

            axios.post(be_url + "/submit-medical-history" , { address , city , state , birthdate , age , gender , occupation , previousMedicalHistory , previousMedicalHistoryImageURLs : URLarray } , {withCredentials : true})
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
        <div id="submit-medical-history">
            <h1 id="patient-data-input">Patient Data Input</h1>
            <hr />
            <form id="patientForm" onChange={()=>{setIsFilled(true)}}>

            <p className='error-box' style={{ display : isFilled ? "none" : "block"}}>
                    <span className='error-icon-span'><AiOutlineExclamationCircle/></span>
                    please fill the fields
            </p>

                <label htmlFor="address">Street Address:</label>
                <input type="text" id="address" name="address" onChange={(e)=>{setAddress(e.target.value)}} required /><br />

                <label htmlFor="city">City:</label>
                <input type="text" id="city" name="city" onChange={(e)=>{setCity(e.target.value)}} required /><br />

                <label htmlFor="state">State:</label>
                <select id="state" name="state" onChange={(e)=>{setState(e.target.value)}}>
                    <option value="" >Select State</option>
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
                </select><br />

                <label htmlFor="birthdate">Birthdate:</label>
                <input type="date" id="birthdate" name="birthdate" required onChange={(e)=>{setBirthdate(e.target.value) ; calculateAge()}}/><br />

                <label htmlFor="age">Age:</label>
                <input type="text" id="age" name="age" readOnly value={age}/><br />

                <label htmlFor="gender">Gender:</label>
                <select id="gender" name="gender" onChange={(e)=>{setGender(e.target.value)}}>
                    <option value="" >Select gender</option>
                    <option value="male" >Male</option>
                    <option value="female">Female</option>
                    <option value="other">Transgender</option>
                </select><br />

                <label htmlFor="occupation">Occupation:</label>
                <input type="text" id="occupation" name="occupation" onChange={(e)=>{setOccupation(e.target.value)}} /><br />

                <label htmlFor="medicalHistory">Previous Medical History:</label><br />
                <textarea id="medicalHistory" name="medicalHistory" rows="4" onChange={(e)=>{setPreviousMedicalHistory(e.target.value)}}></textarea><br />

                <label htmlFor="images">Upload Images/Reports:</label>
                <input type="file" id="images" name="images" onChange={(e)=>{setFiles(e.target.files)}} multiple /><br />

                <input type="submit" value="Submit" onClick={handleSubmit}/>
            </form>
        </div>
    );

}

export default SubmitMedicalHistory 
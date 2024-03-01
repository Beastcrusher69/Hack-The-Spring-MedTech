require('dotenv').config();
const express = require('express') ;
const cookieParser = require('cookie-parser') ;
const jwt = require('jsonwebtoken') ;
const app = express() ;
const cors = require('cors') ;
const mongoose = require('mongoose') ;
const mongoUri = process.env.MONGO_URI ;
const port = 4000 ;

const corsOptions = {
    // origin : "http://localhost:5173",
    origin : "https://hack-the-spring-med-tech.vercel.app",
    credentials : true,
    optionSuccessStatus : 200 
}

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

function AuthenticateToken(req,res,next){

    let token = req.cookies.authToken ;

    if(!token){
        res.sendStatus(401);
        return;
    }
    else{

        try{
            let payload = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);

            req.payload = payload;

            next();

            return;

        }
        catch{
            res.sendStatus(498);

            return;
        }
    }

}

mongoose.connect(mongoUri ,{ useNewUrlParser : true , useUnifiedTopology : true})
        .then(console.log("connected to database"))
        .catch((err)=>{console.log("mongoose connection error :" ,err)});


const UserSchema = mongoose.Schema({
    firstName : String ,
    lastName : String ,
    emailId : String ,
    phoneNo : Number ,
    password : String ,
    role : String 
})

const PatientSchema = mongoose.Schema({
     emailId : String , 
     address : String,
     city : String ,
     state : String ,
     birthdate : String ,
     age : Number ,
     gender : String,
    profilePicURL : String ,
     occupation : String,
     previousMedicalHistory : String,
     previousMedicalHistoryImageURLs : [String],
     myAppoinments : [
        {
            emailId : String,
            date : String ,
            time : String,
            reason : String ,
            status : String
        }
     ] 
    })

const DoctorSchema = mongoose.Schema({
    emailId : String , 
    address : String,
    city : String ,
    state : String ,
    birthdate : String ,
    age : Number ,
    gender : String,
    education : String,
    personalID : String,
    specialization: String ,
    experience : Number ,
    profilePicURL : String ,
    waitingList : [{
        emailId : String ,
        date : String ,
        time : String ,
        reason : String,
    }] ,
    appointments : [{
        emailId : String ,
        date : String ,
        time : String ,
        reason : String,
        status : String
    }]
   })

const Users = mongoose.model("Users" , UserSchema) ;
const Patients = mongoose.model("Patients" , PatientSchema) ;
const Doctors = mongoose.model("Doctors" , DoctorSchema) ;

app.get("/home" , (req , res)=>{
    res.json({
        "user1" : "jay k" ,
        "user2" : "hdshf fwef" ,
        "user3" : "wefw efwew" 
    })
}) 

app.post("/signup" , async (req , res)=>{

    let {firstName , lastName , emailId , phoneNumber, password , role } = req.body ;

    let user = await Users.findOne({emailId});
    let payload = { emailId };

    if(user){

        res.send({code : 1 , message : "email is already taken"});

        return ;
    }

    firstName = firstName.slice(0,1).toUpperCase() + firstName.slice(1);
    lastName = lastName.slice(0,1).toUpperCase() + lastName.slice(1);

    let userData = {firstName , lastName , emailId , phoneNumber , password , role } ;

    Users.create(userData) ; 

    let token = jwt.sign( payload , process.env.ACCESS_TOKEN_SECRET  ); 

    res.cookie("authToken" , token ,{ httpOnly : true , sameSite : "none" , secure : true})

    res.json({code : 2 , "user" : { firstName , lastName}});    
})

app.post("/login" , async (req , res)=>{

    let { emailId , password } = req.body ;

    let user = await Users.findOne({emailId});
    let payload = { emailId };

    if(!user || (password != user.password)){
        res.json({ code : 1 , message : "email or password is incorrect"});
    }
    else{

        let token = jwt.sign( payload , process.env.ACCESS_TOKEN_SECRET);

        let {firstName , lastName , role} = user;

        user = {firstName , lastName };

        res.cookie("authToken" , token ,{ httpOnly : true , sameSite : "none" , secure : true})
        res.json({ code : 2 , user , role});

    }

})

app.get("/choose-role" ,
 AuthenticateToken ,
async (req , res)=>{

    let emailId = req.payload.emailId ;

    let user = await Users.findOne({emailId}) ;

    res.json({code : 2 , message : "valid user" , role : user.role});
})

app.get("/submit-medical-history" ,
 AuthenticateToken ,
async (req , res)=>{

    let emailId = req.payload.emailId ;

    let user = await Users.findOne({emailId}) ; 

    res.json({code : 2 , message : "valid user" , role : user.role});
})

app.get("/submit-doctor-details" ,
 AuthenticateToken ,
async (req , res)=>{

    let emailId = req.payload.emailId ;

    let user = await Users.findOne({emailId}) ; 

    res.json({code : 2 , message : "valid user" , role : user.role});
})

app.get("/patient-dashboard" ,
 AuthenticateToken ,
async (req , res)=>{

    let emailId = req.payload.emailId ;

    let user = await Users.findOne({emailId}) ; 

    let doctors = await Doctors.find({}) ;

    console.log(doctors) ;

    let doctorData = await Promise.all(doctors.map(async (obj)=>{

        let {emailId , experience , specialization, city , state , profilePicURL} = obj ;

        let Duser = await Users.findOne({emailId : obj.emailId}) ;

        let { firstName, lastName } = Duser;

        return {name : [firstName, lastName].join(" ") , emailId , experience , specialization, city , state , profilePicURL} ;        
    }));

    res.json({code : 2 , message : "valid user" , role : user.role , doctorData});
})

app.get("/doctor-dashboard" ,
 AuthenticateToken ,
async (req , res)=>{

    let emailId = req.payload.emailId ;

    let user = await Users.findOne({emailId}) ; 

    let doctor = await Doctors.findOne({emailId}) ;

    let waitingListCount = doctor.waitingList.length ;

    let {appointments} = doctor ;
    // console.log(appointments) ;

    let cancelledAppointmentsCount = appointments.filter((obj)=>{
        return obj.status === "cancelled" ;
    }).length ;
    let scheduledAppointmentsCount = appointments.filter((obj)=>{
        return obj.status === "scheduled" ;
    }).length ;
    let completedCheckupsCount = appointments.filter((obj)=>{
        return obj.status === "completed" ;
    }).length ;

    res.json({code : 2 , message : "valid user" , role : user.role , waitingListCount ,cancelledAppointmentsCount , scheduledAppointmentsCount ,completedCheckupsCount});
})

app.get("/recent-appointments" ,
 AuthenticateToken ,
async (req , res)=>{

    let emailId = req.payload.emailId;
    let user = await Users.findOne({ emailId });
    let doctor = await Doctors.findOne({ emailId });
    let appointments = doctor.appointments;

    // Use Promise.all to wait for all asynchronous operations to complete
    let originalAppointments = await Promise.all(appointments.map(async (obj) => {
        let newObj;
        let { date, time, reason , status } = obj;
        let Puser = await Users.findOne({ emailId: obj.emailId });
        let { firstName, lastName } = Puser;

        newObj = {
            patientName: [firstName, lastName].join(" "),
            date,
            time,
            reason,
            status
        };

        return newObj; // Return the appointment object
    }));

    res.json({code : 2 , message : "valid user" , role : user.role , originalAppointments});
})

app.get("/waiting-list", AuthenticateToken, async (req, res) => {
    let emailId = req.payload.emailId;
    let user = await Users.findOne({ emailId });
    let doctor = await Doctors.findOne({ emailId });
    let waitingList = doctor.waitingList;

    // Use Promise.all to wait for all asynchronous operations to complete
    let appointments = await Promise.all(waitingList.map(async (obj) => {
        let newObj;
        let { date, time, reason } = obj;
        let Puser = await Users.findOne({ emailId: obj.emailId });
        let { firstName, lastName } = Puser;

        let patient = await Patients.findOne({ emailId: obj.emailId });
        let { age, gender } = patient;

        let ageRange;

        if (age <= 17) {
            ageRange = "Child";
        } else if (age >= 18 && age <= 39) {
            ageRange = "Adult";
        } else if (age >= 40 && age <= 64) {
            ageRange = "MiddleAge";
        } else {
            ageRange = "Old";
        }

        newObj = {
            patientName: [firstName, lastName].join(" "),
            age: ageRange,
            gender,
            date,
            time,
            reason
        };

        return newObj; // Return the appointment object
    }));

    console.log(appointments);
    res.json({ code: 2, message: "valid user", role: user.role, appointments });
});

app.get("/submit-availibility", AuthenticateToken, async (req, res) => {
    let emailId = req.payload.emailId;
    let user = await Users.findOne({ emailId });
    res.json({ code: 2, message: "valid user", role: user.role });
});

app.get("/submit-availibility" ,
 AuthenticateToken ,
async (req , res)=>{

    let emailId = req.payload.emailId ;

    let user = await Users.findOne({emailId}) ; 

    res.json({code : 2 , message : "valid user" , role : user.role});
})

app.get("/appointment-booking" ,
 AuthenticateToken ,
async (req , res)=>{

    let emailId = req.payload.emailId ;

    let user = await Users.findOne({emailId}) ; 

    res.json({code : 2 , message : "valid user" , role : user.role});
})

app.post("/submit-medical-history" , AuthenticateToken ,async (req , res)=>{

    let emailId = req.payload.emailId ;

    let user = await Users.findOne({emailId});
    
    user.role = "patient" ;

    user.save() ;

    let data = req.body ;
    console.log("data >>> " ,data) ;

    let PatientData = {emailId ,...data } ;

    console.log("patient data >>> " ,PatientData) ;
    Patients.create(PatientData) ;

    res.json({code : 2 , message : "data saved successfully"});
})

app.post("/submit-doctor-details" , AuthenticateToken ,async (req , res)=>{

    let emailId = req.payload.emailId ;

    let user = await Users.findOne({emailId});
    
    user.role = "doctor" ;

    user.save() ;

    let data = req.body ;
    // console.log("data >>> " ,data) ;

    let DoctorData = {emailId ,...data } ;
    console.log(DoctorData) ;

    console.log("doctor data >>> " , DoctorData) ;
    Doctors.create(DoctorData) ;

    res.json({code : 2 , message : "data saved successfully"});
})



// app.get("/select-patient" , AuthenticateToken, async (req , res)=>{

//     let emailId = req.payload.emailId ;

//     // console.log(payload) ;

//     let user = await Users.findOne({emailId})

//     user.role = "patient" ;

//     await user.save() ;

//     res.json({ code : 2 , message : "role set to patient"}) ;
// })

app.listen(port  , ()=>{
    console.log("listening on port :", port);
})

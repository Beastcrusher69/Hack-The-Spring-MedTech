import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Home from "./Home.jsx";
import ChooseRole from "./ChooseRole.jsx";
import PatientDashboard from "./PatientDashboard.jsx";
import SubmitMedicalHistory from "./SubmitMedicalHistory.jsx";
import SubmitDoctorDetails from "./SubmitDoctorDetails.jsx";
import DoctorDashboard from "./DoctorDashboard.jsx"
import RecentAppointments from "./RecentAppointments.jsx"
import WaitingList from "./WaitingList.jsx"
import SubmitAvailibility from "./SubmitAvailibility.jsx"
import AppointmentBooking from "./AppointmentBooking.jsx";
import YourAppointments from "./YourAppointments.jsx";

function App(){

    return(
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>}></Route>
                <Route exact path="/login" element={<Login/>}></Route>
                <Route exact path="/signup" element={<Signup/>}></Route>
                <Route exact path="/choose-role" element={<ChooseRole/>}></Route>
                <Route exact path="/patient-dashboard" element={<PatientDashboard/>}></Route>
                <Route exact path="/submit-medical-history" element={<SubmitMedicalHistory/>}></Route>
                <Route exact path="/submit-doctor-details" element={<SubmitDoctorDetails/>}></Route>
                <Route exact path="/doctor-dashboard" element={<DoctorDashboard/>}></Route>
                <Route exact path="/recent-appointments" element={<RecentAppointments/>}></Route>
                <Route exact path="/waiting-list" element={<WaitingList/>}></Route>
                <Route exact path="/submit-availibility" element={<SubmitAvailibility/>}></Route>
                <Route exact path="/appointment-booking" element={<AppointmentBooking/>}></Route>
                <Route exact path="/your-appointments" element={<YourAppointments/>}></Route>

            </Routes>
        </Router>
    )
} 

export default App ;
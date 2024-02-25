import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Home from "./Home.jsx";
import ChooseRole from "./ChooseRole.jsx";
import PatientHomePage from "./PatientHomePage.jsx";
import SubmitMedicalHistory from "./SubmitMedicalHistory.jsx";


function App(){

    return(
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>}></Route>
                <Route exact path="/login" element={<Login/>}></Route>
                <Route exact path="/signup" element={<Signup/>}></Route>
                <Route exact path="/choose-role" element={<ChooseRole/>}></Route>
                <Route exact path="/patient-home-page" element={<PatientHomePage/>}></Route>
                <Route exact path="/submit-medical-history" element={<SubmitMedicalHistory/>}></Route>
            </Routes>
        </Router>
    )
} 

export default App ;
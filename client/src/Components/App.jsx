import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Home from "./Home.jsx";
import ChooseRole from "./ChooseRole.jsx";

function App(){

    return(
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>}></Route>
                <Route exact path="/login" element={<Login/>}></Route>
                <Route exact path="/signup" element={<Signup/>}></Route>
                <Route exact path="/choose-role" element={<ChooseRole/>}></Route>
            </Routes>
        </Router>
    )
} 

export default App ;
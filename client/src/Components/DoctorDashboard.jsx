import React, { useEffect, useState } from "react";
import axios from 'axios';
import { be_url } from "/config"; 
import { useNavigate } from "react-router-dom";
import "../CSS/DoctorDashboard.css";

function DoctorDashBoard() {
    let navigate = useNavigate();
    let [waitingListCount , setWaitingListCount] = useState("") ;
    let [scheduledAppointmentsCount , setScheduledAppointmentsCount] = useState("") ;
    let [completedCheckupsCount , setCompletedCheckupsCount] = useState("") ;
    let [cancelledAppointmentsCount , setCancelledAppointmentsCount] = useState("") ;
    let [firstName , setFirstName] = useState("") ;
    let [lastName , setLastName] = useState("") ;

    const lastVisitedPage = localStorage.getItem('lastVisitedPage');

    useEffect(()=>{
        window.addEventListener('beforeunload', () => {
          localStorage.setItem('lastVisitedPage', window.location.pathname);
        });
      })

    useEffect(()=>{
        let user = JSON.parse(window.localStorage.getItem("user")) ;

        setFirstName(user.firstName);
        setLastName(user.lastName);
    } , [])  

    useEffect(()=>{

        axios.get(be_url + "/doctor-dashboard" , {withCredentials : true} )
             .then((res)=>{
                if(res.data.code == 2 && res.data.role == "doctor"){

                    console.log(res.data) ;

                    setCancelledAppointmentsCount(res.data.cancelledAppointmentsCount);
                    setCompletedCheckupsCount(res.data.completedCheckupsCount);
                    setScheduledAppointmentsCount(res.data.scheduledAppointmentsCount);
                    setWaitingListCount(res.data.waitingListCount) ;

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

    const toggleNav = () => {
        var navLinks = document.querySelector('.doctor-dashboard-nav-links');
        navLinks.classList.toggle('nav-active');

        var burgerLines = document.querySelectorAll('.doctor-dashboard-burger div');
        burgerLines.forEach((line, index) => {
            line.classList.toggle(`line${index + 1}-active`);
        });
    }

    const toggleSubMenu = () => {
        var subMenu = document.querySelector('.doctor-dashboard-nav-links > li > .doctor-dashboard-sub-menu');
        subMenu.classList.toggle('show');
    }

    return (
        <div>
            <header id="doctor-dashboard-header">
                <div className="doctor-dashboard-welcome">Welcome, {firstName} {lastName}</div>
                <nav id="doctor-dashboard-nav">
                    <ul className="doctor-dashboard-nav-links">
                        <li>
                            <button 
                            // href="#appointments" 
                            onClick={toggleSubMenu}>Appointments</button>
                            <ul className="doctor-dashboard-sub-menu">
                                <li><button 
                                // href="recentAppointments.html"
                                onClick={()=>{navigate("/recent-appointments")}}
                                >Recent Appointments</button></li>
                                <li><button 
                                // href="waitingList.html"
                                onClick={()=>{navigate("/waiting-list")}}
                                >Future Appointments</button></li>
                            </ul>
                        </li>
                        <li><button 
                        // href="#patients"
                        >Patients</button></li>
                        <li><button 
                        // href="#profile"
                        >Profile</button></li>
                        <li><button 
                        // href="#logout"
                        >Logout</button></li>
                    </ul>
                    <div className="doctor-dashboard-burger" onClick={toggleNav}>
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
                </nav>
            </header>
            <main className="doctor-dashboard-main">
                <div className="doctor-dashboard-container">
                    <section className="doctor-dashboard-section">
                        <h2>Scheduled Appointments</h2>
                        <p>Total Scheduled Appointments: <span id="scheduledAppointmentsCount">{scheduledAppointmentsCount}</span></p>
                        <button 
                        // href="recentAppointments.html?filter=Scheduled"
                        onClick={()=>{const filter = 'scheduled'; navigate(`/recent-appointments?filter=${filter}`); }}
                        >View Scheduled Appointments</button>
                    </section>
                    <section className="doctor-dashboard-section">
                        <h2>Completed Checkups</h2>
                        <p>Total Completed Appointments: <span id="completedAppointmentsCount">{completedCheckupsCount}</span></p>
                        <button 
                        // href="recentAppointments.html?filter=completed"
                        onClick={()=>{const filter = 'completed'; navigate(`/recent-appointments?filter=${filter}`); }}
                        >View Completed Appointments</button>
                    </section>
                    <section className="doctor-dashboard-section">
                        <h2>Wait-List</h2>
                        <p>Total Appointments in queue: <span id="totalAppointmentsCountinQueue">{waitingListCount}</span></p>
                        <button 
                        // href="waitingList.html"
                        onClick={()=>{navigate("/waiting-list"); }}
                        >View Appointment Queue</button>
                    </section>
                    <section className="doctor-dashboard-section">
                        <h2>Cancelled Appointment</h2>
                        <p>Total cancelled Appointments: <span id="totalcancelledAppointmentsCount">{cancelledAppointmentsCount}</span></p>
                        <button 
                        // href="recentAppointments.html?filter=cancelled"
                        onClick={()=>{const filter = 'cancelled'; navigate(`/recent-appointments?filter=${filter}`); }}
                        >View Cancelled Appointment</button>
                    </section>
                    <section className="doctor-dashboard-section">
                        <h2>Patient Details</h2>
                        <button 
                        // href="#"
                        >Patients Page</button>
                    </section>

                    <section className="doctor-dashboard-section">
                    <h2>Submit Availability</h2>
                    <button 
                    // href="#Path to Doctor Availability JSX Page"
                    onClick={()=>{navigate("/submit-availibility")}}
                    >Submit Your Availability</button>

                    </section>
                </div>
            </main>
            <footer id="doctor-dashboard-footer">
                <div className="doctor-dashboard-contact-info">
                    <h3>Contact Information</h3>
                    <p>123 Main Street, City, Country</p>
                    <p>Phone: +123-456-7890</p>
                    <p>Email: info@example.com</p>
                </div>
                <div className="doctor-dashboard-quick-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><button href="#">Clinic Website</button></li>
                        <li><button href="#">Patient Records</button></li>
                        <li><button href="#appointments">Appointment Management</button></li>
                    </ul>
                </div>
                <div className="doctor-dashboard-legal-info">
                    <p>&copy; 2024 Doctor Dashboard. All rights reserved.</p>
                    <p><button href="#">Privacy Policy</button> | <button href="#">Terms of Service</button></p>
                </div>
            </footer>
        </div>
    );
}

export default DoctorDashBoard;

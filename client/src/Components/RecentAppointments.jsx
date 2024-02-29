import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { be_url } from "/config";
import { useNavigate } from 'react-router-dom';
import '../CSS/RecentAppointments.css';

function RecentAppointments() {
    let navigate = useNavigate();

    const [filterByStatus, setFilterByStatus] = useState('all');
    const [originalAppointments, setOriginalAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const lastVisitedPage = localStorage.getItem('lastVisitedPage');

    useEffect(() => {
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('lastVisitedPage', window.location.pathname);
        });
    }, []);

    useEffect(() => {
        axios.get(be_url + "/recent-appointments", { withCredentials: true })
            .then((res) => {
                if (res.data.code === 2 && res.data.role === "doctor") {
                    console.log(res.data);
                    setOriginalAppointments(res.data.originalAppointments);
                } else {
                    if (lastVisitedPage) {
                        navigate(lastVisitedPage);
                    } else {
                        navigate("/");
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                navigate("/");
            });
    }, []);

    useEffect(() => {
        // useEffect(()=>{

            const urlParams = new URLSearchParams(window.location.search);
            const filter = urlParams.get('filter');
            
            filterAppointments(filter) ;
    
        // } , [])
    }, [originalAppointments]); // Update filteredAppointments when originalAppointments change

    const filterAppointments = (status) => {
        setFilterByStatus(status);
        if (status === 'all') {
            setFilteredAppointments(originalAppointments);
        } else {
            const filteredAppointments = originalAppointments.filter(appointment => appointment.status === status);
            setFilteredAppointments(filteredAppointments);
        }
    };

    const searchAppointments = (e) => {
        const searchInput = e.target.value.trim().toLowerCase();
        const filteredAppointments = originalAppointments.filter(appointment => {
            const patientName = appointment.patientName.toLowerCase();
            return patientName.includes(searchInput) && (filterByStatus === 'all' || appointment.status === filterByStatus);
        });
        setFilteredAppointments(filteredAppointments);
    };

    const displayAppointments = (appointmentsToDisplay) => {
        return (
            appointmentsToDisplay.map(appointment => (
                <tr key={appointment.patientName}>
                    <td>{appointment.patientName}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.reason}</td>
                    <td>{appointment.status}</td>
                    <td>
                        <button onClick={() => console.log('View details for:', appointment.patientName)}>
                            View Details
                        </button>
                    </td>
                </tr>
            ))
        );
    };

    return (
        <div id='recentAPP'>
            <h1 id='recent-app-herotext'>Recent Appointments</h1>
            <hr />
            <div className="recent-app-controls">
                <div className="recent-app-filter">
                    Filter by Status:
                    <select id="recent-app-statusFilter" onChange={(e) => filterAppointments(e.target.value)}>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            <hr />
            <div>
                Search by Patient Name:
                <input type="text" id="recent-app-searchInput" onChange={searchAppointments} />
            </div>
            <hr />

            <table id="recent-app-appointmentsTable">
                <thead>
                    <tr>
                        <th>Patient Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {displayAppointments(filteredAppointments)}
                </tbody>
            </table>
        </div>
    );
}

export default RecentAppointments;

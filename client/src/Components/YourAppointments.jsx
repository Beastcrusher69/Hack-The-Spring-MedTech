import React, { useEffect, useState } from "react";
import axios from 'axios';
import { be_url } from "/config"; 
import { useNavigate } from "react-router-dom";
import '../CSS/YourAppointments.css';

const YourAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    let navigate = useNavigate() ;

    useEffect(()=>{
        window.addEventListener('beforeunload', () => {
          localStorage.setItem('lastVisitedPage', window.location.pathname);
        });
      })

    useEffect(()=>{

        axios.get(be_url + "/your-appointments" , {withCredentials : true} )
             .then((res)=>{
                if(res.data.code == 2 && res.data.role == "patient"){
                    console.log(res.data) ;
                    setAppointments(res.data.yourAppointments) ;


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
        displayAppointments(appointments);
    }, [appointments]);

    const displayAppointments = (appointmentsToDisplay) => {
        const tableBody = document.querySelector('#your-app-appointmentsTable tbody');
        tableBody.innerHTML = '';

        appointmentsToDisplay.forEach(appointment => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = appointment.aid;
            row.insertCell(1).textContent = appointment.fullName;
            row.insertCell(2).textContent = appointment.date;
            row.insertCell(3).textContent = appointment.time;
            row.insertCell(4).textContent = appointment.reason;
            row.insertCell(5).textContent = appointment.status;

        });
    }

    const filterAppointments = () => {
        const statusFilter = document.getElementById('your-app-statusFilter').value;

        const filteredAppointments = appointments.filter(appointment => {
            const statusMatch = statusFilter === 'all' || appointment.status === statusFilter.toLowerCase();
            return statusMatch;
        });

        displayAppointments(filteredAppointments);
    }

    const sortTable = (columnIndex) => {
        const statusFilter = document.getElementById('your-app-statusFilter').value;
        let sortedAppointments = appointments;

        if (statusFilter !== 'all') {
            sortedAppointments = sortedAppointments.filter(appointment => appointment.status === statusFilter);
        }

        sortedAppointments.sort((a, b) => {
            const valueA = a[Object.keys(a)[columnIndex]];
            const valueB = b[Object.keys(b)[columnIndex]];
            if (typeof valueA === 'string') {
                return valueA.localeCompare(valueB);
            } else {
                return valueA - valueB;
            }
        });
        displayAppointments(sortedAppointments);
    }

    const searchAppointments = (e) => {
        const searchInput = e.target.value.trim().toLowerCase();
        const statusFilter = document.getElementById('your-app-statusFilter').value;

        const filteredAppointments = appointments.filter(appointment => {
            const doctorName = appointment.doctorName.toLowerCase();
            const status = appointment.status;
            return doctorName.includes(searchInput) && (statusFilter === 'all' || status === statusFilter);
        });

        displayAppointments(filteredAppointments);
    }

    return (
        <div className="your-app-container">
            <h1 id='your-app-herotext'>Your Appointments</h1>
            <hr />
            <div className="your-app-controls">
                <div className="your-app-sort">
                    Sort by:
                    <button onClick={() => sortTable(1)}>Doctor Name</button>
                    <button onClick={() => sortTable(2)}>Date</button>
                </div>
                <div className="your-app-filter">
                    Filter by Status:
                    <select id="your-app-statusFilter" onChange={filterAppointments}>
                        <option value="all">All</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Pending">Pending</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            <hr />
            <div id='your-app-searchbar'>
                Search by Doctor Name:
                <input type="text" id="your-app-searchInput" onInput={searchAppointments} />
            </div>
            <hr />

            <table id="your-app-appointmentsTable">
                <thead>
                    <tr>
                        <th>Appointment Id</th>
                        <th>Doctor Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Appointments will be dynamically added here */}
                </tbody>
            </table>
        </div>
    );
}

export default YourAppointments;
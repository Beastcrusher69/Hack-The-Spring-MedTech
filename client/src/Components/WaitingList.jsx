import React, { useEffect, useState } from "react";
import axios from 'axios';
import { be_url } from "/config"; 
import { useNavigate } from "react-router-dom";
import "../CSS/WaitingList.css";

const WaitingList = () => {

    let navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);
    const lastVisitedPage = localStorage.getItem('lastVisitedPage');

    useEffect(()=>{
        window.addEventListener('beforeunload', () => {
          localStorage.setItem('lastVisitedPage', window.location.pathname);
        });
      })

    useEffect(()=>{

        axios.get(be_url + "/waiting-list" , {withCredentials : true} )
             .then((res)=>{
                if(res.data.code == 2 && res.data.role == "doctor"){

                    console.log(res.data) ;

                    setAppointments(res.data.appointments)

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
        const tableBody = document.querySelector('#wait-list-appointmentsTable tbody');
    
        // Clear previous content
        tableBody.innerHTML = '';
    
        // Append each appointment to the table body
        appointmentsToDisplay.forEach(appointment => {
            const row = tableBody.insertRow();
            // row.insertCell(0).textContent = appointment.id;
            row.insertCell(0).textContent = appointment.patientName;
            row.insertCell(1).textContent = appointment.date;
            row.insertCell(2).textContent = appointment.time;
            row.insertCell(3).textContent = appointment.reason;
            row.insertCell(4).textContent = appointment.age;
            row.insertCell(5).textContent = appointment.gender;
    
            const actionCell = row.insertCell(6);
            const acceptButton = document.createElement('button');
            acceptButton.textContent = 'Accept';
            acceptButton.addEventListener('click', () => {
                console.log('Accepted for:', appointment.patientName);
            });
            actionCell.appendChild(acceptButton);
            const rejectButton = document.createElement('button');
            rejectButton.textContent = 'Reject';
            rejectButton.addEventListener('click', () => {
                console.log('Rejected for:', appointment.patientName);
            });
            actionCell.appendChild(rejectButton);
        });
    }
    

    const filterAppointments = () => {
        const ageFilter = document.getElementById('wait-list-ageFilter').value;
        const genderFilter = document.getElementById('wait-list-genderFilter').value;

        const filteredAppointments = appointments.filter(appointment => {
            const ageMatch = ageFilter === 'all' || appointment.age === ageFilter;
            const genderMatch = genderFilter === 'All' || appointment.gender.toLowerCase() === genderFilter.toLowerCase();
            return ageMatch && genderMatch;
        });

        displayAppointments(filteredAppointments);
    }

    const sortTable = (columnIndex) => {
        const ageFilter = document.getElementById('wait-list-ageFilter').value;
        let sortedAppointments = appointments;

        if (ageFilter !== 'all') {
            sortedAppointments = sortedAppointments.filter(appointment => appointment.age === ageFilter);
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
        const ageFilter = document.getElementById('wait-list-ageFilter').value;

        const filteredAppointments = appointments.filter(appointment => {
            const patientName = appointment.patientName.toLowerCase();
            const age = appointment.age;
            return patientName.includes(searchInput) && (ageFilter === 'all' || age === ageFilter);
        });

        displayAppointments(filteredAppointments);
    }

    return (
        <div className="wait-list-container">
            <h1 id='wait-list-herotext'>Waiting List</h1>
            <hr />
            <div className="wait-list-controls">
                <div className="wait-list-sort">
                    Sort by:
                    <button onClick={() => sortTable(0)}>Patient ID</button>
                    <button onClick={() => sortTable(1)}>Patient Name</button>
                    <button onClick={() => sortTable(2)}>Date</button>
                </div>
                <div className="wait-list-filter">
                    Filter by Status:
                    <select id="wait-list-ageFilter" onChange={filterAppointments}>
                        <option value="all">All</option>
                        <option value="Child">Child</option>
                        <option value="Adult">Adult</option>
                        <option value="MiddleAge">MiddleAge</option>
                        <option value="Old">Old</option>
                    </select>
                    <select id="wait-list-genderFilter" onChange={filterAppointments}>
                        <option value="All">All</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
            </div>

            <hr />
            <div>
                Search by Patient Name:
                <input type="text" id="wait-list-searchInput" onInput={searchAppointments} />
            </div>
            <hr />

            <table id="wait-list-appointmentsTable">
                <thead>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Patient Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Reason</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>ToDo</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Appointments will be dynamically added here */}
                </tbody>
            </table>
        </div>
    );
}

export default WaitingList;

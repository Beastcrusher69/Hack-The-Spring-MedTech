import React, { useEffect, useState } from "react";
import axios from 'axios';
import { be_url } from "/config"; 
import { useNavigate } from "react-router-dom";
import "../CSS/WaitingList.css";

const WaitingList = () => {
    let navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [ageFilter, setAgeFilter] = useState('all');
    const [genderFilter, setGenderFilter] = useState('All');
    const [searchInput, setSearchInput] = useState('');
    const lastVisitedPage = localStorage.getItem('lastVisitedPage');

    useEffect(() => {
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('lastVisitedPage', window.location.pathname);
        });
    });

    useEffect(() => {
        axios.get(be_url + "/waiting-list", { withCredentials: true })
            .then((res) => {
                if (res.data.code == 2 && res.data.role == "doctor") {
                    console.log(res.data);
                    setAppointments(res.data.appointments);
                    setFilteredAppointments(res.data.appointments);
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
        filterAppointments();
    }, [appointments, ageFilter, genderFilter, searchInput]);

    const acceptAppointment = (key) => {

        axios.post(be_url + "/accepted-appointment" , {key} , {withCredentials : true})
        .then((res)=>{
            console.log(res.data) ;
        })
        .catch((err)=>{
            console.log(err) ;
        })
        console.log('Accepted for:', key);
        // Perform accept action, e.g., update the status in the database
    };

    const rejectAppointment = (key) => {

        axios.post(be_url + "/rejected-appointment" , {key} , {withCredentials : true})
        .then((res)=>{
            console.log(res.data) ;
        })
        .catch((err)=>{
            console.log(err) ;
        })
        console.log('Rejected for:', key);
        // Perform accept action, e.g., update the status in the database
    };

    const filterAppointments = () => {
        let filteredAppointments = appointments.filter(appointment => {
            const ageMatch = ageFilter === 'all' || appointment.age === ageFilter;
            const genderMatch = genderFilter === 'All' || appointment.gender.toLowerCase() === genderFilter.toLowerCase();
            const searchMatch = searchInput.trim() === '' || appointment.patientName.toLowerCase().includes(searchInput.toLowerCase());
            return ageMatch && genderMatch && searchMatch;
        });
        setFilteredAppointments(filteredAppointments);
    };

    const sortTable = (columnIndex) => {
        const sortedAppointments = [...filteredAppointments].sort((a, b) => {
            const valueA = a[Object.keys(a)[columnIndex]];
            const valueB = b[Object.keys(b)[columnIndex]];
            if (typeof valueA === 'string') {
                return valueA.localeCompare(valueB);
            } else {
                return valueA - valueB;
            }
        });
        setFilteredAppointments(sortedAppointments);
    };

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
                    <select id="wait-list-ageFilter" value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)}>
                        <option value="all">All</option>
                        <option value="Child">Child</option>
                        <option value="Adult">Adult</option>
                        <option value="MiddleAge">MiddleAge</option>
                        <option value="Old">Old</option>
                    </select>
                    <select id="wait-list-genderFilter" value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
                        <option value="All">All</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
            </div>
            <hr />
            <div>
                Search by Patient Name:
                <input type="text" id="wait-list-searchInput" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
            </div>
            <hr />
            <table id="wait-list-appointmentsTable">
                <thead>
                    <tr>
                        <th>Appointment ID</th>
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
                    {filteredAppointments.map((appointment) => (
                        <tr key={appointment.aid}>
                            <td>{appointment.aid}</td>
                            <td>{appointment.patientName}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
                            <td>{appointment.reason}</td>
                            <td>{appointment.age}</td>
                            <td>{appointment.gender}</td>
                            <td>
                                <button onClick={() => acceptAppointment(appointment.aid)}>Accept</button>
                                <button onClick={() => rejectAppointment(appointment.aid)}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default WaitingList;
``

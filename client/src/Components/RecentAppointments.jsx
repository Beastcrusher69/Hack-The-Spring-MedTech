import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { be_url } from "/config";
import { useNavigate } from 'react-router-dom';
import '../CSS/RecentAppointments.css';

function RecentAppointments() {
    let navigate = useNavigate();

    const [sortBy, setSortBy] = useState(null);
    const [filterByStatus, setFilterByStatus] = useState('all');
    const originalAppointments = [
        { id: 1, patientName: "John Doe", date: "2024-02-23", time: "10:00 AM", reason: "Regular Checkup", status: "completed" },
        { id: 2, patientName: "Jane Smith", date: "2024-02-24", time: "01:06 AM", reason: "Dental Cleaning", status: "pending" },
        { id: 3, patientName: "Dhiraj Prajapati", date: "2024-02-22", time: "09:30 AM", reason: "Consultant", status: "pending" },
        { id: 4, patientName: "Elon Smith", date: "2024-01-01", time: "11:30 AM", reason: "Operation", status: "completed" },
        { id: 5, patientName: "oontie ith", date: "2023-12-25", time: "04:30 PM", reason: "Operation", status: "cancelled" }
    ];
    const [filteredAppointments, setFilteredAppointments] = useState(originalAppointments);
    const lastVisitedPage = localStorage.getItem('lastVisitedPage');

    useEffect(()=>{
        window.addEventListener('beforeunload', () => {
          localStorage.setItem('lastVisitedPage', window.location.pathname);
        });
      })

    useEffect(()=>{

        axios.get(be_url + "/recent-appointments" , {withCredentials : true} )
             .then((res)=>{
                if(res.data.code == 2 && res.data.role == "doctor"){

                    console.log(res.data) ;

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

    useEffect(()=>{

        const urlParams = new URLSearchParams(window.location.search);
        const filter = urlParams.get('filter');
        
    
        if (filter === 'pending') {
            // Filter the appointments to show only pending ones
            filterAndDisplayAppointments('pending');
        } else if(filter === 'completed'){
            filterAndDisplayAppointments('completed');
        } else if(filter === 'cancelled'){
            filterAndDisplayAppointments('cancelled');
        } else {
            // Filter the appointments based on the status filter
            displayAppointments(originalAppointments);
        }

    } , [])

   

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
    
    const searchAppointments = (e) => {
        const searchInput = e.target.value.trim().toLowerCase();
        const filteredAppointments = originalAppointments.filter(appointment => {
            const patientName = appointment.patientName.toLowerCase();
            const status = appointment.status.toLowerCase();
            return patientName.includes(searchInput) && (filterByStatus === 'all' || status === filterByStatus);
        });
        setFilteredAppointments(filteredAppointments);
    };
    
    const filterAppointments = (e) => {
        const status = e.target.value;
        setFilterByStatus(status);
        if (status === 'all') {
            setFilteredAppointments(originalAppointments);
        } else {
            const filteredAppointments = originalAppointments.filter(appointment => appointment.status === status);
            setFilteredAppointments(filteredAppointments);
        }
    };

    function filterAndDisplayAppointments(str){
        const status = str;
        setFilterByStatus(status);
        if (status === 'all') {
            setFilteredAppointments(originalAppointments);
        } else {
            const filteredAppointments = originalAppointments.filter(appointment => appointment.status === status);
            setFilteredAppointments(filteredAppointments);
        }
    }
    
    useEffect(() => {
        const filteredAppointments = originalAppointments.filter(appointment => {
            return filterByStatus === 'all' || appointment.status === filterByStatus;
        });
        setFilteredAppointments(filteredAppointments);
    }, [filterByStatus]);
    
    const displayAppointments = (appointmentsToDisplay) => {
        return (
            appointmentsToDisplay.map(appointment => (
                <tr key={appointment.id}>
                    <td>{appointment.id}</td>
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
                <div className="recent-app-sort">
                    Sort by:
                    <button onClick={() => sortTable(0)}>Patient ID</button>
                    <button onClick={() => sortTable(1)}>Patient Name</button>
                    <button onClick={() => sortTable(2)}>Date</button>
                </div>
                <div className="recent-app-filter">
                    Filter by Status:
                    <select id="recent-app-statusFilter" onChange={filterAppointments}>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
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
                        <th>ID</th>
                        <th>Patient Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Reason</th>
                        <th>Action</th>
                        <th>Patient History</th>
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

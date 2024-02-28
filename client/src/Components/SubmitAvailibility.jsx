import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { be_url } from "/config"; 
import { useNavigate } from "react-router-dom";
import '../CSS/SubmitAvailibility.css';

const SubmitAvailability = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

    let navigate = useNavigate();
    const lastVisitedPage = localStorage.getItem('lastVisitedPage');

    useEffect(()=>{
        window.addEventListener('beforeunload', () => {
          localStorage.setItem('lastVisitedPage', window.location.pathname);
        });
      })

    useEffect(()=>{

        axios.get(be_url + "/submit-availibility" , {withCredentials : true} )
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


    useEffect(() => {
        displayDates(currentMonth, currentYear);
        generateTimeSlots();
    }, [currentMonth, currentYear]);

    const displayDates = (month, year) => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate()); // Set minimum date to tomorrow
    
        const monthLabel = document.querySelector('.Avalible-Doc-TimeSlot-month');
        const datesContainer = document.querySelector('.Avalible-Doc-TimeSlot-dates');
    
        if ((year > currentYear || (year === currentYear && month >= currentMonth)) || (year === currentYear && month < currentMonth)) {
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const firstDayOfMonth = new Date(year, month, 1).getDay();
    
            monthLabel.textContent = `${getMonthName(month)} ${year}`;
            datesContainer.innerHTML = '';
    
            for (let i = 1; i <= daysInMonth; i++) {
                const dateElement = document.createElement('div');
                dateElement.classList.add('Avalible-Doc-TimeSlot-date');
                dateElement.textContent = i;
    
                const dateToCheck = new Date(year, month, i);
    
                if (dateToCheck >= tomorrow ) { 
                    dateElement.addEventListener('click', () => {
                        const selectedDate = document.querySelector('.Avalible-Doc-TimeSlot-date.selected');
                        if (selectedDate) selectedDate.classList.remove('selected');
                        dateElement.classList.add('selected');
                    });
                    datesContainer.appendChild(dateElement);
                } else {
                    dateElement.classList.add('disabled');
                    // datesContainer.appendChild(dateElement);
                }
            }
        } else {
            monthLabel.textContent = '';
            datesContainer.innerHTML = '';
        }
    };
    

    const getMonthName = (month) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[month];
    };

    const generateTimeSlots = () => {
        const timeSlotsContainer = document.getElementById('Avalible-Doc-TimeSlot-timeSlots');
        timeSlotsContainer.innerHTML = '';

        const startTimes = ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'];
        const endTimes = ['10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM'];

        for (let i = 0; i < startTimes.length; i++) {
            const startTime = startTimes[i];
            const endTime = endTimes[i];

            const timeSlotDiv = document.createElement('div');
            timeSlotDiv.classList.add('Avalible-Doc-TimeSlot-time-slot');
            timeSlotDiv.textContent = `${startTime} - ${endTime}`;
            timeSlotDiv.setAttribute('data-start-time', startTime);
            timeSlotDiv.setAttribute('data-end-time', endTime);
            timeSlotDiv.addEventListener('click', toggleTimeSlot);
            timeSlotsContainer.appendChild(timeSlotDiv);
        }
    };

    const toggleTimeSlot = (event) => {
        const selectedTimeSlot = event.target;
        selectedTimeSlot.classList.toggle('selected');
    };

    const submitAvailability = () => {
        const selectedDate = document.querySelector('.Avalible-Doc-TimeSlot-date.selected');
        const selectedTimeSlots = document.querySelectorAll('.Avalible-Doc-TimeSlot-time-slot.selected');

        if (selectedDate && selectedTimeSlots.length > 0) {
            const availability = {
                date: selectedDate.textContent,
                timeSlots: []
            };

            selectedTimeSlots.forEach(timeSlot => {
                const startTime = timeSlot.getAttribute('data-start-time');
                const endTime = timeSlot.getAttribute('data-end-time');
                availability.timeSlots.push({ startTime, endTime });
            });

            console.log('Doctor availability:', availability);
        } else {
            alert('Please select a date and at least one time slot.');
        }
    };

    const prevMonth = () => {
        let newMonth = currentMonth - 1;
        let newYear = currentYear;
        if (newMonth < 0) {
            newMonth = 11;
            newYear--;
        }
        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    };

    const nextMonth = () => {
        let newMonth = currentMonth + 1;
        let newYear = currentYear;
        if (newMonth > 11) {
            newMonth = 0;
            newYear++;
        }
        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    };

    return (
        <div>
            <h1 id="Avalible-Doc-TimeSlot-herotext">
                <img src="icons8-tick.gif" alt="Tick icon" />👨‍⚕️ Doctor Availability
            </h1>
            <hr />
            <div id="Avalible-Doc-TimeSlot-Date-container">
                <h2>Select Date:</h2>
                <div className="Avalible-Doc-TimeSlot-date-container">
                    <div className="Avalible-Doc-TimeSlot-navigation">
                        <button id="Avalible-Doc-TimeSlot-prevMonth" onClick={prevMonth}>
                            <img src="icons8-less-than-64.png" alt="Previous month" />
                        </button>
                        <div className="Avalible-Doc-TimeSlot-month"></div>
                        <button id="Avalible-Doc-TimeSlot-nextMonth" onClick={nextMonth}>
                            <img src="icons8-greater-than-64 (1).png" alt="Next month" />
                        </button>
                    </div>
                    <div className="Avalible-Doc-TimeSlot-dates"></div>
                </div>
            </div>

            <h2>Select Time Slots:</h2>
            <div id="Avalible-Doc-TimeSlot-timeSlots">
                {/* Time slots will be dynamically generated here */}
            </div>

            <div className="Avalible-Doc-TimeSlot-submitbutton">
                <button className="Avalible-Doc-TimeSlot-button-33" onClick={submitAvailability} role="button">
                    Submit Availability
                </button>
            </div>
        </div>
    );
};

export default SubmitAvailability;

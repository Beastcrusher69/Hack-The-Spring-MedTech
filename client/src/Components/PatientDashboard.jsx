import { useEffect, useState } from "react"
import axios from 'axios';
import {be_url} from "/config"
import {useNavigate , Link} from "react-router-dom";
import "../CSS/PatientDashboard.css";
import Chatbox from "./Chatbox.jsx";
import NewChatBox from "./NewChatBox.jsx";
import Typed from 'typed.js';

function PatientDashboard() {

    let [displayChatbox , setDisplayChatbox] = useState(false) ;
    let navigate = useNavigate();
    const lastVisitedPage = localStorage.getItem('lastVisitedPage');
    let [firstName , setFirstName] = useState("") ;
    let [lastName , setLastName] = useState("") ;
    let [doctors , setDoctors] = useState("") ;
    let [docName,setDocName] = useState("");
    let [docEmailId,setDocEmailId] = useState("");
    let searchDoctorInput ;
    let filterSpecializationSelect ;
    let doctorProfiles ;

    useEffect(()=>{
        window.addEventListener('beforeunload', () => {
          localStorage.setItem('lastVisitedPage', window.location.pathname);
        });
      })

    useEffect(()=>{

        axios.get(be_url + "/patient-dashboard" , {withCredentials : true} )
             .then((res)=>{
                if(res.data.code == 2 && res.data.role == "patient"){

                    console.log(res.data.doctorData) ;
                    setDoctors(res.data.doctorData) ;   

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
        let user = JSON.parse(window.localStorage.getItem("user")) ;

        setFirstName(user.firstName);
        setLastName(user.lastName);


    } , []) 

    useEffect(() => {
        // Initialize Typed.js after component is rendered
        var typed = new Typed('#patient-homepage-quote', {
            strings: [
                '"Health is the foundation of peace and happiness. 🌱"',
                '"Love and peace flourish where health and wellness are nurtured. 🌞"',
                '"To keep the body in good health is a duty... otherwise we shall not be able to keep our mind strong and clear. 💖"'
            ],
            typeSpeed: 35,
            loop: true
        });

        // Cleanup function
        return () => {
            typed.destroy(); // Destroy Typed instance to prevent memory leaks
        };
    }, []);  

    useEffect(()=>{

        const handleAccordionClick = () => {
            const accordionBtns = document.querySelectorAll(".patient-homepage-accordion__title");
            console.log("acc>>" , accordionBtns) ;
    
            accordionBtns.forEach((button) => {
                button.addEventListener("click", () => {
                    const accCollapse = button.nextElementSibling;
                    console.log(accCollapse) ;
    
                    if (!accCollapse.classList.contains("collapsing")) {
                        // open accordion item
                        if (!accCollapse.classList.contains("open")) {
                            accCollapse.style.display = "block";
                            console.log(accCollapse.clientHeight) ;
                            const accHeight = accCollapse.clientHeight;
    
                            // setTimeout(() => {
                            //     accCollapse.style.height = accHeight + "px";
                            //     accCollapse.style.display = "";
                            // }, 1);
    
                            // accCollapse.classList = "patient-homepage-accordion__collapse collapsing";
    
                            // setTimeout(() => {
                            //     accCollapse.classList = "patient-homepage-accordion__collapse collapse open";
                            // }, 300);
                        }
                        // close accordion item
                        else {
                            accCollapse.classList = "patient-homepage-accordion__collapse collapsing";
    
                            setTimeout(() => {
                                accCollapse.style.height = "0px";
                            }, 1);
    
                            setTimeout(() => {
                                accCollapse.classList = "patient-homepage-accordion__collapse collapse";
                                accCollapse.style.height = "";
                            }, 300);
                        }
    
                        button.classList.toggle("open");
                    }
                });
            });
        };
    
        handleAccordionClick();

    },[])    
    
    useEffect(() => {
        const menuToggle = document.querySelector('.patient-homepage-menu-toggle');
        const navList = document.querySelector('#patient-homepage-nav ul');

        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('show');
            menuToggle.classList.toggle('active');
        });

        // console.log("1>>",document.getElementById('searchDoctor')) ;
        searchDoctorInput = document.getElementById('searchDoctor');
        // console.log("2>>",document.getElementById('searchDoctor')) ;

        filterSpecializationSelect = document.getElementById('filterSpecialization');
        doctorProfiles = document.getElementsByClassName('patient-homepage-doctor-profile');
        // console.log("1>>" , document.getElementsByClassName('patient-homepage-doctor-profile')) ;
        // console.log("2>>",doctorProfiles);

        // Add event listeners for input fields
        searchDoctorInput.addEventListener('input', filterDoctors);
        filterSpecializationSelect.addEventListener('change', filterDoctors);

        

        
    }, [doctors]);
    
    function filterDoctors() {
        console.log(searchDoctorInput.value.toLowerCase()) ;
        const searchValue = searchDoctorInput.value.toLowerCase();

        const specializationValue = filterSpecializationSelect.value.toLowerCase();
        // console.log("1>>" ,specializationValue) ;
    
        // Loop through doctor profiles and apply or remove a class based on filter criteria
        // console.log("hi>>" , doctorProfiles) ;
        const profilesArray = [...doctorProfiles];

        profilesArray.forEach(profile => {
        const doctorName = profile.querySelector('.patient-homepage-doctor-info h2').textContent.toLowerCase();
        // console.log("dn>>" ,doctorName) ;

        const doctorSpecialization = profile.querySelector('.patient-homepage-doctor-info .dr-specialization').textContent.toLowerCase();
        // console.log("ds>>" ,doctorSpecialization) ;
    
        const nameMatch = doctorName.includes(searchValue);
        // console.log("namematch>>" ,nameMatch) ;

        
        const specializationMatch = specializationValue === '' || doctorSpecialization.includes(specializationValue);
        // console.log("spmatch>>" ,specializationMatch) ;

    
        if (nameMatch && specializationMatch) {
            profile.style.display = 'block'; // Show doctor profile
        } else {
            profile.style.display = 'none'; // Hide doctor profile
        }
        });
    }

    // useEffect(()=>{

    //     if(docName !== "" && docEmailId !== ""){
    //         handleBookAppointment() ;
    //     }
    // } , [docName , docEmailId]) ;

    function handleBookAppointment(obj) {
        
        // Create a doctor object with docName and docEmailId
        // Store the doctor object in local storage

        window.localStorage.setItem("doctor", JSON.stringify({docName : obj.name, docEmailId : obj.emailId}));
      
        // Navigate to the "/appointment-booking" route
        navigate("/appointment-booking");
      }
      

  return (
    <>
        {/* {displayChatbox ? <Chatbox displayChatbox={displayChatbox} setDisplayChatbox = {setDisplayChatbox}></Chatbox> : null} */}

        {displayChatbox ? <NewChatBox displayChatbox={displayChatbox} setDisplayChatbox = {setDisplayChatbox} docName = {docName}></NewChatBox> : null}

      <header className="patient-homepage-header">
        <h1 id="patient-homepage-h1">Welcome , {firstName} {lastName}</h1>
        <div className="patient-homepage-menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav id="patient-homepage-nav">
          <ul>
          
            <li><a href="" onClick={()=>{navigate("/your-appointments")}}>Your Appointments</a></li>
            {/* <li><a href="#patient-homepage-Doctor-details">Doctors</a></li> */}
            <li><a href="#patient-homepage-faq">FAQ'S</a></li>
            <li><a href="#patient-homepage-contact">Contact</a></li>
            <li><a href="#profilepage">Profile</a></li>
            <li><button className="patient-homepage-btn-logout">LogOut</button></li>
          </ul>
        </nav>        
      </header>
      <div className="patient-homepage-container">
        <div id="patient-homepage-quote-container">
          <span id="patient-homepage-quote"></span>
          {/* <span ref={quoteRef}></span> */}
        </div>
        <hr/>
        <div id="SerchandFilter">
          <input type="text" id="searchDoctor" placeholder="Search by Doctor's Name" />
          <select id="filterSpecialization">
            <option value="">Filter by specialization</option>
            <option value="">Select Specialization</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Endocrinology">Endocrinology</option>
            <option value="Gastroenterology">Gastroenterology</option>
            <option value="Hematology">Hematology</option>
            <option value="Nephrology">Nephrology</option>
            <option value="Neurology">Neurology</option>
            <option value="Oncology">Oncology</option>
            <option value="Ophthalmology">Ophthalmology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Otolaryngology">Otolaryngology (ENT)</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Psychiatry">Psychiatry</option>
            <option value="Pulmonology">Pulmonology</option>
            <option value="Rheumatology">Rheumatology</option>
            <option value="Urology">Urology</option>
            <option value="Obstetrics and Gynecology">Obstetrics and Gynecology (OB/GYN)</option>
            <option value="Anesthesiology">Anesthesiology</option>
            <option value="Dentistry">Dentistry</option>
            <option value="Radiology">Radiology</option>

          </select>
        </div>

        <section id="patient-homepage-Doctor-details">
          <h2 id="patient-homepage-h2">Meet Our Doctors</h2>
          <div id="patient-homepage-DoctorDetails">
            {doctors ? doctors.map((obj ,i)=>{

                return(<div key = {i} className="patient-homepage-doctor-profile">
                <div className="patient-homepage-doctor-photo">
                    <img src={obj.profilePicURL} alt="Doctor Photo"/>
                </div>
                <div className="patient-homepage-doctor-info">
                    <h2 id="patient-homepage-h2" >Dr. {obj.name}</h2>
                    <p className="dr-specialization">{obj.specialization}</p>
                    <p>Experience: {obj.experience} years</p>
                    <p>📍 {obj.city}, {obj.state}</p>
                    <button className="patient-homepage-btn-chat" onClick={()=>{setDocName(obj.name) ; setDocEmailId(obj.emailId) ; setDisplayChatbox(!displayChatbox)}}>Chat Privately</button>


                    <button className="patient-homepage-btn-appointment" onClick={()=>{ handleBookAppointment(obj) ;}}>Book an Appointment</button>


                    {/* <Link id="appointment-booking-link" onClick={()=>{setDocName(obj.name) ; setDocEmailId(obj.emailId) }}className="patient-homepage-btn-appointment" to={{ pathname: "/appointment-booking", state: { docName , docEmailId } }}>Book an Appointment</Link> */}
                </div>
            </div>)
            }) : null}
          </div>
        </section>
        <hr/>
        <section id="patient-homepage-faq">
        <h2 id="patient-homepage-h2">Frequently Asked Questions</h2>
        <div className="patient-homepage-accordion">
            <div className="patient-homepage-accordion__item">
                <button className="patient-homepage-accordion__title">
                    Is my personal health information secure?
                </button>

                <div className="patient-homepage-accordion__collapse collapse">
                    <div className="patient-homepage-accordion__text">
                        <p>Yes, we prioritize the security and confidentiality of your health information. Our system complies with industry standards and regulations to ensure your data is protected.</p>
                    </div>
                </div>
            </div>
            <div className="patient-homepage-accordion__item">
                <button className="patient-homepage-accordion__title">
                    How can I update my personal information on IPDMS?
                </button>

                <div className="patient-homepage-accordion__collapse collapse">
                    <div className="patient-homepage-accordion__text">
                        <p>You can update your personal information, including contact details and medical history, by accessing your profile settings. Simply log in to your account and navigate to the profile section to make the necessary changes.</p>
                    </div>
                </div>
            </div>
            <div className="patient-homepage-accordion__item">
                <button className="patient-homepage-accordion__title">
                    How does IPDMS help improve patient care?
                </button>

                <div className="patient-homepage-accordion__collapse collapse">
                    <div className="patient-homepage-accordion__text">
                        <p>IPDMS utilizes advanced technologies such as artificial intelligence and machine learning to analyze patient data, identify patterns, and provide valuable insights to healthcare providers. This helps in making more informed decisions, improving diagnosis accuracy, and optimizing treatment plans for better patient outcomes.</p>
                    </div>
                </div>
            </div>
            <div className="patient-homepage-accordion__item">
                <button className="patient-homepage-accordion__title">
                    Is appointment scheduling convenient with IPDMS?
                </button>

                <div className="patient-homepage-accordion__collapse collapse">
                    <div className="patient-homepage-accordion__text">
                        <p>Yes, IPDMS offers a user-friendly appointment scheduling system that allows patients to book appointments with healthcare providers easily. Patients also receive reminders and notifications about upcoming appointments, ensuring better adherence to scheduled visits.</p>
                    </div>
                </div>
            </div>
            <div className="patient-homepage-accordion__item">
                <button className="patient-homepage-accordion__title">
                    Can I communicate securely with my healthcare provider using IPDMS?
                </button>
                <div className="patient-homepage-accordion__collapse collapse">
                    <div className="patient-homepage-accordion__text">
                        <p>Absolutely! IPDMS provides a secure messaging feature that enables patients to communicate with their healthcare providers for consultations, follow-ups, and inquiries. The messaging platform ensures the confidentiality and privacy of patient-provider communication.</p>
                    </div>
                </div>
            </div>
            <div className="patient-homepage-accordion__item">
                <button className="patient-homepage-accordion__title">
                    Do you provide additional support?
                </button>
                <div className="patient-homepage-accordion__collapse collapse">
                    <div className="patient-homepage-accordion__text">
                        Chat and email support is available 24/7. Phone lines are open during normal working hours.
                    </div>
            </div>
        </div>

          </div>
        </section>
        <section id="patient-homepage-contact">
          <h2 id="patient-homepage-h2">Contact Us</h2>
          <p>If you have any questions or need assistance, please feel free to contact us. 📧 ☎️</p>
          <p>📧 <a href="mailto:info@medtech.com" id="contact-mail">info@medtech.com</a></p>
          <p>☎️ Phone: 123-456-7890</p>
        </section>
      </div>
      <footer id="patient-homepage-footer">
        <p>&copy; 2024 MEDTECH. All rights reserved. 💻</p>
      </footer>
    </>
  );
};

export default PatientDashboard;

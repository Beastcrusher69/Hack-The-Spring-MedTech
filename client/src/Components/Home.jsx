import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Typed from 'typed.js';
import '../CSS/Home.css'; // Import your CSS file

function Home() {

    const [menuActive, setMenuActive] = useState(false);
    useEffect(() => {
        // Initialize Typed.js after component is rendered
        var typed = new Typed('#homepage-quote', {
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

    let navigate = useNavigate() ;
    
    useEffect(() => {
        const handleAccordionClick = () => {
            const accordionBtns = document.querySelectorAll(".homepage-accordion__title");

            accordionBtns.forEach((button) => {
                button.addEventListener("click", () => {
                    const accCollapse = button.nextElementSibling;

                    if (!button.classList.contains("collapsing")) {
                        // open accordion item
                        if (!button.classList.contains("open")) {
                            accCollapse.style.display = "block";
                            const accHeight = accCollapse.clientHeight;

                            setTimeout(() => {
                                accCollapse.style.height = accHeight + "px";
                                accCollapse.style.display = "";
                            }, 1);

                            accCollapse.classList = "homepage-accordion__collapse collapsing";

                            setTimeout(() => {
                                accCollapse.classList = "homepage-accordion__collapse collapse open";
                            }, 300);
                        }
                        // close accordion item
                        else {
                            accCollapse.classList = "homepage-accordion__collapse collapsing";

                            setTimeout(() => {
                                accCollapse.style.height = "0px";
                            }, 1);

                            setTimeout(() => {
                                accCollapse.classList = "homepage-accordion__collapse collapse";
                                accCollapse.style.height = "";
                            }, 300);
                        }

                        button.classList.toggle("open");
                    }
                });
            });
        };

        handleAccordionClick();

        const menuToggle = document.querySelector('.homepage-menu-toggle');
        const navList = document.querySelector('#homepage-nav ul');

        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('show');
            menuToggle.classList.toggle('active');
        });

    }, []);
    
    return (
        <div className="homepage-body">
            <header className="homepage-header">

        <h1 id="homepage-h1">MEDTECH</h1>
        <div className="homepage-menu-toggle" >
            <span></span>
            <span></span>
            <span></span>
        </div>
        <nav id="homepage-nav" >
            <ul>
                <li><a href="#homepage-about">About</a></li>
                <li><a href="#homepage-services">Services</a></li>
                {/* <li><a href="#homepage-DoctorDetails">Doctors</a></li> */}
                <li><a href="#homepage-testimonials">Testimonials</a></li>
                <li><a href="#homepage-faq">FAQ</a></li>
                <li><a href="#homepage-contact">Contact</a></li>
                <li><button className="homepage-btn-login" onClick={()=>{navigate("/login")}}>Login</button></li>
                <li><button className="homepage-btn-signup" onClick={()=>{navigate("/signup")}}>Signup</button></li>
            </ul>
        </nav>
    </header>
    <div className="homepage-container">
        <div id="homepage-quote-container">
            <span id="homepage-quote"></span>
        </div>
        <section id="homepage-about">
            <h2 id="homepage-h2">About Intelligent Patient Data Management System</h2>
            <p>The Intelligent Patient Data Management System (IPDMS) is a cutting-edge platform that integrates advanced technologies to streamline healthcare processes and improve patient care. 🔬</p>
            <p>IPDMS utilizes artificial intelligence and machine learning algorithms to analyze patient data, identify trends, and provide insights for better diagnosis and treatment planning. 📊</p>
        </section>
        <section id="homepage-services">
            <h2 id="homepage-h2">Our Services</h2>
            <div id="homepage-services">
                <div className="homepage-service-block">
                    <h3>Appointment Scheduling</h3>
                    <p>Schedule appointments with ease and receive reminders. 📅</p>
                </div>
                <div className="homepage-service-block">
                    <h3>Medical Records Access</h3>
                    <p>Access your medical records securely from anywhere, anytime. 📋</p>
                </div>
                <div className="homepage-service-block">
                    <h3>Prescription Management</h3>
                    <p>Manage your prescriptions online and receive alerts for refills. 💊</p>
                </div>
                <div className="homepage-service-block">
                    <h3>Secure Messaging</h3>
                    <p>Communicate securely with your healthcare provider for consultations and follow-ups. 🔒</p>
                </div>
                <div className="homepage-service-block">
                    <h3>Billing and Payment</h3>
                    <p>View and manage your medical bills conveniently. 💰</p>
                </div>
                <div className="homepage-service-block">
                    <h3>Health Monitoring</h3>
                    <p>Monitor your health metrics and receive personalized recommendations for a healthier lifestyle. ❤️</p>
                </div>
                <div className="homepage-service-block">
                    <h3>GPT Powered Analysis</h3>
                    <p>Our patient data management system is revolutionizing healthcare with its advanced GPT capabilities. 🤖</p>
                </div>
            </div>
        </section>
        {/* <section id="homepage-DoctorDetails">
            <h2 id="homepage-h2">Meet Our Doctors</h2>
            <div id="homepage-DoctorDetails">
                <div className="homepage-doctor-profile">
                    <div className="homepage-doctor-photo">
                        <img src="doc1.png" alt="Doctor Photo" />
                    </div>
                    <div className="homepage-doctor-info">
                        <h2 id="homepage-h2">Dr. Elala Hobi</h2>
                        <p>Neurosurgeon</p>
                        <p>Experience: 10 years</p>
                        <p>📍 Kalupur</p>
                        <button className="homepage-btn-appointment">Book an Appointment</button>
                    </div>
                </div>
                <div className="homepage-doctor-profile">
                    <div className="homepage-doctor-photo">
                        <img src="doc2.png" alt="Doctor Photo" />
                    </div>
                    <div className="homepage-doctor-info">
                        <h2 id="homepage-h2">Dr. Rikiret Tiwari</h2>
                        <p>Physiotherapist</p>
                        <p>Experience: 2 years</p>
                        <p>📍 Chandkheda</p>
                        <button className="homepage-btn-appointment">Book an Appointment</button>
                    </div>
                </div>
                <div className="homepage-doctor-profile">
                    <div className="homepage-doctor-photo">
                        <img src="doc3.png" alt="Doctor Photo" />
                    </div>
                    <div className="homepage-doctor-info">
                        <h2 id="homepage-h2">Dr. Demo Dulaaa</h2>
                        <p>Cardiologist</p>
                        <p>Experience: 3 years</p>
                        <p>📍 Shahibaugh</p>
                        <button className="homepage-btn-appointment">Book an Appointment</button>
                    </div>
                </div>
                <div className="homepage-doctor-profile">
                    <div className="homepage-doctor-photo">
                        <img src="doc4.png" alt="Doctor Photo" />
                    </div>
                    <div className="homepage-doctor-info">
                        <h2 id="homepage-h2">Dr. Dada Patel</h2>
                        <p>Gastroenterologist</p>
                        <p>Experience: 37 years</p>
                        <p>📍 Kanbha, Ahmedabad</p>
                        <button className="homepage-btn-appointment">Book an Appointment</button>
                    </div>
                </div>
            </div>
        </section> */}
        <section id="homepage-testimonials">
            <h2 id="homepage-h2">Testimonials</h2>
            <div id="homepage-testimonials-container">
                <div className="homepage-testimonial">
                    <p><strong>Dr. Smith:</strong><br/><br/>"Using MEDTECH has greatly improved the efficiency of our healthcare practice. The system is user-friendly and has helped us provide better care to our patients."</p>
                </div>
                <div className="homepage-testimonial">
                    <p><strong>Sarah R.:</strong><br/><br/>"As a patient, I appreciate the convenience of accessing my medical records and scheduling appointments online. MEDTECH has made managing my healthcare much easier."</p>
                </div>
                <div className="homepage-testimonial">
                    <p><strong>Sarah R.:</strong><br/><br/>"As a patient, I appreciate the convenience of accessing my medical records and scheduling appointments online. MEDTECH has made managing my healthcare much easier."</p>
                </div>
                <div className="homepage-testimonial">
                    <p><strong>Sarah R.:</strong><br/><br/>"As a patient, I appreciate the convenience of accessing my medical records and scheduling appointments online. MEDTECH has made managing my healthcare much easier."</p>
                </div>
            </div>
        </section>
        <section id="homepage-faq">
            <h2 id="homepage-h2">Frequently Asked Questions</h2>
            <div className="homepage-accordion">
                <div className="homepage-accordion__item">
                    <button className="homepage-accordion__title">
                        Is my personal health information secure?
                    </button>
                    <div className="homepage-accordion__collapse collapse">
                        <div className="homepage-accordion__text">
                            <p> Yes, we prioritize the security and confidentiality of your health information. Our system complies with industry standards and regulations to ensure your data is protected.</p>
                        </div>
                    </div>
                </div>
                <div className="homepage-accordion__item">
                    <button className="homepage-accordion__title">
                        How does IPDMS help improve patient care?
                    </button>
                    <div className="homepage-accordion__collapse collapse">
                        <div className="homepage-accordion__text">
                            <p>IPDMS utilizes advanced technologies such as artificial intelligence and machine learning to analyze patient data, identify patterns, and provide valuable insights to healthcare providers. This helps in making more informed decisions, improving diagnosis accuracy, and optimizing treatment plans for better patient outcomes.</p>
                        </div>
                    </div>
                </div>
                <div className="homepage-accordion__item">
                    <button className="homepage-accordion__title">
                        Is appointment scheduling convenient with IPDMS?
                    </button>
                    <div className="homepage-accordion__collapse collapse">
                        <div className="homepage-accordion__text">
                            <p>Yes, IPDMS offers a user-friendly appointment scheduling system that allows patients to book appointments with healthcare providers easily. Patients also receive reminders and notifications about upcoming appointments, ensuring better adherence to scheduled visits.</p>
                        </div>
                    </div>
                </div>
                <div className="homepage-accordion__item">
                    <button className="homepage-accordion__title">
                        Can I communicate securely with my healthcare provider using IPDMS?
                    </button>
                    <div className="homepage-accordion__collapse collapse">
                        <div className="homepage-accordion__text">
                            <p>Absolutely! IPDMS provides a secure messaging feature that enables patients to communicate with their healthcare providers for consultations, follow-ups, and inquiries. The messaging platform ensures the confidentiality and privacy of patient-provider communication.</p>
                        </div>
                    </div>
                </div>
                <div className="homepage-accordion__item">
                    <button className="homepage-accordion__title">
                        Do you provide additional support?
                    </button>
                    <div className="homepage-accordion__collapse collapse">
                        <div className="homepage-accordion__text">
                            Chat and email support is available 24/7. Phone lines are open
                            during normal working hours.
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="homepage-contact">
            <h2 id="homepage-h2">Contact Us</h2>
            <p>If you have any questions or need assistance, please feel free to contact us. 📧 ☎️</p>
            <p>📧 <a href="mailto:info@medtech.com" id="contact-mail">info@medtech.com</a></p>
            <p>☎️ Phone: 123-456-7890</p>
        </section>
    </div>
    <footer id="homepage-footer">
        <p>&copy; 2024 MEDTECH. All rights reserved. 💻</p>
    </footer>

        </div>
    );
}

export default Home;

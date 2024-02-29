import { useEffect, useState } from "react"
import axios from 'axios';
import {be_url} from "/config"
import {useNavigate} from "react-router-dom";
import "../CSS/Chatbox.css";
import {IoClose} from "react-icons/io5"

function Chatbox({ displayChatbox , setDisplayChatbox }){

    return(
        <div id="chatbox" >

            <section className="msger">

          <header className="msger-header">
          <div className="msger-header-title">
            <i className="fas fa-comment-alt"></i> medicalchat
          </div>
          {/* <div className="msger-header-options">
            <span><i className="fas fa-cog"></i></span>
          </div> */}
          <IoClose className="close-btn" onClick={()=>{ setDisplayChatbox(!displayChatbox) }}></IoClose>
        </header>
      
        <main className="msger-chat">
          <div className="msg left-msg">
            <div
             className="msg-img"
            //  style="background-image: url(user2.png)"
            ></div>
      
            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">BOT</div>
                <div className="msg-info-time">12:45</div>
              </div>
      
              <div className="msg-text">
                Hello, doctor smith i am there. 
              </div>
            </div>
          </div>
      
          <div className="msg right-msg">
            <div
             className="msg-img"
            //  style="background-image: url(user.jpg)"
            ></div>
      
            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">Dr.smith</div>
                <div className="msg-info-time">12:46</div>
              </div>
      
              <div className="msg-text">
                You can change your name in JS section!
              </div>
            </div>
          </div>
        </main>
      
        <form className="msger-inputarea">
          <input type="text" className="msger-input" placeholder="Enter your message..."/>
          <button type="submit" className="msger-send-btn">Send</button>
        </form>

        </section>

        </div>
    )

}

export default Chatbox
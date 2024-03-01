import React from 'react';
import { useEffect, useState } from "react"
import '../CSS/NewChatBox.css'; // Import your CSS file
import {IoClose} from "react-icons/io5"

function NewChatBox({ displayChatbox , setDisplayChatbox , docName , docEmailId}) {

    function appendMessage(sender, message) {
        const chatBox = document.getElementById('chat-box');
        const newMessage = document.createElement('div');
        newMessage.classList.add('Gpt-ans');
        newMessage.innerHTML = `<p><b>${sender}:</b>  ${message}</p>`;
        
        if (sender === docName) {
            newMessage.className = 'chat-message chat-message--Bot';
        } else {
            newMessage.className = 'chat-message chat-message--User';
        }
        
        chatBox.appendChild(newMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    
    function sendMessage() {
        const userMessage = document.getElementById('user-input').value;
        appendMessage('You', userMessage);
    
        // Send the user message to the backend
        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({message: userMessage })
        })
        .then(r => r.json())
        .then(r => {
            appendMessage(docName, r.answer);
        })
        .catch(error => {
            console.error('Error:', error);
            appendMessage(docName, 'Apologies, something went wrong. Please try again.');
        });
        document.getElementById('user-input').value = ''; //clear input
    }
    
    // Select the input field

    useEffect(()=>{

        const userInput = document.getElementById('user-input');
        
        // Add event listener for key press
        userInput.addEventListener('keypress', handleKeyPress);

    })
    
    function handleKeyPress(event) {
        if (event.keyCode === 13) {
            event.preventDefault(); // Prevents the default Enter key behavior (e.g., new line)
            sendMessage();
        }
    }

    return (

        <div id="chatbox">
        <div className="chat-container">
            <header id="chat-page-header">
                <h2 className="chat-page-welcome">{docName}</h2>
                <IoClose className="close-btn" onClick={()=>{ setDisplayChatbox(!displayChatbox) }}></IoClose>
            </header>
            
            <div className="chat-box" id="chat-box">
                <div className="chat-message chat-message--Bot">
                    <p><b>{docName}:</b> Welcome! How can I assist you today?</p>
                </div>
            </div>
            
            <div className="chat-input">
                <input type="text" id="user-input" placeholder="Type your Query..." />
                <button id="send-button" onClick={sendMessage}>Send</button>
            </div>
        </div>
        </div>
    );
}

function sendMessage() {
    // Add your sendMessage functionality here
}

export default NewChatBox;

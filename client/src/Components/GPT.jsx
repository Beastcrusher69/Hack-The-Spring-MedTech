import React, { useEffect, useState, useRef } from 'react';
import '../CSS/GPT.css'; 
import {IoClose} from "react-icons/io5"
import { be_url } from '/config';


function GPT({displayChatbox , setDisplayChatbox}) {
    let docName = 'Consult GPT ! '
    const [messages, setMessages] = useState([
        { sender: docName, message: 'Welcome! How can I assist you today?' }
    ]);

    const chatBoxRef = useRef(null);
    async function sendMessageToGPT(message) {
        try {
            const response = await fetch(be_url + '/getResponse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            });
            const data = await response.json();
            console.log("data:" ,data) ;

            if(data.code == 1){
                appendMessage(docName, 'Apologies, something went wrong. Please try again.');
                console.log("Gemini Error: " , data.err)
            }
            else{
                appendMessage(docName, data.response);
            }
        } catch (error) {
            console.error('Internal Server Error:', error);
            appendMessage(docName, 'Apologies, something went wrong. Please try again.');
        }
    }

    function appendMessage(sender, message) {
        setMessages(prevMessages => [...prevMessages, { sender, message }]);
    }

    function handleMessageSend() {
        const userMessage = document.getElementById('user-input').value;
        appendMessage('You ', userMessage);
        sendMessageToGPT(userMessage);
        document.getElementById('user-input').value = ''; // Clear input
    }

    useEffect(() => {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }, [messages]);

    useEffect(() => {
        const userInput = document.getElementById('user-input');
        userInput.addEventListener('keypress', handleKeyPress);
        return () => userInput.removeEventListener('keypress', handleKeyPress);
    }, []);

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleMessageSend();
        }
    }

    return (
        <div id="chatbox">
            <div className="chat-container">
                <header id="chat-page-header">
                    <h2 className="chat-page-welcome">Consult GPT!</h2>
                <IoClose className="close-btn" onClick={()=>{ setDisplayChatbox(!displayChatbox) }}></IoClose>

                </header>

                <div className="chat-box" id="chat-box" ref={chatBoxRef}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.sender === docName ? 'chat-message--Bot' : 'chat-message--User'}`}>
                            <p><b>{msg.sender}:</b> {msg.message}</p>
                        </div>
                    ))}
                </div>

                <div className="chat-input">
                    <input type="text" id="user-input" placeholder="Type your Query..." />
                    <button id="send-button" onClick={handleMessageSend}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default GPT;

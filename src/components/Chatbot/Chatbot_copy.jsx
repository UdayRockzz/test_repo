import React, { useState } from "react";


import styles from "./Chatbot.module.css";

export const Chatbot = () => {

    const [messageInput, setMessageInput ] = useState('');
    const [messages, setMessages] = useState([
        {
                role: 'assistant',
                content: 'How can I help you learn more about Uday Kumar  and his Resume?'
        }

    ])

    const submitForm = async (e) => {
        e.preventDefault();
        let newMessages = [...messages, { role: 'user', content: messageInput }]
        setMessages(newMessages);
        setMessageInput('');
        const apiMessage = await fetch(
            '/api',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ messages: newMessages })
            }
          ).then(res => res.json());
          setMessages([...newMessages, { role: 'assistant', content: apiMessage.message }]);
        }

    return (
        <section className = {styles.container}>
            <h2> 
                 CHATBOT
            </h2>
            <div className={styles.blue}> 
                <div className = {styles.info}>
                    <h3>Azure AI Chatbot</h3>
                    <p>I've put together a chatbot here which knows all my skills, work experience and has a copy of my CV/Resume. You can use it to ask questions about me to get a better idea of who I am and what I've done.</p>
                    <p>You can also download my resume here if you want to take a look at it.  I'm currently looking for new opportunities so if you have a project you think I'd be a good fit for, please get in touch!</p>
                
                    
                     <a href="#" className={styles.contactBtn}>
                        Download Resume
                     </a>
                    
                    
                    
                </div>
                <div className={styles.box}>
                    <div className={styles.area}>
                        <ul id = {styles.log}>
                            {messages.map((message, index) => (
                                <li key={index} className={`${message.role}`}>
                                    <span className={`avatar`}>{message.role === 'user' ? 'You' : 'AI'}</span>
                                    <div className="message">{message.content}</div>
                                </li>
                            ))}
                            <li>
                                <span className={styles.bot}>AI</span>
                                <div className={styles.message}>
                                Hi, I'm a friendly chatbot that lets you interactive with this portfolio and CV. How can I help?
                                </div>
                            </li>
                            <li>
								<span className={styles.user}>User</span>
								<div className={styles.message}>
									I have a question to ask you about this resume
								</div>
							</li>
                        </ul>
                    </div>
                    <form onSubmit={submitForm} className={styles.chatmsg}>
                        <input type="text" placeholder="Hey Uday, what skills are you best at?" value={messageInput} onChange={ e => setMessageInput(e.target.value)}/>
                        <button className={styles.btn}> Send </button>

                    </form>


                </div>
            </div>


        </section>


    )
};
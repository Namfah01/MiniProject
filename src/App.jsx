import React, { useState } from 'react';
import axios from "axios";
import { IoMdFlower } from "react-icons/io";
import "./index.css"



function App() {
  const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

  const animationDot = (
    <div className="flex items-center space-x-2 self-start p-2 my-2 rounded-lg ">
      <span className="typing-dots"></span>
      <span className="typing-dots"></span>
      <span className="typing-dots"></span>
    </div>
  );

  async function handleSendMessage() {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);
    setInput('');

    setMessages((prevMessages) => [...prevMessages, { sender: 'ai', text: "typing" }]);

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAjFFE0Y39dBXSeNDAOY5I2uyYaAFLn0qs",
        { "contents": [{ "parts": [{ "text": `${input}` }]}]}
      );
      const aiMessage = { sender: 'ai', text: response.data.candidates[0].content.parts[0].text };
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        aiMessage
      ]);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { sender: 'ai', text: "Failed to generate answer. Please try again later." }
      ]);
    }
  }

  return (
    <>
      <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 pt-10 text-center">
        <div className="text-4xl font-extrabold text-white">
          <h1 className="inline-block p-2  text-4xl font-extrabold text-White text-shadow">Dasiy AI</h1>
          <IoMdFlower className="text-yellow-200 animate-bounce inline-block mb-1" style={{ fontSize: '3 rem' }} />
        </div>
      </div>
      <div className="flex flex-col items-center bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 p-4 min-h-screen pt-10">
        <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-4 overflow-y-auto mb-4 pt-10 border" style={{ height: '60vh' }}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 my-2 rounded-lg shadow border ${message.sender === 'user' ? 'bg-gradient-to-r from-green-300 via-yellow-200 to-orange-300 flex justify-end' : 'bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300  flex justifly-start'}`}
            >
              {message.sender === 'ai' && message.text === "typing" ? animationDot : message.text}
            </div>
          ))}
        </div>
        <textarea
          className="p-4 text-lg  border border rounded-lg shadow-lg w-full max-w-2xl h-24 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-500 ease-in-out transform hover:scale-105 mb-4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder ="Type your message..."
        ></textarea>
        <button
          onClick={handleSendMessage}
          className="btn-2xl  bg-yellow-400 text-white rounded-md p-4 text-lg shadow-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-500 ease-in-out transform hover:scale-105"
        >
          Send
        </button>
      </div>
    </>
  );
}

export default App;



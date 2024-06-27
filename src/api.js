// function A () {
//   const [response, setResponse] = useState('');

  async function generateAnswer() {
    const apiKey = process.env.REACT_APP_API_KEY;
  const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}",
      method: "post",
      data:
        {"contents":[{"parts":[{"text":"Explain how AI works"}]}]},
  })
    console.log(response)

  }

  return (
    <div className="App">
      <h1>Chat AI</h1>
      <button onClick={generateAnswer}>Generate Answer</button>
      <p>Response: {response}</p>
    </div>
  );
}

// import React, { useState } from 'react';
// import './App.css';
// import axios from 'axios';

// function App() {
//   const [response, setResponse] = useState('');

//   async function generateAnswer() {
//     try {
//       const apiKey = process.env.REACT_APP_API_KEY;
//       const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

//       const requestBody = {
//         contents: [
//           {
//             parts: [
//               {
//                 text: "Explain how AI works"
//               }
//             ]
//           }
//         ]
//       };

//       const response = await axios.post(apiUrl, requestBody);
//       setResponse(response.data); // Assuming the response.data is the actual generated content
//       console.log(response.data); // Logging the response data for verification
//     } catch (error) {
//       console.error('Error generating answer:', error);
//     }
//   }

//   return (
//     <div className="App">
//       <h1>Chat AI</h1>
//       <button onClick={generateAnswer}>Generate Answer</button>
//       <p>Response: {response}</p>
//     </div>
//   );
// }

// export default App;

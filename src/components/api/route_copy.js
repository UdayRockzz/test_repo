import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

import React, { useState } from 'react';
import { OpenAIClient, AzureKeyCredential } from '@azure/openai';

const endpoint = process.env.REACT_APP_AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.REACT_APP_AZURE_OPENAI_API_KEY;
const model = process.env.REACT_APP_AZURE_OPENAI_MODEL;

const App = () => {
    const [messages, setMessages] = useState([]);
    const [response, setResponse] = useState('');
  
    const handleInputChange = (e) => {
      setMessages([{ role: 'user', content: e.target.value }]);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));
  
      const fullMessages = [
        {
          role: 'system',
          content: `You are PortfolioUday, answering only questions based on the resume provided.\nResume:\n${DATA_RESUME}\n\nHelp users learn more about Adrian from his resume.`,
        },
        ...messages,
      ];
  
      try {
        const response = await client.getChatCompletions(model, fullMessages, {
          maxTokens: 128,
        });
  
        setResponse(response.choices[0].message.content);
      } catch (error) {
        console.error('Error:', error);
        setResponse('An error occurred while fetching the response.');
      }
    };
  
    return (
      <div className="App">
        <h1>Ask PortfolioGPT</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Ask a question..."
            onChange={handleInputChange}
            rows="4"
            cols="50"
          />
          <button type="submit">Submit</button>
        </form>
        {response && (
          <div>
            <h2>Response:</h2>
            <p>{response}</p>
          </div>
        )}
      </div>
    );
  };
  
  export default App;
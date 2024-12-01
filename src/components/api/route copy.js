import React, { useState } from 'react';
import { OpenAIClient, AzureKeyCredential } from '@azure/openai';

const endpoint = process.env.REACT_APP_AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.REACT_APP_AZURE_OPENAI_API_KEY;
const model = process.env.REACT_APP_AZURE_OPENAI_MODEL;

const App = () => {
  const [response, setResponse] = useState('');

  const getChatCompletions = async () => {
    const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));

   // const messages = [
     // {
      //  role: 'system',
      //  content: 'you are a helpful assistant.'
    //  },
    //  {
     //   role: 'user',
     //   content: 'Why is JavaScript better than Python?'
     // }
    //];

    try {
      const nextResponse = await client.getChatCompletions(model, messages, {
        maxTokens: 128,
      });

      setResponse(nextResponse.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching chat completions:", error);
      setResponse('An error occurred while fetching the response.');
    }
  };

  return (
    <div>
      <button onClick={getChatCompletions}>Get Response</button>
      <p>{response}</p>
    </div>
  );
};

export default App;

// server.js (Express.js backend)
const express = require('express');
const { OpenAIClient, AzureKeyCredential } = require('@azure/openai');
require('dotenv').config(); // To load environment variables from .env

const app = express();
app.use(express.json());

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const model = process.env.AZURE_OPENAI_MODEL;

const DATA_RESUME = `Adrian Twarog
Address: 1 Suburb, Street, State, 6000, Australia
Phone: +610000000
Email: not-real@adriantwarog.com
Education
...
`;

// POST route for chat completions
app.post('/api/chat', async (req, res) => {
    const { messages } = req.body;

    const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));

    // Insert the system prompt at the beginning of messages array
    messages.unshift({
        role: 'system',
        content: `You are PortfolioGPT, answering only questions based on the resume provided.
Resume:
${DATA_RESUME}
Help users learn more about Adrian from his resume.`
    });

    try {
        const response = await client.getChatCompletions(model, messages, {
            maxTokens: 128,
        });

        // Send the OpenAI response back to the client
        res.json({ 
            message: response.choices[0].message.content 
        });
    } catch (error) {
        console.error('Error with OpenAI:', error);
        res.status(500).json({ error: 'Error generating response' });
    }
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

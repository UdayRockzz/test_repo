const express = require('express');
const cors = require('cors');
const { OpenAIClient, AzureKeyCredential } = require('@azure/openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const model = process.env.AZURE_OPENAI_MODEL;

const DATA_RESUME = `Uday Kumar Surepally
Address:	Im Drewer Esch 27, 33613, Bielefeld, Germany
Phone:		+4917643854328
Email:		Uday038@gmail.com
Education
Masters in Embedded Systems					[2017 - 2024]
Embedded Systems
Chemnitz University of Technology
Bachloers of Technology				                 [2012 – 2015]
Electronics and Communication Engineering
Jawaharlal Nehru Technological University Hyderabad 
Diploma in Technical Education 				[2009 – 2012]
Electronics and Communication Engineering 
TRR College of Technology
Skills and Competences
Full Stack Website Developer 
Front End: 	HTML, CSS, JavaScript, SASS, SCSS, LESS, SEO React, Angular, Knockout, jQuery Bootstrap, REST, GraphQL, AJAX/API, Responsive Design, WC3 
Back End: 	NodeJS, PHP MySQL, MongoDB, SQL, noSQL Apache, Express, IIS, Webhooks 
Platforms:	Amazon AWS, Linux, Windows, Raspberry Pi OS
Frameworks:	ROS, ROS2, WordPress, Github `;

app.post('/api/chat', async (req, res) => {
    const { messages } = req.body;

    const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));

    messages.unshift({
        role: 'system',
        content: `You are PortfolioGPT, answering only questions based on the resume provided.
Resume:
${DATA_RESUME}

Help users learn more about Uday Kumar from his resume.`
    });

    try {
        const response = await client.getChatCompletions(model, messages, {
            maxTokens: 128,
        });

        res.json({
            message: response.choices[0].message.content
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching chat completions' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

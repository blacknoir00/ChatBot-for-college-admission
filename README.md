# ChatBot-for-college-admission
Simple ExpressJS project "ChatBot for college admission" using MongoDB, adding FAQs to the database collection, and creating a front-end using HTML.

Step 1: Set Up the Project
1. Create a new directory for your project and navigate into it.
2. Initialize a new Node.js project by running the following command:
csharp
npm init -y
Install ExpressJS and MongoDB packages by running the following command:
npm install express mongodb

1. Create a new file called server.js and open it in your preferred code editor.

Step 2: Set Up the ExpressJS Server
1. In the server.js file, require the necessary modules and set up the ExpressJS server.
   
Add the following code:
javascript
const express = require('express');
const app = express();
const port = 3000;
// Configure the server to parse JSON requests
app.use(express.json());
// Start the server
app.listen(port, () => {
console.log(`Server running on port ${port}`);
});

Step 3: Set Up the MongoDB Connection
1. In the server.js file, import the MongoDB module and set up the connection to the
database. Add the following code:
javascript
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
// Connect to the MongoDB database
client.connect(err => {
if (err) {
console.error('Failed to connect to the database:', err);
return;
}
console.log('Connected to the database');
});

Step 4: Create the FAQs Collection and Add FAQs
1. In the server.js file, create the FAQs collection and add 10 FAQs to it. Add the
following code:
javascript
// Add FAQs to the collection
const faqs = client.db('college').collection('faqs');
faqs.insertMany([
{ question: 'What are the admission requirements?', answer: 'Lorem
ipsum dolor sit amet.' },
// Add more FAQs here
], (err, result) => {
if (err) {
console.error('Failed to insert FAQs:', err);
return;
}
console.log('Added FAQs to the collection');
});

Step 5: Create the Front-End using HTML
1. In your project directory, create a new directory called public to store static files.
2. Inside the public directory, create an index.html file and open it in your preferred
code editor.
3. Write the HTML structure for your front-end, including an input field for the user's
question and a container to display the chatbot responses. Here's a basic example:
html
<!DOCTYPE html>
<html>
<head>
<title>ChatBot for College Admission</title>
</head>
<body>
<h1>ChatBot for College Admission</h1>
<div id="chat-container"></div>
<input type="text" id="user-input" placeholder="Type your
question..." />
<button id="submit-btn">Submit</button>
<script src="script.js"></script>
</body>
</html>

Step 6: Create the Front-End JavaScript (script.js)
1. In the public directory, create a new file called script.js and open it in your
preferred code editor.
2. Add JavaScript code to handle user input and fetch responses from the server. Here's a
basic example:
javascript
document.getElementById('submit-btn').addEventListener('click', () =>
{
const userInput = document.getElementById('user-input').value;
fetch('/api/chat', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ question: userInput })
})
.then(response => response.json())
.then(data => {
displayResponse(data.answer);
})
.catch(err => {
console.error('Error:', err);
});
});
function displayResponse(response) {
const chatContainer = document.getElementById('chat-container');
const responseElement = document.createElement('div');
responseElement.textContent = response;
chatContainer.appendChild(responseElement);
}

Step 7: Set Up ExpressJS Routes
1. In the server.js file, add the necessary ExpressJS routes to handle chatbot requests.
Add the following code:
javascript
// Handle POST requests to /api/chat
app.post('/api/chat', (req, res) => {
const userQuestion = req.body.question;
// Query the FAQs collection for a matching question
faqs.findOne({ question: userQuestion }, (err, result) => {
if (err) {
console.error('Error querying FAQs collection:', err);
res.status(500).json({ error: 'An error occurred' });
return;
}
if (result) {
res.json({ answer: result.answer });
} else {
res.json({ answer: 'I'm sorry, I don't have an answer to that
question.' });
}
});
});
// Serve the static HTML and JavaScript files
app.use(express.static('public'));

Step 8: Run the Application
1. In your terminal, navigate to your project directory.
2. Start the ExpressJS server by running the following command:
node server.js
1.
2. Open your web browser and visit http://localhost:3000 to see the chatbot
interface.

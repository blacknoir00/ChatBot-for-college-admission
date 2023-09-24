const express = require('express');
const app = express();
const port = 3000;
// Configure the server to parse JSON requests
app.use(express.json());
// Start the server
app.listen(port, () => {
console.log(`Server running on port ${port}`);
});

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

const faqs = client.db('college').collection('faqs');
faqs.insertMany([
{ question: 'What are the admission requirements?', answer: 'Loremipsum dolor sit amet.' },
// Add more FAQs here
], (err, result) => {
if (err) {
console.error('Failed to insert FAQs:', err);
return;
}
console.log('Added FAQs to the collection');
});

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
    res.json({ answer: "I am sorry, I don't have an answer to that question." });
    }
    });
    });
    // Serve the static HTML and JavaScript files
    app.use(express.static('public'));
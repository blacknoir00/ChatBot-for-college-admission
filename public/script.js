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
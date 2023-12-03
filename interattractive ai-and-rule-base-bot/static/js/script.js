// Initialize chat history array
let chatHistory = [];

// Function to append messages to the chat box
function appendMessage(content, author) {
  const chatBox = document.getElementById('chat-box');
  const messageElement = document.createElement('div');
  messageElement.classList.add(author === 'user' ? 'user-message' : 'bot-message');

  // Check if the content contains HTML tags
  const containsHTMLTags = /<[a-z][\s\S]*>/i.test(content);

  // Set innerHTML if content contains HTML tags, else use innerText
  if (containsHTMLTags) {
    messageElement.innerHTML = content;
  } else {
    messageElement.innerText = content;
  }

  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to send user message to Flask server
function sendMessage(message) {
  appendMessage(message, 'user');
  chatHistory.push({ role: 'user', content: message });

  fetch('/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: message,
      chat_log: chatHistory.map(entry => entry.content).join('\n'),
    }),
  })
  .then(response => response.json())
  .then(data => {
    const botResponse = data.bot_response;
    chatHistory.push({ role: 'bot', content: botResponse });
    appendMessage(botResponse, 'bot');
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

// Function to handle sending messages when the "Send" button is clicked
function handleSendMessage() {
  const userInput = document.getElementById('user-input');
  const userMessage = userInput.value.trim();
  if (userMessage) {
    sendMessage(userMessage);
    userInput.value = '';
  }
}

// Add a click event listener to the "Send" button
const sendButton = document.getElementById('send-button');
sendButton.addEventListener('click', handleSendMessage);

// Event listener for user input (Enter key)
const userInput = document.getElementById('user-input');
userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleSendMessage();
  }
});


var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
}
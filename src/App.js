import './App.css';
import React, {useState, useEffect} from 'react';

const { io } = require("socket.io-client");

let socket = null;
const messageList = [];
function App() {

  const [count, setCount] = useState(0); 

    console.log('rendering...');
  // after component mount...
  useEffect(() => {




for (var i = 0; i < messageList.length; i++) {
  console.log(messageList[i]);
  var list = document.createElement('li');
  list.setAttribute("id", "myList");
  var item = document.createElement('li');
  item.appendChild(document.createTextNode(messageList[i].body));
  list.appendChild(item);
  document.body.appendChild(list);


}



  console.log('component mounted');
    // connect to the server
    // http://localhost:4000
   
    socket = io('https://malath.onrender.com/', {
      extraHeaders: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTcsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY4MTU2ODYwNX0.FFQlUYaS-CLcfzy3wyrWdVzShty_2SI3fj2hubN7Wao`
        
        
      },
      withCredentials: true,
      });

      socket.on('connect', function() {
        console.log('connected to server');
        
      }
      );
 

    // when connected, look for when the server emits the updated count
    socket.on('getMessageList', function(message) {
      console.log('received updated count from server: ' + message);

console.log('json'+ JSON.stringify(message));
const obj = JSON.parse(JSON.stringify(message));


// create list with the messages
var list = document.createElement('ul');
list.setAttribute("id", "myList");

for (var i = 0; i < obj.length; i++) {
  console.log(obj[i]);

  var item = document.createElement('li');
  item.appendChild(document.createTextNode(obj[i].full_name));
  var lastMessage = document.createElement('p');
  lastMessage.textContent = obj[i].lastMessage.text;
  
  list.appendChild(item);
  item.appendChild(lastMessage);
  var br = document.createElement("br");
  item.appendChild(br);
  var buttin = document.createElement("button");
  buttin.textContent = "get Message";
  item.appendChild(buttin);
  buttin.addEventListener ("click", function() {
   
    socket.emit('openConversation' , {"conversationid" : 58});



  });

  
}
document.body.appendChild(list);


      // set the new count on the client
    
    })

socket.on('getConversationMessages', function(message) {
  console.log('received updated count from server: ' + message);
  const obj = JSON.parse(JSON.stringify(message));
  messageList.push(obj);
console.log(obj);


})
socket.on('newMessage', function(message) {
  console.log('received new message: ' + message);
  const obj = JSON.parse(JSON.stringify(message));
  messageList.push(obj);
console.log(obj);
});



   
    
  }, []);
  return (
    <div>


    <button onClick={handleClick}>Request Messages of Technical support: {count}</button><br/>
    <h1>get Message With naeem</h1>
    <button onClick={handleClick2}>get Message With naeem {count}</button>
    </div>
  );
}

function handleClick() {
  // we emit this event that increments the count on the server
  // and the updated count is emitted back via 'counter updated'
  socket.emit('requestMessageList' , {"type" : 2 , key : ""});
}
function handleClick2() {
  // we emit this event that increments the count on the server
  // and the updated count is emitted back via 'counter updated'
  socket.emit('requestMessageList' , {"type" : 2 , key : ""});
}

export default App;

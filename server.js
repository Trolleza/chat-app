const app = require("./app");
const socket = require('socket.io');
const cors = require('cors'); 

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

// use io to listen for all incoming messages
io.on('connection', (socket) => {
  console.log('new connaction was made');
  console.log('socket id: ', socket.id); // object of socket connection made new on each connection
  
  // 'new message' is the name of what is emitted in frontend App.js
  socket.on('new-message', data => {
    console.log(data.message);

    io.emit('message', data)

  })

  socket.on('disconnect', () => {
    console.log('disconnected');
    // this is where we would remove a user from a room
  })
})
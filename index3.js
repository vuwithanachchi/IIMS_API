// const express = require('express')
// var mongoose = require('mongoose');
// const app = express();
// var  socket = require('socket.io');
// var cors = require('cors');
// const port = 3000

// app.use(cors())
// const bodyPaser = require('body-parser')
// app.use(bodyPaser.json())
// app.use(express.urlencoded({ extended: true }))


// mongoose.connect("mongodb://localhost:27017/iimsdb", { 
//     useNewUrlParser: true ,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify:false}).then(() => {
//       console.log("DB Connetion Successfull");
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });

//     const user = require('./routes/users-route')
//     const component = require('./routes/components-route')

//     app.use('/user', user)
//     app.use('/component', component)

    
    
//    var server = app.listen(port, () => {
//     console.log(`iims Server Started..`)
//   })

//   var io = socket(server, {
//         cors: {
//           origin: "*",
//           credentials: true,
//         },
//       });

//   io.on('connection', (socket) => {  
//     console.log('a user connected'); 
//     socket.on('message', (msg) => {
//       console.log(msg);
//       socket.broadcast.emit('message-broadcast', msg);
//      });
//  });

//  module.exports = app;
// //  reload(server, app);


// //   const io = socket(server, {
// //     cors: {
// //       origin: "*",
// //       credentials: true,
// //     },
// //   });

// //   global.onlineUsers = new Map();
// //   io.on("connection", (socket) => { 
// //   global.chatSocket = socket;
// //   socket.on("add-user", (userid) => {
// //     onlineUsers.set(userid, socket.id);
// //   });

// //   socket.on("send-msg", (data) => {
// //     const sendUserSocket = onlineUsers.get(data.to);
// //     if (sendUserSocket) {
// //       socket.to(sendUserSocket).emit("msg-recieve", data.msg);
// //     }
// //   });
// // });
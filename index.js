const mongoose = require("mongoose");
var  socket = require('socket.io');
const app = require("./server");
const port = 3000

mongoose.connect("mongodb://localhost:27017/iimsdb", { 
    useNewUrlParser: true ,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false
  }).then(() => {
      console.log("DB Connetion Successfull");
    })
    .catch((err) => {
      console.log(err.message);
    });


    var server = app.listen(port, () => {
        console.log(`iims Server Started..`)
      })
    
      var io = socket(server, {
            cors: {
              origin: "*",
              credentials: true,
            },
          });
    
      io.on('connection', (socket) => {  
        console.log('a user connected'); 
        socket.on('message', (msg) => {
          console.log(msg);
          socket.broadcast.emit('message-broadcast', msg);
         });
     });

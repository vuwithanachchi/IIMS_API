const mongoose = require("mongoose");
var  socket = require('socket.io');
const app = require("./server");
const port = 3000

mongoose.connect("mongodb+srv://vihangiwithanachchi:plImP6NSM9se7VUU@iimsdb.xcmltb8.mongodb.net/iims-db", { 
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
    
    app.get('/', (req, res) => {
  res.send('<h1>Express Demo App</h1> <h4>Message: Success</h4> <p>Version 1.1</p>');
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

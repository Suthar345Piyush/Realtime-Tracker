const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");



const app = express();

const server = http.createServer(app);

const io = socketio(server);

app.set("view engine" , "ejs");
app.use(express.static(path.resolve("./public")));
app.set("views" , path.resolve(__dirname, "./views"));

// connection of  websocket 
io.on("connection"  , function (socket) {
  socket.on("send-location" , function(data){
    io.emit("receive-location" , {id: socket.id , ...data});
  });


  socket.on("disconnect" , function(){
    io.emit("user-disconnect" , socket.id);
  });
});

app.get("/" , function(req , res)  {
   res.render("index")
});

server.listen(3000);


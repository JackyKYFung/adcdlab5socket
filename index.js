const port = process.env.PORT || 10000;
const server = require("http").Server();

var io = require("socket.io")(server);

var allusers = [];

io.on("connection", function(socket){
    console.log(socket.id);
    allusers.push(socket.id);
    console.log(allusers);
    
    socket.emit("yourid", socket.id);
    
    io.emit("userjoined", allusers)
    
    socket.on("mymove", function(data){
       socket.broadcast.emit("newmove", data); 
    });
    
    
    socket.on("disconnect", function(){
        var index = allusers.indexOf(socket.id);
        
        allusers.splice(index, 1);
        
        io.emit("userjoined", allusers);
    })
    
});

server.listen(port, (err)=>{
    if(err){
        console.log(err);
        return false;
    }
    
    console.log("port up and moody");
})
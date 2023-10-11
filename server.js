const fs = require("fs");
const http = require("http");
const socketio = require("socket.io");

const web = http
  .createServer((req, res) => {
    fs.readFile("index.html", "utf-8", (err, data) => {
      if (err) console.log(err);
      res.writeHead(200, { "Content-type": "text/html" });
      res.end(data);
    });
  })
  .listen(8900, () => {
    console.log("server run at http://localhost:8900");
  });

let io = socketio.listen(web);
io.sockets.on("connection", (s) => {
  s.on("msg", (data) => {
    io.sockets.emit("say", {
      msg: data.msg,
      datatime: data.datatime,
      clientId: s.id,
      name: data.name,
    });
  });
});

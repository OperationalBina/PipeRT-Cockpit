import { Server } from "socket.io";

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log("First use, starting socket.io");

    const io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      socket.on("log", (msg) => {
        socket.broadcast.emit("get_log", msg);
      });
    });

    res.socket.server.io = io;
  } 

  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;

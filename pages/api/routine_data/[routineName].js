import { Server } from "socket.io";

const ioHandler = (req, res) => {
  const routineName = req.query;

  if (!res.socket.server.io) {
    console.log("First use, starting socket.io");

    const io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      socket.on("log_data_input", (msg) => {
        socket.broadcast.emit("input", msg);
      });

      socket.on("log_data_output", (msg) => {
        socket.broadcast.emit("output", msg);
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

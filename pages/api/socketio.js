import { Server } from "socket.io";
import { connectToDatabase, insert, find } from "../../utils/nedb";

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    const { db } = connectToDatabase();
    console.log("First use, starting socket.io");

    const io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      socket.on("log", (msg) => {
        socket.broadcast.emit("get_log", msg);
        msg = JSON.parse(msg);
        msg["source"] = msg["source"].split(".").at(-1);
        console.log(msg)
        insert(db[msg["level"].toLowerCase() + "s"], msg);
      });

      socket.on("pipe_creation", async (msg) => {
        console.log("boom")
        msg = JSON.parse(JSON.parse(msg)["message"].replaceAll("'", '"'))[
          "Pipe structure"
        ];
        let pipe_name = Object.keys(msg)[0];
        let flows = Object.keys(msg[pipe_name]);

        for (let flow of flows) {
          for (let routine of Object.values(msg[pipe_name][flow])) {
            let db_routine = await find(db.routines, {
              full_name: `${pipe_name}.${flow}.${routine}`,
            });
            if (db_routine.length === 0) {
              insert(db.routines, {
                error_level: 0,
                full_name: `${pipe_name}.${flow}.${routine}`,
                name: `${routine}`,
              });
            }
          }
        }
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

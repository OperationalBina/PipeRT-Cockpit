import { Server } from "socket.io";
import { PIPE_API } from "../../config";
import getHandle from "../../log_handle_mapping";
import handlePipeStructureMessage from "../../log_handlers/pipe_creation_handler"


// const ioHandler = async (req, res) => {
//   if (!res.socket.server.io) {
//     const { db } = connectToDatabase();

//     const io = new Server(res.socket.server, {
//       maxHttpBufferSize: 1e8,
//     });

//     io.on("connection", (socket) => {

//       socket.on("join_room", (msg) => {
//         socket.join(msg);
//       });

//       socket.on('disconnect', function () {
//         console.log('disconnect client event....');
//       });

//       socket.on("log", (msg) => {
//         msg = JSON.parse(msg);
//         msg["source"] = msg["source"].split(".").at(-1);

//         let logType = msg["message"].split(":")[0];

//         if (
//           logType == "fps"
//         ) {
//           const message = msg["message"]
//           const fpsObject = message.split(":")[1]
//           const fps = parseInt(fpsObject)
//           console.log(msg)
//           find(db.fps, {
//             source: msg["source"],
//           }).then((result) => {
//             console.log(result)
//             if (result.length == 0) {
//               insert(db["fps"], {
//                 "source": msg["source"],
//                 "fps": fps
//               })
//             }
//           });
//         } else if (
//           logType != "input" &&
//           logType != "output" &&
//           logType != "extra_image"
//         ) {
//           insert(db[msg["level"].toLowerCase() + "s"], msg);
//         } else {
//           let socketMessage = null;

//           if (logType == "extra_image") {
//             socketMessage = extractExtraImageDetailsFromExtraInputMessage(msg);
//           } else {
//             socketMessage = extractImageFromInputOutputMessage(msg);
//           }

//           socket.to(msg["source"]).emit(logType, socketMessage)
//         }
//       });

//       socket.on("pipe_creation", async (msg) => {
//         msg = JSON.parse(JSON.parse(msg)["message"].replaceAll("'", '"'));
//         msg = await handlePipeStructureMessage(msg, db);
//       });
//     });

//     // In case that the pipe is up already and the socket was not listening.
//     try {
//       const pipeStructureResponse = await fetch(`${PIPE_API}/pipe/structure`)

//       if (pipeStructureResponse.ok) {
//         const pipeStructure = await pipeStructureResponse.json()
//         handlePipeStructureMessage(pipeStructure, db)
//       }
//     } catch {
//       console.log("Failed fetching pipe structure")
//     }

//     res.socket.server.io = io;
//   }

//   res.end();
// };

const ioHandler = async (req, res) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      maxHttpBufferSize: 1e8,
    });

    io.on("connection", (socket) => {
      socket.on("join_room", (msg) => {
        socket.join(msg);
      });

      socket.on("disconnect", function () {
        console.log("disconnect client event....");
      });

      socket.on("log", (msg) => {
        msg = JSON.parse(msg);
        msg["source"] = msg["source"].split(".").at(-1);

        let logType = msg["message"].split(":")[0];
        const handle = getHandle(logType);
        handle({ msg: msg, socket: socket, logType: logType })
      });

      socket.on("pipe_creation", async (msg) => {
        msg = JSON.parse(JSON.parse(msg)["message"].replaceAll("'", '"'));
        msg = await handlePipeStructureMessage(msg);
      });
    });

    // In case that the pipe is up already and the socket was not listening.
    try {
      const pipeStructureResponse = await fetch(`${PIPE_API}/pipe/structure`);

      if (pipeStructureResponse.ok) {
        const pipeStructure = await pipeStructureResponse.json();
        await handlePipeStructureMessage(pipeStructure);
      }
    } catch {
      console.log("Failed fetching pipe structure");
    }

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

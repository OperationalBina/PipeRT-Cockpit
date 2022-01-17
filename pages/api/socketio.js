import { Server } from "socket.io";
import { connectToDatabase, insert, find } from "../../utils/nedb";

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    const { db } = connectToDatabase();

    const io = new Server(res.socket.server, {
      maxHttpBufferSize: 1e8
    });

    io.on("connection", (socket) => {
      socket.on("log", (msg) => {
        socket.broadcast.emit("get_log", msg);
        msg = JSON.parse(msg);
        msg["source"] = msg["source"].split(".").at(-1);
        
        let logType = msg['message'].split(':')[0]

        if (logType != 'input' && logType != 'output' && logType != 'extra_image') {
          insert(db[msg["level"].toLowerCase() + "s"], msg);
        } else {
          let emitName = msg["source"] + "_" + logType
          let socketMessage = null

          if (logType == 'extra_image') {
            socketMessage = extractExtraImageDetailsFromExtraInputMessage(msg)
          } else {
            socketMessage = extractImageFromInputOutputMessage(msg);
          }

          socket.broadcast.emit(emitName, socketMessage)
        }
      });

      socket.on("pipe_creation", async (msg) => {
        msg = JSON.parse(JSON.parse(msg)["message"].replaceAll("'", '"'))

        let pipeStructure = msg["Pipe structure"];
        let events = msg["Events"]
        
        for (let event of events) {
          let eventsFound = await find(db.events, {
            event_name: event,
          });
          
          if (eventsFound !== null && eventsFound.length === 0) {
            insert(db.events, {event_name: event})
          }
        }

        let pipeName = Object.keys(pipeStructure)[0];
        let flows = Object.keys(pipeStructure[pipeName]);

        for (let flow of flows) {
          for (let routine of Object.values(pipeStructure[pipeName][flow])) {
            let dbRoutine = await find(db.routines, {
              full_name: `${pipeName}.${flow}.${routine}`,
            });
            if (dbRoutine.length === 0) {
              insert(db.routines, {
                error_level: 0,
                full_name: `${pipeName}.${flow}.${routine}`,
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

function extractImageFromInputOutputMessage(msg) {
  let additionalData = msg['message'].split("'data':")[1];

  let strJsonAdditionalData = additionalData.split("'").join('"');
  strJsonAdditionalData = strJsonAdditionalData.replace('\n', '');

  let jsonAdditionalData = JSON.parse(strJsonAdditionalData);

  let image = jsonAdditionalData['image_base64'];

  return image;
}

function extractExtraImageDetailsFromExtraInputMessage(msg) {
  let imageDetails = msg['message'].split("extra_image:")[1];

  let strImageDetails = imageDetails.split("'").join('"');
  strImageDetails = strImageDetails.replace('\n', '');

  return JSON.parse(strImageDetails);
}


import { Server } from "socket.io";
import { connectToDatabase, insert, find } from "../../utils/nedb";

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    const { db } = connectToDatabase();

    const io = new Server(res.socket.server, {
      maxHttpBufferSize: 1e8
    });

    io.on("connection", (socket) => {

      socket.on("join_room", (msg) => {
        socket.join(msg);
      });
      
      socket.on('disconnect', function () {
        console.log('disconnect client event....');
      });

      socket.on("log", (msg) => {
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

          socket.to(msg["source"]).emit(logType, socketMessage)
        }
      });

      socket.on("pipe_creation", async (msg) => {
        msg = JSON.parse(JSON.parse(msg)["message"].replaceAll("'", '"'))[
          "Pipe structure"
        ];

        let pipeName = Object.keys(msg)[0];
        let flows = Object.keys(msg[pipeName]);

        for (let flow of flows) {
          for (let routine of Object.values(msg[pipeName][flow])) {
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


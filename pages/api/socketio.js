import { Server } from "socket.io";
import { PIPE_API } from "../../config";
import { connectToDatabase, insert, find } from "../../utils/nedb";

const ioHandler = async (req, res) => {
  if (!res.socket.server.io) {
    const { db } = connectToDatabase();

    const io = new Server(res.socket.server, {
      maxHttpBufferSize: 1e8,
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

        let logType = msg["message"].split(":")[0];

        if (
          logType != "input" &&
          logType != "output" &&
          logType != "extra_image"
        ) {
          insert(db[msg["level"].toLowerCase() + "s"], msg);
        } else {
          let socketMessage = null;

          if (logType == "extra_image") {
            socketMessage = extractExtraImageDetailsFromExtraInputMessage(msg);
          } else {
            socketMessage = extractImageFromInputOutputMessage(msg);
          }

          socket.to(msg["source"]).emit(logType, socketMessage)
        }
      });

      socket.on("pipe_creation", async (msg) => {
        msg = JSON.parse(JSON.parse(msg)["message"].replaceAll("'", '"'));
        msg = await handlePipeStructureMessage(msg, db);
      });
    });

    // In case that the pipe is up already and the socket was not listening.
    try {
      const pipeStructureResponse = await fetch(`${PIPE_API}/pipe/structure`)
      
      if (pipeStructureResponse.ok) {
        const pipeStructure = await pipeStructureResponse.json()
        handlePipeStructureMessage(pipeStructure, db)
      }
    } catch {
      console.log("Failed fetching pipe structure")
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

async function handlePipeStructureMessage(msg, db) {
  let routines = msg["Routines"];
  let events = msg["Events"];

  for (let event of events) {
    let eventsFound = await find(db.events, {
      event_name: event,
    });

    if (eventsFound !== null && eventsFound.length === 0) {
      insert(db.events, { event_name: event });
    }
  }

  for (const routine of routines) {
    let flow_name = routine["flow_name"];
    let routine_name = routine["routine_name"];

    let existingRoutines = await find(db.routines, {
      routine_name: `${routine_name}`,
    });

    if (existingRoutines.length === 0) {
      insert(db.routines, {
        error_level: 0,
        routine_name: `${routine_name}`,
        flow_name: `${flow_name}`,
        name: `${flow_name}-${routine_name}`,
        events: routine["events"]
      });
    }
  }
  return msg;
}

function extractImageFromInputOutputMessage(msg) {
  let additionalData = msg["message"].split("'data':")[1];

  let strJsonAdditionalData = additionalData.split("'").join('"');
  strJsonAdditionalData = strJsonAdditionalData.replace("\n", "");

  let jsonAdditionalData = JSON.parse(strJsonAdditionalData);

  let image = jsonAdditionalData["image_base64"];

  return image;
}

function extractExtraImageDetailsFromExtraInputMessage(msg) {
  let imageDetails = msg["message"].split("extra_image:")[1];

  let strImageDetails = imageDetails.split("'").join('"');
  strImageDetails = strImageDetails.replace("\n", "");

  return JSON.parse(strImageDetails);
}

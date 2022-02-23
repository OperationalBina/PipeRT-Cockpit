export default function handle_extra_image({msg}) {
    const socketMessage = extractExtraImageDetailsFromExtraInputMessage(msg);
    socket.to(msg["source"]).emit(logType, socketMessage)
}

function extractExtraImageDetailsFromExtraInputMessage(msg) {
    let imageDetails = msg["message"].split("extra_image:")[1];
  
    let strImageDetails = imageDetails.split("'").join('"');
    strImageDetails = strImageDetails.replace("\n", "");
  
    return JSON.parse(strImageDetails);
  }
export default function handle_io({msg, socket, logType}) {
    const socketMessage = extractImageFromInputOutputMessage(msg);
    socket.to(msg["source"]).emit(logType, socketMessage)
}

function extractImageFromInputOutputMessage(msg) {
    let additionalData = msg["message"].split("'data':")[1];
  
    let strJsonAdditionalData = additionalData.split("'").join('"');
    strJsonAdditionalData = strJsonAdditionalData.replace("\n", "");
  
    let jsonAdditionalData = JSON.parse(strJsonAdditionalData);
  
    let image = jsonAdditionalData["image_base64"];
  
    return image;
  }
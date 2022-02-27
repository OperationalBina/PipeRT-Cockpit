import handle_extra_image from "./log_handlers/extra_image_handler";
import handle_fps from "./log_handlers/fps_handler";
import handle_io from "./log_handlers/io_handler";
import handle_records from "./log_handlers/records_handler";

const handlersByLogType = {
  extra_image: handle_extra_image,
  input: handle_io,
  output: handle_io,
  fps: handle_fps,

};

export default function getHandle(logType) {
    const handler = handlersByLogType[logType];

    if (handler) {
        return handler;
    } else {
        return handle_records;
    }
}
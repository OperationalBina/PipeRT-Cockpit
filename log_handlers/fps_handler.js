import { connectToDatabase, insert, find, update } from "../utils/nedb";

export default function handle_fps({ msg }) {
  const { db } = connectToDatabase();

  const message = msg["message"];
  const fpsObject = message.split(":")[1];
  const fps = parseInt(fpsObject);

  find(db.fps, {
    source: msg["source"],
  }).then((result) => {
    if (result.length == 0) {
      insert(db["fps"], {
        source: msg["source"],
        fps: fps,
      });
    } else {
      update(db.fps, { source: msg["source"] }, { $set: { fps: fps } })
    }
  });
}

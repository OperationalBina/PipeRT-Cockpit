import { insert, find, connectToDatabase } from "../utils/nedb";


export default async function handlePipeStructureMessage(msg) {
    const { db } = connectToDatabase();

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
          events: routine["events"],
        });
      }
    }
    return msg;
  }
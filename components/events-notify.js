import EventsNotifyView from "./events-notify-view";
import { useEffect, useState } from "react";
import {PIPE_API} from "../config"

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
}

async function notifyEvent(routine, event, args) {
//   let SERVER_URL = "http://localhost:4000";
  let request = `${PIPE_API}/execute?event_name=${event}`;

  if (routine !== null && routine !== undefined && routine.length === 2) {
    request += `&specific_flow_routines={"${routine[0]}": ["${routine[1]}"]}`;
  }

  if (args !== null) {
    request += `&${replaceAll(args, ",", "&")}`;
  }

  try {
    await fetch(request);
  } catch (ex) {
    console.log(ex);
  }
}

export default function EventsNotify() {
  const [events, setEvents] = useState([]);
  const [components, setComponents] = useState([]);

  useEffect(() => {
    fetch(`/api/events/`)
      .then((res) => res.json())
      .then((data) => {
        let eventsTemp = [];
        for (let event of data) {
          eventsTemp.push(event["event_name"]);
        }
        setEvents(eventsTemp);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/routines/`)
      .then((res) => res.json())
      .then((data) => {
        let componentsTemp = [];
        for (let component of data) {
          const fullName = component["full_name"];

          // Remove the logger name from the full name
          let loggerFlowRoutine = fullName.split(".");
          loggerFlowRoutine.shift();

          componentsTemp.push(loggerFlowRoutine);
        }
        setComponents(componentsTemp);
      });
  }, []);

  return (
    <EventsNotifyView
      events={events}
      routines={components}
      notifyEvent={notifyEvent}
    />
  );
}

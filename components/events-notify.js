import EventsNotifyView from "./events-notify-view";
import { useEffect, useState } from "react";
import { PIPE_API } from "../config";

function createJsonArguments(args) {
  const argsSperated = args.split(",");
  let json = {};

  argsSperated.forEach((arg) => {
    const keyValue = arg.split(":");
    json[keyValue[0]] = keyValue[1];
  });

  return json;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
}

async function notifyEvent(routine, event, args) {
  const extraArgs = `${replaceAll(args, "=", ":")}`;
  const extraArgsJson = createJsonArguments(extraArgs);

  let requestArguments = {
    extra_args: extraArgsJson,
  };

  let request = ""

  if (routine !== undefined && routine !== "") {
    request = `${PIPE_API}/routines/${routine['routine_name']}/events/${event}/execute/`;
  } else {
    request = `${PIPE_API}/routines/events/${event}/execute/`;
  }

  try {
    await fetch(request, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(requestArguments),
    });
  } catch (ex) {
    console.log(ex);
  }
}

export default function EventsNotify() {
  const [events, setEvents] = useState([]);
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    fetch(`/api/events/`)
      .then((res) => res.json())
      .then((data) => {
        let eventsTemp = data.map((event) => event["event_name"]);
        setEvents(eventsTemp);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/routines/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setRoutines(data);
      });
  }, []);

  return (
    <EventsNotifyView
      events={events}
      routines={routines}
      notifyEvent={notifyEvent}
    />
  );
}

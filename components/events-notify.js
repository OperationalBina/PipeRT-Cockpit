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
  const request = `${PIPE_API}/execute/${event}`;
  const extraArgs = `${replaceAll(args, "=", ":")}`;
  const extraArgsJson = createJsonArguments(extraArgs);

  let requestArguments = {
    extra_args: extraArgsJson,
  };

  if (routine !== null && routine !== undefined && routine.length === 2) {
    let specificFlowRoutines = {};
    const flowName = routine[0];
    const routineName = routine[1];
    specificFlowRoutines[flowName] = [`${routineName}`];
    requestArguments["specific_flow_routines"] = specificFlowRoutines;
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
  const [components, setComponents] = useState([]);

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
        let componentsTemp = data.map((component) => {
          let loggerFlowRoutine = component["full_name"].split(".");
          loggerFlowRoutine.shift();

          return loggerFlowRoutine;
        });
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

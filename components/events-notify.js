import EventsNotifyView from "./events-notify-view";
import { useEffect, useState } from "react";
import { PIPE_API, SERVER_URL } from "../config/index";

const PIPE_NAME = "Pipe"

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
  const extraArgs = replaceAll(args, "=", ":");
  const extraArgsJson = createJsonArguments(extraArgs);

  let requestArguments = {
    extra_args: extraArgsJson,
  };

  let request = ""

  if (routine !== undefined && routine !== "" && routine !== PIPE_NAME) {
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

export default function EventsNotify({routines, events}) {

  const eventNames = events.map((event) => event["event_name"]);
  const routinesWithDefaultPipe = routines.concat([{"routine_name": PIPE_NAME, "events": []}])

  return (
    <EventsNotifyView
      events={eventNames}
      routines={routinesWithDefaultPipe}
      notifyEvent={notifyEvent}
    />
  );
}

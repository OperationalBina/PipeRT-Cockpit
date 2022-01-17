import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import styles from "../styles/utils.module.css";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";

export default function EventsNotifyView({ routines, events, notifyEvent }) {
  const [routine, setRoutine] = useState("");
  const [event, setEvent] = useState("");
  const [args, setArgs] = useState("");

  const onRoutineChange = (webEvent) => {
    setRoutine(webEvent.target.value)
  }

  const onEventChange = (webEvent) => {
    setEvent(webEvent.target.value)
  }

  const onArgsChange = (webEvent) => {
    setArgs(webEvent.target.value)
  }

  const onClick = (webEvent) => {
    notifyEvent(routine, event, args)
  }

  return (
    <Grid container spacing={2} paddingTop="10%" className={styles.centered}>
      <Grid item xs={12} className={styles.centered}>
        Events
        </Grid>
      <Grid item xs={12} className={styles.centered}>
        <FormControl
          fullWidth
          className={styles.centered}
          style={{
            width: "80%",
          }}
        >
          <InputLabel id="demo-simple-select-component">Routine</InputLabel>
          <Select
            labelId="demo-simple-select-component"
            id="demo-simple-select"
            value={routine}
            label="Routine"
            onChange={onRoutineChange}
            style={{
              width: "100%",
            }}
          >
            {routines.map(routine => {
              return <MenuItem value={routine}>{routine}</MenuItem>
            })}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} className={styles.centered}>
        <FormControl
          fullWidth
          className={styles.centered}
          style={{
            width: "80%",
          }}
        >
          <InputLabel id="demo-simple-select-event">Event</InputLabel>
          <Select
            labelId="demo-simple-select-event"
            id="demo-simple-select"
            value={event}
            label="Routine"
            onChange={onEventChange}
            style={{
              width: "100%",
            }}
          >
            {events.map(event => {
              return <MenuItem value={event}>{event}</MenuItem>
            })}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} className={styles.centered} style={{width: "80%"}} fullWidth>
        <TextField id="outlined-basic" label="Arguments"variant="outlined" style={{width: "80%"}} onChangeCapture={onArgsChange}/>
      </Grid>

      <Grid item xs={12} className={styles.centered} style={{width: "80%"}} fullWidth>
      <Button variant="contained" style={{width: "80%"}} onClick={onClick}>NOTIFY</Button>
      </Grid>
    </Grid>
  );
}

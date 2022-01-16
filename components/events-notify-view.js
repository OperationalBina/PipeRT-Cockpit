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

export default function EventsNotifyView({ routines, events }) {
  const [routine, setRoutine] = useState("");
  const [event, setEvent] = useState("");

  const onRoutineChange = (event) => {
    setRoutine(event.target.value)
  }

  const onEventChange = (event) => {
    setEvent(event.target.value)
  }

  return (
    <Grid container spacing={3} paddingTop="5%">
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
            <MenuItem value={10}>First</MenuItem>
            <MenuItem value={20}>Sec</MenuItem>
            <MenuItem value={30}>Dest</MenuItem>
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
            <MenuItem value={10}>First</MenuItem>
            <MenuItem value={20}>Sec</MenuItem>
            <MenuItem value={30}>Dest</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} className={styles.centered} style={{width: "80%"}} fullWidth>
        <TextField id="outlined-basic" label="Arguments"variant="outlined" style={{width: "80%"}}/>
      </Grid>

      <Grid item xs={12} className={styles.centered} style={{width: "80%"}} fullWidth>
      <Button variant="contained" style={{width: "80%"}}>NOTIFY</Button>
      </Grid>
    </Grid>
  );
}

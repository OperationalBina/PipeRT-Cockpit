import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import KeyValueView from "./key-value-view";
import { useRecoilValue } from 'recoil';
import { selectedRoutineState } from "../utils/shared_atoms";

export default function RoutineLogsSummeryView() {
    const selectedRoutine = useRecoilValue(selectedRoutineState);
    const [logsCounter, setLogsCounter] = useState({
      exceptions: 0,
      warnings: 0, 
      info: 0, 
      avg_fps: 0
  })

    useEffect(() => {
      if (selectedRoutine !== null) {
        fetch(`http://localhost:3000/api/routine_logs/${selectedRoutine}/summary`)
          .then(res => res.json())
          .then(data => {
            setLogsCounter(data)
          })
      }
    }, [selectedRoutine]);


    return <Grid container spacing={3}>
        <KeyValueView field="Exceptions" value={logsCounter.exceptions}/>
        <KeyValueView field="Warnings" value={logsCounter.warnings}/>
        <KeyValueView field="Info" value={logsCounter.info}/>
        <KeyValueView field="AVG FPS" value={logsCounter.avg_fps}/>
    </Grid>
}
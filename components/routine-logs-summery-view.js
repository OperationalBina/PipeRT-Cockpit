import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import KeyValueView from "./key-value-view";
import { useRecoilValue } from 'recoil';
import { selectedRoutineState } from "../utils/shared_atoms";

const initialLogsCounter = {
  exceptions: 0,
  warnings: 0,
  info: 0,
  avgFps: 0
}

export default function RoutineLogsSummeryView() {
  const selectedRoutine = useRecoilValue(selectedRoutineState);
  const [logsCounter, setLogsCounter] = useState(initialLogsCounter)

  useEffect(() => {
    if (selectedRoutine !== null) {
      fetch(`http://localhost:3000/api/routine_logs/${selectedRoutine}/summary`)
        .then(res => res.json())
        .then(data => {
          setLogsCounter(data)
        })
        .catch(error => {
          console.log(`Unable to count logs for routine '${selectedRoutine}' - ${error}`)
          setLogsCounter({
            exceptions: -1,
            warnings: -1,
            info: -1,
            avgFps: -1
          })
        })
    }
    else
      setLogsCounter(initialLogsCounter)

  }, [selectedRoutine]);


  return <Grid container spacing={3}>
    <KeyValueView field="Exceptions" value={logsCounter.exceptions} />
    <KeyValueView field="Warnings" value={logsCounter.warnings} />
    <KeyValueView field="Info" value={logsCounter.info} />
    <KeyValueView field="AVG FPS" value={logsCounter.avgFps} />
  </Grid>
}
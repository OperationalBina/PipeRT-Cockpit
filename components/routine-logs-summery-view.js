import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import KeyValueView from "./key-value-view";
import { useRecoilValue } from 'recoil';
import { selectedRoutineState } from "../utils/shared_atoms";
import { getLogsSummary } from "../utils/api_calls"

const initiallogsSummary = {
  exceptions: 0,
  warnings: 0,
  info: 0,
  avg_fps: 0
}

export default function RoutineLogsSummeryView() {
  const selectedRoutine = useRecoilValue(selectedRoutineState);
  const [logsSummary, setLogsSummary] = useState(initiallogsSummary)

  useEffect(() => {
    if (selectedRoutine !== null) {
        async function updateLogsSummary() {
            setLogsSummary( await getLogsSummary(selectedRoutine))
        }
        updateLogsSummary();
        const updateLogsSummaryInterval = setInterval(() => {updateLogsSummary();}, 5000);

        return () => {clearInterval(updateLogsSummaryInterval);};
    }
    else
      setLogsSummary(initiallogsSummary)

  }, [selectedRoutine]);


  return <Grid container spacing={3}>
    <KeyValueView field="Exceptions" value={logsSummary.exceptions} />
    <KeyValueView field="Warnings" value={logsSummary.warnings} />
    <KeyValueView field="Info" value={logsSummary.info} />
    <KeyValueView field="AVG FPS" value={logsSummary.avg_fps} />
  </Grid>
}
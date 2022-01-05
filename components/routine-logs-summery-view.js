import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import KeyValueView from "./key-value-view";
import { useRecoilValue } from 'recoil';
import { selectedRoutineState } from "../utils/shared_atoms";
import { apiFetch } from "../utils/http-calls"
import useSWR from 'swr'
import { useMemo } from "react";

const initiallogsSummary = {
  exceptions: 0,
  warnings: 0,
  info: 0,
  avg_fps: 0
}

export default function RoutineLogsSummeryView() {
  const selectedRoutine = useRecoilValue(selectedRoutineState);

  const { data: logsSummary } = useSWR(selectedRoutine?`routine_logs/${selectedRoutine}/summary`:null, apiFetch, { refreshInterval: 1000, 
    initialData: initiallogsSummary})
  
  const validatedlogsSummary = useMemo(() => logsSummary?logsSummary:initiallogsSummary, [logsSummary])

  return <Grid container spacing={3}>
    <KeyValueView field="Exceptions" value={validatedlogsSummary.exceptions} />
    <KeyValueView field="Warnings" value={validatedlogsSummary.warnings} />
    <KeyValueView field="Info" value={validatedlogsSummary.info} />
    <KeyValueView field="AVG FPS" value={validatedlogsSummary.avg_fps} />
  </Grid>
}
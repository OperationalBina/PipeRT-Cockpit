import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import KeyValueView from "./key-value-view";
import { useRecoilValue } from 'recoil';
import { selectedRoutineState } from "../utils/shared_atoms";
import { apiFetch } from "../utils/http-calls"
import useSWR from 'swr'

const initiallogsSummary = {
  exceptions: 0,
  warnings: 0,
  info: 0,
  avg_fps: 0
}

export default function RoutineLogsSummeryView() {
  const selectedRoutine = useRecoilValue(selectedRoutineState);

  const { data, error } = useSWR(selectedRoutine ? `routine_logs/${selectedRoutine}/summary` : null, apiFetch, { 
    refreshInterval: 5000 })
  const logsSummary = data ? data : initiallogsSummary

  return <Grid container spacing={3}>
    <KeyValueView field="Exceptions" value={logsSummary.exceptions} />
    <KeyValueView field="Warnings" value={logsSummary.warnings} />
    <KeyValueView field="Info" value={logsSummary.info} />
    <KeyValueView field="AVG FPS" value={logsSummary.avg_fps} />
  </Grid>
}
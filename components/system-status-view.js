import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import KeyValueView from "./key-value-view";
import HealthScoreView from "./health-score-view";
import { ROUTINE_LEVELS_ENUM } from "../constants"
import { useMemo } from "react";

export default function SystemStatusView({routines}) {
  const routinesCount = useMemo(() => routines.length, [routines]),
        stableRoutineCount = useMemo(() => routines.filter(routine => routine.error_level == ROUTINE_LEVELS_ENUM.STABLE).length, [routines]), 
        problemRoutineCount = useMemo(() => routines.filter(routine => routine.error_level == ROUTINE_LEVELS_ENUM.PROBLEM).length, [routines]),
        crashedRoutinesCount = useMemo(() => routines.filter(routine => routine.error_level == ROUTINE_LEVELS_ENUM.CRASH).length, [routines]),
        healthScore = useMemo(() => routinesCount != 0 ? Math.floor(((routinesCount - crashedRoutinesCount) / routinesCount) * 100) : 0, [routinesCount, crashedRoutinesCount])

  return (
    <Grid container spacing={3} paddingTop="5%" paddingBottom="5%">
      <KeyValueView field="Routines" value={routinesCount} />
      <KeyValueView field="Crashes" value={crashedRoutinesCount} />
      <KeyValueView field="Problems" value={problemRoutineCount} />
      <KeyValueView
        field="Stable"
        value={stableRoutineCount + " of " + routinesCount}
      />

      <Grid item xs={12}>
        <Divider variant="middle" style={{ width: "80%" }} />
      </Grid>
      
      <HealthScoreView health_score={healthScore} />
    </Grid>
  );
}

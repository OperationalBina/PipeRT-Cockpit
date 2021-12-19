import Grid from "@mui/material/Grid";
import RoutineView from "./routine-view";

export default function RoutinesView({ routines, selected_routine, updateSelectedRoutine }) {
  return (
    <Grid container>
      {routines.map(function (routine, index) {
        return (
          <Grid item xs={2} key={index} style={{background: selected_routine == routine.name? '#a8e6ff': null}} onClick={() => updateSelectedRoutine(routine.name)}>
            <RoutineView routine={routine} />
          </Grid>
        );
      })}
    </Grid>
  );
}

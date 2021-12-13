import Grid from "@mui/material/Grid";
import RoutineView from "./routine-view";

export default function RoutinesView({ routines }) {
  return (
    <Grid container>
      {routines.map(function (routine, index) {
        return (
          <Grid item xs={2} key={index}>
            <RoutineView routine={routine} />
          </Grid>
        );
      })}
    </Grid>
  );
}

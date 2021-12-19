import Grid from "@mui/material/Grid";
import RoutineView from "./routine-view";
import { useRecoilState } from 'recoil';
import { selectedRoutineState } from "../utils/shared_atoms";

export default function RoutinesView({ routines }) {
  const [selected_routine, setSelectedRoutine] = useRecoilState(selectedRoutineState);
  return (
    <Grid container>
      {routines.map(function (routine, index) {
        return (
          <Grid item xs={2} key={index} style={{background: selected_routine == routine.name? '#a8e6ff': null}} onClick={() => setSelectedRoutine(routine.name)}>
            <RoutineView routine={routine} />
          </Grid>
        );
      })}
    </Grid>
  );
}

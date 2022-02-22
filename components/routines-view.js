import Grid from "@mui/material/Grid";
import RoutineView from "./routine-view";
import { useRecoilState } from 'recoil';
import { selectedRoutineState } from "../utils/shared_atoms";
import { useRouter } from 'next/router'

export default function RoutinesView({ routines }) {
  const [selectedRoutine, setSelectedRoutine] = useRecoilState(selectedRoutineState);
  const router = useRouter();

  return (
    <Grid container spacing={2}>
      {routines.map(function (routine, index) {
        return (
          <Grid item xs={2} key={index} style={{background: selectedRoutine == routine.routine_name? '#a8e6ff': null}} 
          onClick={() => setSelectedRoutine(routine.routine_name)} onDoubleClick= {() => router.push(`/routines/${routine.routine_name}`)}>
            <RoutineView routine={routine} />
          </Grid>
        );
      })}
    </Grid>
  );
}

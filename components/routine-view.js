import styles from "../styles/utils.module.css";
import Circle from "@mui/icons-material/Circle";
import Grid from "@mui/material/Grid";
import { ROUTINE_LEVELS_ENUM } from "../constants";
import Typography from '@mui/material/Typography';

const colorByErrorLevel = {
  [ROUTINE_LEVELS_ENUM.STABLE]: "green",
  [ROUTINE_LEVELS_ENUM.PROBLEM]: "yellow",
  [ROUTINE_LEVELS_ENUM.CRASH]: "red",
};

export default function RoutineView({ routine }) {
  const circleStlye = {
    fill: colorByErrorLevel[routine.error_level],
    fontSize: "500%",
  };

  return (
    <Grid container className={styles.centered}>
      <Grid item xs={12} className={styles.centered}>
        <Circle 
          stroke={"gray"}
          strokeWidth={0.5}
          className={styles.centered}
          style={circleStlye}
        />
      </Grid>
      <Grid item xs={12} wrap="nowrap">
        <Typography className={styles.centered} style={{
          fontSize: "80%"
        }}>{routine.routine_name}</Typography>
      </Grid>
    </Grid>
        );
}

import styles from "../styles/utils.module.css";
import Circle from "@mui/icons-material/Circle";
import Grid from "@mui/material/Grid";
import { ROUTINE_LEVELS_ENUM } from "../constants";

const color_by_error_level = {
  [ROUTINE_LEVELS_ENUM.STABLE]: "green",
  [ROUTINE_LEVELS_ENUM.PROBLEM]: "yellow",
  [ROUTINE_LEVELS_ENUM.CRASH]: "red",
};

export default function RoutineView({ routine }) {
  const circle_stlye = {
    fill: color_by_error_level[routine.error_level],
    fontSize: "500%",
  };

  return (
    <Grid container className={styles.centered}>
      <Grid item xs={12} className={styles.centered}>
        <Circle 
          stroke={"gray"}
          strokeWidth={0.5}
          className={styles.centered}
          style={circle_stlye}
        />
      </Grid>
      <Grid item xs={12}>
        <p className={styles.centered}>{routine.name}</p>
      </Grid>
    </Grid>
  );
}

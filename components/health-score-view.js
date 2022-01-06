import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";

export default function HealthScoreView({healthScore}) {
  return (
    <Grid container spacing={1} paddingTop="5%">
      <Grid item xs={12} style={{ justifyContent: "center", display: "flex" }}>
        <div style={{ fontWeight: "bold" }}>Health Score</div>
      </Grid>
      <Grid item xs={12} style={{ justifyContent: "center", display: "flex" }}>
        {healthScore}
      </Grid>
      <Grid
        item
        xs={12}
        style={{ width: "60%", justifyContent: "center", display: "flex" }}
      >
        <LinearProgress
          height={200}
          borderradius={50}
          variant="determinate"
          value={healthScore}
          style={{ width: "60%", height: 20 }}
          color="success"
        ></LinearProgress>
      </Grid>
    </Grid>
  );
}

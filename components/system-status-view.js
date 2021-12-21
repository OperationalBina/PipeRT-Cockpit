import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import KeyValueView from "./key-value-view";
import HealthScoreView from "./health-score-view";

export default function SystemStatusView({
  routines_number,
  crashes,
  problems,
  stable_routines_number,
  health_score,
}) {
  return (
    <Grid container spacing={3} paddingTop="5%" paddingBottom="5%">
      <KeyValueView field="Routines" value={routines_number} />
      <KeyValueView field="Crashes" value={crashes} />
      <KeyValueView field="Problems" value={problems} />
      <KeyValueView
        field="Stable"
        value={stable_routines_number + " of " + routines_number}
      />

      <Grid item xs={12}>
        <Divider variant="middle" style={{ width: "80%" }} />
      </Grid>
      
      <HealthScoreView health_score={health_score} />
    </Grid>
  );
}

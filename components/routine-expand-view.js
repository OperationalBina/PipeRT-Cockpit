import { Grid } from "@mui/material";
import RoutineLogsSummaryView from "./routine-logs-summary-view";
import RoutineLogsView from "./routine-logs-view";
import Divider from "@mui/material/Divider";

export default function RoutineExpandView() {

  return (
    <Grid container spacing={2}>
      <Grid item xs={9.8}>
        <RoutineLogsView logsPerPage={5} />
      </Grid>
      <Grid item xs={0.2} xl={0.2} paddingTop="5%" paddingBottom="2%">
        <Divider
          variant="middle"
          style={{ width: "100%" }}
          orientation="vertical"/>
      </Grid>
      <Grid item xs={2}>
        <RoutineLogsSummaryView/>
      </Grid>
    </Grid>
  );
}

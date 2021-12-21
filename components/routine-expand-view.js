import { Grid } from "@mui/material";
import RoutineLogsSummeryView from "./routine-logs-summery-view";
import RoutineLogsView from "./routine-logs-view";
import Divider from "@mui/material/Divider";

export default function RoutineExpandView() {

  return (
    <Grid container spacing={2}>
      <Grid item xs={48 / 5 - 0.2} xl={48 / 5 - 0.2}>
        <RoutineLogsView logsPerPage=5 />
      </Grid>
      <Grid item xs={0.2} xl={0.2} paddingTop="5%" paddingBottom="2%">
        <Divider
          variant="middle"
          style={{ width: "100%" }}
          orientation="vertical"
        />
      </Grid>
      <Grid item xs={12 / 5}>
        <RoutineLogsSummeryView/>
      </Grid>
    </Grid>
  );
}

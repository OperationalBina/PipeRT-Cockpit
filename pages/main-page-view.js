import { Grid } from "@mui/material";
import RoutinesView from "../components/routines-view";
import SystemStatusView from "../components/system-status-view";
import SidebarNavigationView from "../components/sidebar-navigation-view";
import RoutineExpandView from "../components/routine-expand-view";
import Divider from "@mui/material/Divider";

export default function MainPageView({routines, logs, logs_summary, health }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={2} xl={2}>
        <SidebarNavigationView></SidebarNavigationView>
      </Grid>
      <Grid item xs={7.8} xl={7.8}>
        <RoutinesView routines={routines}></RoutinesView>
      </Grid>
      <Grid item xs={0.2}>
        <Divider
          variant="middle"
          style={{ height: "100%" }}
          orientation="vertical"
        />
      </Grid>
      <Grid item xs={2} xl={2}>
        <SystemStatusView
          crashes={health.crashes}
          routines_number={health.routines_number}
          problems={health.problems}
          stable_routines_number={health.stable_routines_number}
          health_score={health.health_score}
        />
      </Grid>
      <Grid item xs={12} xl={12} paddingTop="5%" paddingBottom="1%">
        <Divider variant="middle" style={{ width: "100%" }} />
      </Grid>
      <Grid item xs={2} xl={2} />
      <Grid item xs={10} xl={8}>
        <RoutineExpandView
          logs={logs}
          exceptions={logs_summary.exceptions}
          warnings={logs_summary.warnings}
          info={logs_summary.info}
          avg_fps={logs_summary.avg_fps}
        />
      </Grid>
    </Grid>
  );
}

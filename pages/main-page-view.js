import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import RoutinesView from "../components/routines-view";
import SystemStatusView from "../components/system-status-view";
import SidebarNavigationView from "../components/sidebar-navigation-view";
import RoutineExpandView from "../components/routine-expand-view";
import Divider from "@mui/material/Divider";
import { getRoutines } from "../utils/api_calls"
import { useUpdatingState } from "../utils/interval_hook"

export default function MainPageView() {

  const routines = useUpdatingState([], getRoutines, 5000)
  
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
          routines={routines}
        />
      </Grid>
      <Grid item xs={12} xl={12} paddingTop="5%" paddingBottom="1%">
        <Divider variant="middle" style={{ width: "100%" }} />
      </Grid>
      <Grid item xs={2} xl={2} />
      <Grid item xs={10} xl={8}>
        <RoutineExpandView/>
      </Grid>
    </Grid>
  );
}

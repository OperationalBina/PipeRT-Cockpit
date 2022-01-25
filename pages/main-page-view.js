import { Grid } from "@mui/material";
import RoutinesView from "../components/routines-view";
import SystemStatusView from "../components/system-status-view";
import SidebarNavigationView from "../components/sidebar-navigation-view";
import RoutineExpandView from "../components/routine-expand-view";
import Divider from "@mui/material/Divider";
import { apiFetch } from "../utils/http-calls"
import { REFRESH_TIMES } from "../constants"
import io from 'socket.io-client'
import useSWR from 'swr'

export default function MainPageView() {
  const { data } = useSWR('routines', apiFetch, { refreshInterval: REFRESH_TIMES.ROUTINES })
  const routines = data ? data : []
  fetch("/api/socketio").finally(() => {
    const socket = io();

    socket.on("connect", () => {
      console.log("connect");
      socket.emit("hello");
    });
  });

  return (
    <Grid container spacing={2} direction="row">
      <Grid  item xs={1.8} xl={1.8}>
        <SidebarNavigationView></SidebarNavigationView>
      </Grid>
      <Grid item xs={0.2} xl={0.2}>
            <Divider
              variant="middle"
              style={{ height: "100%" }}
              orientation="vertical"
            />
          </Grid>
      <Grid item xs={10} xl={10}>
        <Grid container spacing={2}>
          <Grid item xs={9.8} xl={7.8}>
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
            <SystemStatusView routines={routines} />
          </Grid>
          <Grid item xs={12} xl={12} paddingTop="5%" paddingBottom="1%">
            <Divider variant="middle" style={{ width: "100%" }} />
          </Grid>
          <Grid item xs={12} xl={8}>
            <RoutineExpandView />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

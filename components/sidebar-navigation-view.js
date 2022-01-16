import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MonitorIcon from '@mui/icons-material/Monitor';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import ArticleIcon from '@mui/icons-material/Article';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Grid from "@mui/material/Grid";
import EventsNotifyView from "./events-notify-view";
import styles from "../styles/utils.module.css";

export default function SidebarNavigationView() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Grid container
        padding={2}
        spacing={1}
      >
        <Grid item xs={12}>
        <Toolbar>
          <ListItemIcon>
            <MonitorIcon />
          </ListItemIcon>
          <ListItemText primary={"Monitor"} />
        </Toolbar>
        </Grid>

        <Grid item xs={12}>
        <Divider/>
        </Grid>

        <List>
          {["Health", "Logs", "Visualizer"].map((text) => (
            <Grid item xs={12}>
            <ListItem button key={text}>
              <ListItemIcon>
                {text === "Health" ? <MonitorHeartIcon /> : text === "Logs" ? <ArticleIcon /> : <RemoveRedEyeIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
            </Grid>
          ))}
        </List>
        <Grid item xs={12} >
        <Divider />
        </Grid>
        <Grid item xs={12}>
        <EventsNotifyView className={styles.centered}/>
        </Grid>
      </Grid>
    </Box>
  );
}
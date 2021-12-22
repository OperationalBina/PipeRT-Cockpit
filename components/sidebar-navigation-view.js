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

export default function SidebarNavigationView() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: '100%',
          flexShrink: 0,
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <ListItemIcon>
            <MonitorIcon />
          </ListItemIcon>
          <ListItemText primary={"Monitor"} />
        </Toolbar>
        <Divider />
        <List>
          {["Health", "Logs", "Visualizer"].map((text) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {text === "Health" ? <MonitorHeartIcon /> : text === "Logs" ? <ArticleIcon /> : <RemoveRedEyeIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

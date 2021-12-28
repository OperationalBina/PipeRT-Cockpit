import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import styles from "../styles/utils.module.css";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import HomeIcon from "@mui/icons-material/Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Link from "next/link";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

const ligthTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FFFFFF",
    },
  },
});

export default function RoutineAppBar({ routineName }) {
  return (
    <Grid item xs={12}>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              className={styles.centered}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              {routineName}
            </Typography>
            <Link href="/">
              <Button theme={ligthTheme}>
                <HomeIcon />
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Grid>
  );
}

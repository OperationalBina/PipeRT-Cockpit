import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "../styles/utils.module.css";
import { Box } from "@mui/system";

const getBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

const columns = [
  { field: "level", headerName: "Level" },
  {
    field: "data",
    headerName: "Data",
    flex: 1,
  },
];

export default function RoutineLogsView({ logs }) {
  const [open, setOpen] = React.useState(false);
  const [level, setLevel] = React.useState("");
  const [data, setData] = React.useState("");

  const handleClickOpen = (cell) => {
    setOpen(true);
    setLevel(cell["row"]["level"]);
    setData(cell["row"]["data"]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      style={{ width: "100%" }}
      sx={{
        "& .Exception": {
          bgcolor: "#F1948A",
          '&:hover': {
            bgcolor: "#E6B0AA"
          }
        },
        "& .Warning": {
          bgcolor: "#FAD7A0",
          '&:hover': {
            bgcolor: "#FAE5D3"
          }
        },
        "& .Info": {
          bgcolor: "#A9DFBF",
          '&:hover': {
            bgcolor: "#D4EFDF"
          }
        },
      }}
    >
      <DataGrid
        autoHeight={true}
        rows={logs}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onCellClick={handleClickOpen}
        {...logs}
        getRowClassName={(params) => `${params.getValue(params.id, "level")}`}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{level}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className={styles.displayLinebreak}>{data}</div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

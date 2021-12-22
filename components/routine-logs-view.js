import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "../styles/utils.module.css";
import { Box } from "@mui/system";
import { useRecoilValue } from 'recoil';
import { selectedRoutineState } from "../utils/shared_atoms";

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

export default function RoutineLogsView() {
  const selectedRoutine = useRecoilValue(selectedRoutineState);
  const [open, setOpen] = useState(false);
  const [level, setLevel] = useState("");
  const [data, setData] = useState("");
  const [logs, setLogs] = useState([]);

  const handleClickOpen = (cell) => {
    setOpen(true);
    setLevel(cell["row"]["level"]);
    setData(cell["row"]["data"]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (selectedRoutine !== null) {
      fetch(`http://localhost:3000/api/routine_logs/${selectedRoutine}`)
        .then(res => res.json())
        .then(data => {
          setLogs(data.logs)
        })
    }
  }, [selectedRoutine]);

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
        getRowId={(row) => row._id}
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

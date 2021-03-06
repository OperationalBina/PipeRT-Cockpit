import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "../styles/utils.module.css";
import { Box } from "@mui/system";
import { useRecoilValue } from "recoil";
import { selectedRoutineState } from "../utils/shared_atoms";
import { apiFetch } from "../utils/http-calls"
import { REFRESH_TIMES } from "../constants"
import useSWR from 'swr'


const columns = [
  { field: "time", headerName: "Time", flex: 0.2 },
  { field: "level", headerName: "Level" },
  { field: "message", headerName: "Message", flex: 1, },
];

export default function RoutineLogsView({ logsPerPage }) {
  const selectedRoutine = useRecoilValue(selectedRoutineState);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");
  const [level, setLevel] = useState("");
  const [message, setMessage] = useState("");

  const { data } = useSWR(selectedRoutine ? `routine_logs/${selectedRoutine}` : null, apiFetch, {
    refreshInterval: REFRESH_TIMES.LOGS,
  })
  const logs = data ? data : []

  const [sortModel, setSortModel] = useState([
    {
      field: 'time',
      sort: 'desc',
    },
  ]);

  const handleClickOpen = (cell) => {
    setOpen(true);
    setTime(cell["row"]["time"]);
    setLevel(cell["row"]["level"]);
    setMessage(cell["row"]["message"]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      style={{ width: "100%" }}
      sx={{
        "& .EXCEPTION": {
          bgcolor: "#F1948A",
          "&:hover": {
            bgcolor: "#E6B0AA",
          },
        },
        "& .ERROR": {
          bgcolor: "#F1948A",
          "&:hover": {
            bgcolor: "#E6B0AA",
          },
        },
        "& .WARNING": {
          bgcolor: "#FAD7A0",
          "&:hover": {
            bgcolor: "#FAE5D3",
          },
        },
        "& .INFO": {
          bgcolor: "#A9DFBF",
          "&:hover": {
            bgcolor: "#D4EFDF",
          },
        },
      }}
    >
      <DataGrid
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
        autoHeight={true}
        rows={logs}
        columns={columns}
        pageSize={logsPerPage}
        rowsPerPageOptions={[logsPerPage]}
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
        <DialogTitle id="alert-dialog-title">{time}</DialogTitle>
        <DialogTitle id="alert-dialog-title">{level}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className={styles.displayLinebreak}>{message}</div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

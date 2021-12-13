import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContentText from '@mui/material/DialogContentText';

export default function LogDisplayView({ is_open, level, data }) {
  return (
    <Dialog open={is_open}>
      <DialogTitle>{level}</DialogTitle>
      <DialogContentText>
        {data}
      </DialogContentText>
    </Dialog>
  );
}

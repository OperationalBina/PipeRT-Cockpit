import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContentText from '@mui/material/DialogContentText';

export default function LogDisplayView({ isOpen, level, message }) {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>{level}</DialogTitle>
      <DialogContentText>
        {message}
      </DialogContentText>
    </Dialog>
  );
}

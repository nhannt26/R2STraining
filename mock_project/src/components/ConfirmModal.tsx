import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({open, onClose, onConfirm, title, message}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} variant="contained">
          Yes
        </Button>
        <Button onClick={onClose} variant="outlined">
          No
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmModal
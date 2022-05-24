import React, { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export interface FormDialogProps {
  title: string;
  inputTitle: string;
  open: boolean;
  submitLabel: string;
  onFormSubmit: (data: string) => void;
}

export default function TextInputDialog({
  title,
  inputTitle,
  open,
  onFormSubmit,
  submitLabel,
}: FormDialogProps) {
  const [inputValue, setInputValue] = useState<string>('');

  const handleFormSubmit = () => {
    onFormSubmit(inputValue);
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={inputTitle}
            type="text"
            fullWidth
            variant="standard"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormSubmit}>{submitLabel}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

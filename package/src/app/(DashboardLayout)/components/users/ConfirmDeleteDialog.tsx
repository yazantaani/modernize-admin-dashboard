import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { Warning } from '@mui/icons-material';

interface ConfirmDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          p: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
            width: 70,
            height: 70,
            backgroundColor: '#fdecea',
            borderRadius: '50%',
          }}
        >
          <Warning sx={{ fontSize: 40, color: '#d32f2f' }} />
        </Box>
        <Typography variant="h6" fontWeight="bold" gutterBottom color="textPrimary">
          Confirm Deletion
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Are you sure you want to delete this user? This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 3 }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onClose}
          sx={{ px: 4 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          sx={{ px: 4 }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;

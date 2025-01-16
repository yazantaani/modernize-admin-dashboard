import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
  TextField,
  Grid,
  Box,
  Typography,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';

interface AddEditUserDialogProps {
  open: boolean;
  user: {
    id: number | null;
    name: string;
    email: string;
    role: string;
    avatar: string;
  } | null;
  onClose: () => void;
  onSave: (user: any) => void;
}

const AddEditUserDialog: React.FC<AddEditUserDialogProps> = ({
  open,
  user,
  onClose,
  onSave,
}) => {
  const [editUser, setEditUser] = useState(
    user || { id: null, name: '', email: '', role: '', avatar: '' }
  );

  const handleSave = () => {
    onSave(editUser);
    onClose();
  };

  // Drag-and-drop functionality
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () =>
          setEditUser((prev) => ({ ...prev, avatar: reader.result as string }));
        reader.readAsDataURL(file);
      }
    },
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.5rem',
        }}
      >
        {editUser.id ? 'Edit User' : 'Add New User'}
      </DialogTitle>
      <DialogContent
        sx={{
          py: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
        }}
      >
        {/* Avatar Preview */}
        <Avatar
          src={editUser.avatar || '/images/profile/default-avatar.jpg'}
          alt="User Avatar"
          sx={{
            width: 100,
            height: 100,
            mb: 2,
            border: '2px solid #1976d2',
          }}
        />

        {/* Drag-and-Drop Upload */}
        <Box
          {...getRootProps()}
          sx={{
            width: '100%',
            height: 120,
            border: '2px dashed #1976d2',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDragActive ? '#f0f8ff' : '#fafafa',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            textAlign: 'center',
            p: 2,
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <Typography color="primary" variant="body2">
              Drop the image here...
            </Typography>
          ) : (
            <Typography color="textSecondary" variant="body2">
              Drag & drop an image here, or click to select one
            </Typography>
          )}
        </Box>

        {/* Form Fields */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            value={editUser.name}
            onChange={(e) =>
              setEditUser((prev) => ({ ...prev, name: e.target.value }))
            }
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />

          <TextField
            label="Email"
            variant="outlined"
            value={editUser.email}
            onChange={(e) =>
              setEditUser((prev) => ({ ...prev, email: e.target.value }))
            }
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />

          <TextField
            label="Role"
            variant="outlined"
            value={editUser.role}
            onChange={(e) =>
              setEditUser((prev) => ({ ...prev, role: e.target.value }))
            }
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onClose}
          sx={{
            px: 4,
            textTransform: 'none',
            borderRadius: 2,
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{
            px: 4,
            textTransform: 'none',
            borderRadius: 2,
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditUserDialog;

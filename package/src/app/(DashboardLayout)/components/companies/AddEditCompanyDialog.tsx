import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
  TextField,
  Box,
  Typography,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';

interface AddEditCompanyDialogProps {
  open: boolean;
  company: {
    id: number | null;
    name: string;
    email: string;
    industry: string;
    logo: string;
  } | null;
  onClose: () => void;
  onSave: (company: any) => void;
}

const AddEditCompanyDialog: React.FC<AddEditCompanyDialogProps> = ({
  open,
  company,
  onClose,
  onSave,
}) => {
  const [editCompany, setEditCompany] = useState(
    company || { id: null, name: '', email: '', industry: '', logo: '' }
  );

  const handleSave = () => {
    onSave(editCompany);
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
          setEditCompany((prev) => ({ ...prev, logo: reader.result as string }));
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
        {editCompany.id ? 'Edit Company' : 'Add New Company'}
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
        {/* Logo Preview */}
        <Avatar
          src={editCompany.logo || '/images/companies/default-logo.jpg'}
          alt="Company Logo"
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
              Drag & drop a logo here, or click to select one
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
            value={editCompany.name}
            onChange={(e) =>
              setEditCompany((prev) => ({ ...prev, name: e.target.value }))
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
            value={editCompany.email}
            onChange={(e) =>
              setEditCompany((prev) => ({ ...prev, email: e.target.value }))
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
            label="Industry"
            variant="outlined"
            value={editCompany.industry}
            onChange={(e) =>
              setEditCompany((prev) => ({ ...prev, industry: e.target.value }))
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

export default AddEditCompanyDialog;

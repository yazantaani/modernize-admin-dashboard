import React, { useState, useEffect } from "react";
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
  MenuItem,
  Alert,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useAppDispatch } from "@/app/redux/store";
import { updateUserProfile, createUser } from "@/app/redux/App/userSlice";
const baseImageUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ""; // Use environment variable or default

interface AddEditUserDialogProps {
  open: boolean;
  user?: {
    id: number | null;
    username: string;
    full_name: string;
    email: string;
    password: string;
    phone: string;
    role: "user" | "superAdmin" | "companyAdmin";
    profile_image: string | File;
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
  const dispatch = useAppDispatch();

  const defaultUser = {
    id: null,
    username: "",
    full_name: "",
    email: "",
    password: "",
    phone: "",
    role: "user" as "user" | "superAdmin" | "companyAdmin",
    profile_image: "",
  };

  const [editUser, setEditUser] = useState(user || defaultUser);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    setEditUser(user || defaultUser);
    setErrorMessages([]);
    // Update avatar preview if a file is selected
    if (user?.profile_image instanceof File) {
      const url = URL.createObjectURL(user.profile_image);
      setAvatarUrl(url);
      return () => URL.revokeObjectURL(url); // Cleanup URL
    }
    setAvatarUrl(null); // Reset preview if no file
  }, [user]);

  const validateForm = () => {
    const errors: string[] = [];
    if (!editUser.username || editUser.username.length < 3 || editUser.username.length > 50) {
      errors.push("Username must be between 3 and 50 characters.");
    }
    if (!editUser.full_name || editUser.full_name.length < 3 || editUser.full_name.length > 50) {
      errors.push("Full name must be between 3 and 50 characters.");
    }
    if (!editUser.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editUser.email)) {
      errors.push("Email must be a valid email address.");
    }
    if (editUser.id === null && (!editUser.password || editUser.password.length < 6)) {
      errors.push("Password must be at least 6 characters for new users.");
    }
    return errors;
  };

  const handleSave = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      setErrorMessages(errors);
      return;
    }

    const formData = new FormData();
    formData.append("username", editUser.username || "");
    formData.append("full_name", editUser.full_name || "");
    formData.append("email", editUser.email || "");
    formData.append("phone", editUser.phone || "");
    formData.append("role", editUser.role || "user");

    if (editUser.id === null) {
      formData.append("password", editUser.password || "");
    }

    if (editUser.profile_image instanceof File) {
      formData.append("profile_image", editUser.profile_image);
    }

    try {
      if (editUser.id === null) {
        const createdUser = await dispatch(createUser(formData)).unwrap();
        onSave(createdUser);
      } else {
        await dispatch(updateUserProfile({ userId: editUser.id, formData })).unwrap();
        onSave(editUser);
      }
      onClose();
    } catch (error: any) {
      const backendError = error?.message || "An error occurred while saving the user. Please try again.";
      setErrorMessages([backendError]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif"] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setEditUser((prev) => ({ ...prev, profile_image: file }));
        const url = URL.createObjectURL(file);
        setAvatarUrl(url);
      }
    },
  });

  const renderAvatar = () => {
    const imageUrl =
      editUser.profile_image instanceof File
        ? URL.createObjectURL(editUser.profile_image)
        : `${baseImageUrl}/${editUser.profile_image}`; // Prepend base URL for saved images
  
    return (
      <Avatar
        src={imageUrl}
        alt="User Avatar"
        sx={{ width: 100, height: 100, mb: 2, border: "2px solid #1976d2" }}
      />
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.5rem",
        }}
      >
        {editUser.id ? "Edit User" : "Add New User"}
      </DialogTitle>
      <DialogContent
        sx={{
          py: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        {errorMessages.length > 0 &&
          errorMessages.map((msg, index) => (
            <Alert severity="error" key={index}>
              {msg}
            </Alert>
          ))}

        {renderAvatar()}

        <Box
          {...getRootProps()}
          sx={{
            width: "100%",
            height: 120,
            border: "2px dashed #1976d2",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isDragActive ? "#f0f8ff" : "#fafafa",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            textAlign: "center",
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

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Username"
            variant="outlined"
            value={editUser.username}
            onChange={(e) => setEditUser((prev) => ({ ...prev, username: e.target.value }))}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Full Name"
            variant="outlined"
            value={editUser.full_name}
            onChange={(e) => setEditUser((prev) => ({ ...prev, full_name: e.target.value }))}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Email"
            variant="outlined"
            value={editUser.email}
            onChange={(e) => setEditUser((prev) => ({ ...prev, email: e.target.value }))}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Phone"
            variant="outlined"
            value={editUser.phone}
            onChange={(e) => setEditUser((prev) => ({ ...prev, phone: e.target.value }))}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Role"
            variant="outlined"
            value={editUser.role}
            onChange={(e) => setEditUser((prev) => ({ ...prev, role: e.target.value as "user" | "superAdmin" | "companyAdmin" }))}
            fullWidth
            select
            InputLabelProps={{ shrink: true }}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="superAdmin">Super Admin</MenuItem>
            <MenuItem value="companyAdmin">Company Admin</MenuItem>
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", gap: 2 }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onClose}
          sx={{
            px: 4,
            textTransform: "none",
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
            textTransform: "none",
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

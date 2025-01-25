"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TablePagination,
  IconButton,
  Avatar,
  Box,
  Paper,
  Typography,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import AddEditUserDialog from "./AddEditUserDialog";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import SearchBar from "./SearchBar";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { fetchUsers } from "@/app/redux/App/userSlice";
const UserList = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.user); 

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const filteredUsers = users.filter((user) =>
    user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddEditDialogOpen = (user: any | null) => {
    setEditUser(user);
    setIsAddEditDialogOpen(true);
  };

  const handleAddEditDialogClose = () => {
    setEditUser(null);
    setIsAddEditDialogOpen(false);
  };

  const handleSaveUser = (user: any) => {
    console.log("Save user:", user);
  };

  const handleDeleteDialogOpen = (id: number) => {
    setDeleteUserId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteUserId(null);
    setIsDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    console.log("Delete user with ID:", deleteUserId);
    handleDeleteDialogClose();
  };

  const handleStatusChange = (id: number, newStatus: "Active" | "Inactive") => {
    console.log(`Change status for user ID ${id} to ${newStatus}`);
  };

  return (
    <Box sx={{ width: "100%", margin: "0 auto", py: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          User List
        </Typography>
        <Box display="flex" gap={2}>
          <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAddEditDialogOpen(null)}
            startIcon={<AddCircleOutlineIcon />}
            sx={{ borderRadius: "8px", px: 4 }}
          >
            Add User
          </Button>
        </Box>
      </Box>

      {loading && (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="300px"
      >
        <CircularProgress />
      </Box>
    )}     
    {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <TableContainer component={Paper} sx={{ borderRadius: "10px", overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f4f6f8" }}>
                <TableCell>Avatar</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.userId}>
                  <TableCell>
                    <Avatar src="/images/profile/default-avatar.jpg" alt={user.full_name} />
                  </TableCell>
                  <TableCell>{user.userId}</TableCell>
                  <TableCell>{user.full_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Select
                      value={user.status}
                      onChange={(e) => handleStatusChange(user.userId, e.target.value as "Active" | "Inactive")}
                      size="small"
                      sx={{
                        backgroundColor: user.status === "Active" ? "#e8f5e9" : "#ffebee",
                        color: user.status === "Active" ? "#388e3c" : "#d32f2f",
                        fontWeight: "bold",
                      }}
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleAddEditDialogOpen(user)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteDialogOpen(user.userId)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => setRowsPerPage(Number(event.target.value))}
      />
      <AddEditUserDialog
        open={isAddEditDialogOpen}
        user={editUser} // Pass the user or null explicitly
        onClose={handleAddEditDialogClose}
        onSave={handleSaveUser}
      />
      <ConfirmDeleteDialog
        open={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
};

export default UserList;

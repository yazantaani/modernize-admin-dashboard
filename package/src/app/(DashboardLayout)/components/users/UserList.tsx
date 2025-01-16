'use client';

import React, { useState } from 'react';
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
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import AddEditUserDialog from './AddEditUserDialog';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import SearchBar from './SearchBar';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: 'Active' | 'Inactive';
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      avatar: '/images/profile/user-1.jpg',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'User',
      avatar: '/images/profile/user-1.jpg',
      status: 'Inactive',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

  // Filter users by search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handlers for dialogs
  const handleAddEditDialogOpen = (user: User | null) => {
    setEditUser(user);
    setIsAddEditDialogOpen(true);
  };

  const handleAddEditDialogClose = () => {
    setEditUser(null);
    setIsAddEditDialogOpen(false);
  };

  const handleSaveUser = (user: User) => {
    if (user.id) {
      setUsers((prev) => prev.map((u) => (u.id === user.id ? user : u)));
    } else {
      setUsers((prev) => [...prev, { ...user, id: Date.now() }]);
    }
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
    if (deleteUserId !== null) {
      setUsers((prev) => prev.filter((user) => user.id !== deleteUserId));
    }
    handleDeleteDialogClose();
  };

  // Handle status change
  const handleStatusChange = (id: number, newStatus: 'Active' | 'Inactive') => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, status: newStatus } : user))
    );
  };

  return (
    <Box sx={{ width: '100%', margin: '0 auto', py: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          User List
        </Typography>
        <Box display="flex" gap={2}>
          {/* Search Bar */}
          <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAddEditDialogOpen(null)}
            startIcon={<AddCircleOutlineIcon />}
            sx={{ borderRadius: '8px', px: 4 }}
          >
            Add User
          </Button>
        </Box>
      </Box>

      {/* User Table */}
      <TableContainer component={Paper} sx={{ borderRadius: '10px', overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f4f6f8' }}>
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
              <TableRow key={user.id}>
                <TableCell>
                  <Avatar src={user.avatar} alt={user.name} />
                </TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Select
                    value={user.status}
                    onChange={(e) => handleStatusChange(user.id, e.target.value as 'Active' | 'Inactive')}
                    size="small"
                    sx={{
                      backgroundColor: user.status === 'Active' ? '#e8f5e9' : '#ffebee',
                      color: user.status === 'Active' ? '#388e3c' : '#d32f2f',
                      fontWeight: 'bold',
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
                  <IconButton color="error" onClick={() => handleDeleteDialogOpen(user.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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

      {/* Add/Edit User Dialog */}
      <AddEditUserDialog
        open={isAddEditDialogOpen}
        user={editUser}
        onClose={handleAddEditDialogClose}
        onSave={handleSaveUser}
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDeleteDialog
        open={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
};

export default UserList;

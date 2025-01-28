'use client';

import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import AddEditCompanyDialog from '../companies/AddEditCompanyDialog';
import ConfirmDeleteDialog from '../users/ConfirmDeleteDialog';
import SearchBar from '../users/SearchBar';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useAppDispatch, useAppSelector } from '@/app/redux/store'; 
import { fetchCompanies } from '@/app/redux/App/companySlice'; 

const CompaniesList = () => {
  const dispatch = useAppDispatch();
  const { companies, loading, error } = useAppSelector((state) => state.company);

  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [editCompany, setEditCompany] = useState(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteCompanyId, setDeleteCompanyId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.phoneNumber?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedCompanies = filteredCompanies.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleAddEditDialogOpen = (company: any | null) => {
    setEditCompany(company);
    setIsAddEditDialogOpen(true);
  };

  const handleAddEditDialogClose = () => {
    setEditCompany(null);
    setIsAddEditDialogOpen(false);
  };

  const handleDeleteDialogOpen = (id: number) => {
    setDeleteCompanyId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteCompanyId(null);
    setIsDeleteDialogOpen(false);
  };

  const handleStatusChange = (id: number, newStatus: 'Active' | 'Inactive') => {
    console.log(`Change status for company ID ${id} to ${newStatus}`);
  };

  return (
    <Box sx={{ width: '100%', margin: '0 auto', py: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          Companies List
        </Typography>
        <Box display="flex" gap={2}>
          <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAddEditDialogOpen(null)}
            startIcon={<AddCircleOutlineIcon />}
            sx={{ borderRadius: '8px', px: 4 }}
          >
            Add Company
          </Button>
        </Box>
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <>
          <TableContainer component={Paper} sx={{ borderRadius: '10px', overflow: 'hidden' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f4f6f8' }}>
                  <TableCell>Logo</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Place</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedCompanies.map((company) => (
                  <TableRow key={company.companyId}>
                    <TableCell>
                      <Avatar
                        src={company.logo}
                        alt={company.name}
                        sx={{ width: 64, height: 64 }}
                      />
                    </TableCell>
                    <TableCell>{company.companyId}</TableCell>
                    <TableCell>{company.name}</TableCell>
                    <TableCell>{company.email}</TableCell>
                    <TableCell>{company.phoneNumber || 'N/A'}</TableCell>
                    <TableCell>{company.place}</TableCell>
                    <TableCell>
                      <Select
                        value={company.isActive ? 'Active' : 'Inactive'}
                        onChange={(e) =>
                          handleStatusChange(company.companyId, e.target.value as 'Active' | 'Inactive')
                        }
                        size="small"
                        sx={{
                          backgroundColor: company.isActive ? '#e8f5e9' : '#ffebee',
                          color: company.isActive ? '#388e3c' : '#d32f2f',
                          fontWeight: 'bold',
                        }}
                      >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleAddEditDialogOpen(company)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteDialogOpen(company.companyId)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 30, 50, 100]}
            component="div"
            count={filteredCompanies.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => setRowsPerPage(Number(event.target.value))}
          />
        </>
      )}

      <AddEditCompanyDialog
        open={isAddEditDialogOpen}
        company={editCompany}
        onClose={handleAddEditDialogClose}
        onSave={() => {}}
      />

      <ConfirmDeleteDialog
        open={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onConfirm={() => {}}
      />
    </Box>
  );
};

export default CompaniesList;
